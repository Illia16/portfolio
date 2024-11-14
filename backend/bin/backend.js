#!/usr/bin/env node

const cdk = require('aws-cdk-lib');
const { BackendStack } = require('../lib/backend-stack');

const app = new cdk.App();

new BackendStack(app, `${process.env.PROJECT_NAME}-stack-${process.env.ENV_NAME}`, {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
  env: {
    region: 'us-east-1',
    STAGE: process.env.ENV_NAME,
    PROJECT_NAME: process.env.PROJECT_NAME,
    CLOUDFRONT_URL: `https://${process.env.CLOUDFRONT_URL}`,
    CERTIFICATE_ARN: process.env.CERTIFICATE_ARN,
    EMAIL: process.env.EMAIL,
  },
  description: `Backend stack for ${process.env.PROJECT_NAME} for ${process.env.ENV_NAME} environment.`
});
