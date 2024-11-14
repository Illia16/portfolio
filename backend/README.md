# Welcome to your CDK JavaScript project

This is an AWS CDK template build with JavaScript to handle create/read/update/delete through API.

- nvm use 18
- npm i
- cd /lib/functions
- npm i (to install any dependencies for Lambda function (if any, currently uuid))
- npm run synth:javascript (to generate the cloudformation template)
- npm run deploy:javascript (to deploy the stack)

The `cdk.json` file tells the CDK Toolkit how to execute your app. The build step is not required when using JavaScript.

## Useful commands

* `npm run test`         perform the jest unit tests
* `cdk deploy`           deploy this stack to your default AWS account/region
* `cdk diff`             compare deployed stack with current state
* `cdk synth`            emits the synthesized CloudFormation template
