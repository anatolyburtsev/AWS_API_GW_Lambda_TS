import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';


export class SimpleApigwLambdaTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getStockLambda = new lambda.Function(this, 'GetStockHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda/'),
      handler: 'getStock.handler'
    });

    const postOrderLambda = new lambda.Function(this, 'PostOrderHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset('lambda/'),
      handler: 'postOrder.handler'
    });

    const api = new apigateway.RestApi(this, 'Endpoint', {
      restApiName: 'SimpleAPITS'
    });

    const getStockIntegration = new apigateway.LambdaIntegration(getStockLambda);
    const postOrderIntegration = new apigateway.LambdaIntegration(postOrderLambda);

    api.root.resourceForPath('stock').addMethod('GET', getStockIntegration);

    // Add auth to post order API
    const apiKey = new apigateway.ApiKey(this, 'PostOrderApiKey', {
      enabled: true,
    });

    const usagePlan = new apigateway.UsagePlan(this, 'UsagePlan', {
      name: 'BasicUsagePlan',
      throttle: {
        rateLimit: 10,
        burstLimit: 2
      }
    });

    usagePlan.addApiKey(apiKey);
    usagePlan.addApiStage({
      stage: api.deploymentStage,
      api: api
    });

    api.root.resourceForPath('order').addMethod('POST', postOrderIntegration,
      {apiKeyRequired: true});

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'The URL of the API Gateway',
    });

    new cdk.CfnOutput(this, 'ApiKey', {
      value: apiKey.keyId,
      description: 'API Key Id for accessing the POST method'
    });
  }
}
