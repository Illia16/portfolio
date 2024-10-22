const cdk = require('aws-cdk-lib');
const iam = require("aws-cdk-lib/aws-iam");
const lambda = require("aws-cdk-lib/aws-lambda");
const apiGateway = require("aws-cdk-lib/aws-apigateway");
const acm = require('aws-cdk-lib/aws-certificatemanager');
const s3 = require('aws-cdk-lib/aws-s3');
const cloudfront = require('aws-cdk-lib/aws-cloudfront');
const origins = require('aws-cdk-lib/aws-cloudfront-origins');
const path = require("path");
const crypto = require('crypto');


class BackendStack extends cdk.Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const STAGE = props.env.STAGE;
    const PROJECT_NAME = props.env.PROJECT_NAME;
    const CLOUDFRONT_URL = props.env.CLOUDFRONT_URL;
    const CERTIFICATE_ARN = props.env.CERTIFICATE_ARN;
    const EMAIL = props.env.EMAIL;
    const JWT_SECRET = crypto.randomBytes(32).toString('hex');

    const account = cdk.Stack.of(this).account;

    const ssl_cert = acm.Certificate.fromCertificateArn(this, `${PROJECT_NAME}--certificate--${STAGE}`, CERTIFICATE_ARN); // uploaded manually

    const cfFunction = new cloudfront.Function(this, `${PROJECT_NAME}--cf-fn--${STAGE}`, {
        code: cloudfront.FunctionCode.fromFile({
            filePath: __dirname + '/cf-functions/index.js',
        }),
        runtime: cloudfront.FunctionRuntime.JS_2_0,
        functionName: `${PROJECT_NAME}--cf-fn--${STAGE}`,
        comment: 'CF function to handle redirects, basic auth, redirects from cf domain to a custom one etc.',
    });

    const websiteBucket = new s3.Bucket(this, `${PROJECT_NAME}--s3-site--${STAGE}`, {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      bucketName: `${PROJECT_NAME}--s3-site--${STAGE}`,
    });

     // Add CORS configuration
     websiteBucket.addCorsRule({
      allowedHeaders: ['*'],
      allowedMethods: [
        s3.HttpMethods.POST,
      ],
      allowedOrigins: ['http://localhost:3000', CLOUDFRONT_URL],
      maxAge: 3000,
    });

    const oac = new cloudfront.S3OriginAccessControl(this, `${PROJECT_NAME}--oac--${STAGE}`, {
        originAccessControlName: `${PROJECT_NAME}--oac--${STAGE}`,
        signing: cloudfront.Signing.SIGV4_ALWAYS,
    });

    // CloudFront
    const cf = new cloudfront.Distribution(this, `${PROJECT_NAME}--cf--${STAGE}`, {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(websiteBucket, {
            originAccessControl: oac,
            originPath: '/site',
        }),
        functionAssociations: [{
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
            function: cfFunction,
        }],
      },
      certificate: ssl_cert,
      domainNames: ['portfolio.illusha.net'],
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      sslSupportMethod: cloudfront.SSLMethod.SNI,
      defaultRootObject: 'index.html',
    });

    // Add the below so that it handles the files (if file is not avaialbe, it returns 404, not 403)
    websiteBucket.addToResourcePolicy(new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
        actions: ['s3:ListBucket'],
        resources: [websiteBucket.bucketArn],
        conditions: {
            StringEquals: {
              "aws:SourceArn": `arn:aws:cloudfront::${account}:distribution/${cf.distributionId}`,
            },
        }
      })
    );

    const lambdaLayer = new lambda.LayerVersion(this, `${PROJECT_NAME}--fn-layer--${STAGE}`, {
      layerVersionName: `${PROJECT_NAME}--fn-layer--${STAGE}`,
      code: lambda.Code.fromAsset(path.join(__dirname, 'functions'), {
        bundling: {
            image: lambda.Runtime.NODEJS_20_X.bundlingImage,
            command: [
                'bash', '-c',
                'mkdir -p /asset-output/nodejs && cp -r ./node_modules /asset-output/nodejs/'
            ],
        },
      }),
      compatibleArchitectures: [lambda.Architecture.X86_64, lambda.Architecture.ARM_64],
      compatibleRuntimes: [lambda.Runtime.NODEJS_18_X, lambda.Runtime.NODEJS_20_X]
    });

    const lambdaFn = new lambda.Function(
      this,
      `${PROJECT_NAME}--lambda-fn-${STAGE}`,
      {
        runtime: lambda.Runtime.NODEJS_20_X,
        handler: 'handle/index.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, 'functions'), { exclude: ['node_modules'] }),
        functionName: `${PROJECT_NAME}--lambda-fn-${STAGE}`,
        environment: {
          STAGE: STAGE,
          PROJECT_NAME: PROJECT_NAME,
          CLOUDFRONT_URL: CLOUDFRONT_URL,
          EMAIL: EMAIL,
          JWT_SECRET: JWT_SECRET,
        },
        layers: [lambdaLayer]
      }
    );

    // the below grants the Lambda fn basic things (like logs)
    lambdaFn.role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole"
      )
    );

    // Allow Lambda fn to sent SES emails
    lambdaFn.addToRolePolicy(
      new iam.PolicyStatement({
        actions: [
            "ses:SendRawEmail",
        ],
        resources: "*",
        effect: iam.Effect.ALLOW,
        conditions: {
          StringEquals: {
            "ses:FromAddress": `${PROJECT_NAME}-${STAGE}@devemail.illusha.net`,
          }
        }
      }),
    );
    lambdaFn.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["s3:PutObject", "s3:GetObject"],
        resources: [`${websiteBucket.bucketArn}/files/*`],
        effect: iam.Effect.ALLOW,
      }),
    )

    const api = new apiGateway.LambdaRestApi(
      this,
      `${PROJECT_NAME}--api--${STAGE}`,
      {
        handler: lambdaFn,
        deployOptions: {
          stageName: STAGE,
          description: `API template using AWS CDK ${STAGE}`,
        },
        domainName: {
          domainName: `api-${PROJECT_NAME}-${STAGE}.illusha.net`,
          certificate: ssl_cert,
        },
        proxy: false,
        restApiName: `${PROJECT_NAME}--api--${STAGE}`,
        description: "API to handle email data",
        defaultCorsPreflightOptions: {
          allowOrigins: ['http://localhost:3000', CLOUDFRONT_URL],
          allowMethods: apiGateway.Cors.ALL_METHODS,
        },
        disableExecuteApiEndpoint: true,
        binaryMediaTypes: ['multipart/form-data'],
      }
    );
    const route = api.root.addResource("v1");
    ['GET', 'POST', 'PUT', 'DELETE'].forEach(method => {
      route.addMethod(method, new apiGateway.LambdaIntegration(lambdaFn));
    });

    lambdaFn.addEnvironment('API_URL', `${api.domainName.domainName}/v1`);

    const apiUsagePlan = api.addUsagePlan(`${PROJECT_NAME}--api-usage-plan--${STAGE}`, {
      name: `${PROJECT_NAME}--api-usage-plan--${STAGE}`,
      description: `API usage plan to handle number of requests.`,
      quota: {
        limit: 25,
        period: apiGateway.Period.DAY,
      },
    });

    apiUsagePlan.addApiStage({
      stage: api.deploymentStage,
    });
  }
}

module.exports = { BackendStack };
