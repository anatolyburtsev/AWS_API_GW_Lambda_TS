import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';


export class SimpleApigwLambdaTsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda functions
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

    // Define the API Gateway
    const api = new apigateway.RestApi(this, 'Endpoint', {
      restApiName: 'SimpleAPITS'
    });

    const getStockIntegration = new apigateway.LambdaIntegration(getStockLambda);
    const postOrderIntegration = new apigateway.LambdaIntegration(postOrderLambda);

    api.root.resourceForPath('stock').addMethod('GET', getStockIntegration);
    api.root.resourceForPath('order').addMethod('POST', postOrderIntegration);

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'The URL of the API Gateway',
    });
  }
}
