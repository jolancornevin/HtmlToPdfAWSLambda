# Description
This repo is about testing AWS serverless function with a POC that will take an URL in input and output a PDF.

## Explanation of the stack

### Serverless repo
Website: https://serverless.com/

This whole website probose a HUGE abstraction of serverless set-up. It offers a CLI tool that allows us to create and mount a Serverless Application instantly.

The whole thing is base on the Amazon Services, so muliples instances of serveur and services will be created with your AWS account.
- API Gateway instance: To create HTTP endpoints as Event sources for your AWS Lambda Functions, use the Serverless Framework's easy AWS API Gateway Events syntax.
- S3 instance: to store documents at amazon.
- AWS lambda: which is a serverless function.

#### How does it work
With the default boilerplate `sls create`, there are two files that are created with the init function:
- serverless.yml: which contains all the configuration for our AWS instances
- handler.js: which contains the serveless function code (as a NodeJS module).

Then, you can deploy your serverless `sls deploy` and everything will be created for you. You can also kill and clean your instances with `sls remove`.

### Serverless-chrome repo
Github: https://github.com/adieuadieu/serverless-chrome/tree/master/examples/serverless-framework/aws


## Installation

- `npm install -g serverless --save`
- Create an AWS user
    - go to `https://console.aws.amazon.com/iam/home?#/home` and follow `https://serverless.com/framework/docs/providers/aws/guide/credentials/`
    - set environemnt variable:
        - export AWS_ACCESS_KEY_ID=
        - export AWS_SECRET_ACCESS_KEY=
- run
    - `serverless create -u https://github.com/adieuadieu/serverless-chrome/tree/master/examples/serverless-framework/aws`
    - `cd aws`
    - `npm install`
    - `npm run deploy`
- go to `https://s3.console.aws.amazon.com/s3/home` to see your S3 bucket
- go to `https://console.aws.amazon.com/apigateway/home` to see your API gateaway
- go to `https://console.aws.amazon.com/lambda/home` to see you lambda functions
