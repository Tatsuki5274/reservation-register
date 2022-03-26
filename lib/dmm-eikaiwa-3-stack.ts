import { Stack, StackProps, aws_lambda } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DmmEikaiwa3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new aws_lambda.Function(this, "NaiveLambda", {
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: aws_lambda.Code.fromAsset(
        path.join(__dirname, "../lambda/hello/build/")
      ),
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
      },
    });
  }
}
