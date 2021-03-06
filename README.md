# Description
This repo is about testing AWS serverless function with a POC that will take an URL in input and output a PDF.

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
    - `npm run log`


## Utilisation
Once deployed, you just have to access the URL that has been given to you in the endpoint section of the console logs, and access it with an HTTP GET request.

You should specify the `url` in parameters or you'll get a 400.
You can also specify a `fileName` is you want. Else, the domain of the url will be used (with `.` replaced by `_`).

### Screenshots
![exemple screenshot](https://image.ibb.co/fmJQZe/html_To_Pdf_exemple.png)

## TODO
- move it out of dev
- time it
- makes sure it's secure:
    - possibly rate limit it
    - or create a auth system
- create a monitor to alert on cost and calls
- make sure the S3 is not call every time we call the serverless function (as it's rate limited to 20 000) requests

## Explanation of the stack
### Serverless repo
Website: https://serverless.com/

This whole website propose a HUGE abstraction of serverless set-up. It offers a CLI tool that allows us to create and mount a Serverless Application instantly.

The whole thing is based on the Amazon Services, so multiples instances of servers and services will be created with your AWS account.
- CloudFormation: Actually contains the whole stack of deployed services. It's then pretty easy to follow exactly what you have and what is used or not.
    - go to `https://eu-west-3.console.aws.amazon.com/cloudformation/home`
- API Gateway instance: To create HTTP endpoints as Event sources for your AWS Lambda Functions, use the Serverless Framework's easy AWS API Gateway Events syntax.
    - go to `https://console.aws.amazon.com/apigateway/home`
- S3 instance: to store documents at amazon.
    - go to `https://s3.console.aws.amazon.com/s3/home`
- AWS lambda: which is a serverless function.
    - go to `https://console.aws.amazon.com/lambda/home`

#### How does it work
With the default boilerplate `sls create`, there are two files that are created with the init function:
- serverless.yml: which contains all the configuration for our AWS instances
- handler.js: which contains the serveless function code (as a NodeJS module).

Then, you can deploy your serverless `sls deploy` and everything will be created for you. You can also kill and clean your instances with `sls remove`.

### Serverless-chrome repo
Github: https://github.com/adieuadieu/serverless-chrome/tree/master/examples/serverless-framework/aws

## Code explanation
The main logic behind the PDF generation is from:
- https://github.com/cyrus-and/chrome-remote-interface, which is an NPM module to manipulate a headless chrome
- https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-printToPDF: which is the chrome function that prints a page to PDF.

This logic is contained in the src/chrome/pdf.js file. All that is done here is basically exposing a function that loads an url with the headless chrome and then call the aforementioned function to return a base64 encoded pdf.

Then, in the src/handlers/pdf.js file, you have all the serverless logic that:
- extracts the URL from the requests param (and the fileName if it's there).
- calls the headless chrome function to extract the PDF.
- returns it as a file with the corrects HTTP headers.
