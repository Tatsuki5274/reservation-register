import {
  Stack,
  StackProps,
  aws_lambda,
  aws_secretsmanager,
  Duration,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class DmmEikaiwa3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const secret = new aws_secretsmanager.Secret(this, "Secret");

    const sampleFunc = new aws_lambda.Function(this, "MailChecker", {
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: aws_lambda.Code.fromAsset(
        path.join(__dirname, "../lambda/mailChecker/build/")
      ),
      timeout: Duration.seconds(30),
      environment: {
        NODE_OPTIONS: "--enable-source-maps",
        SECRET_NAME: secret.secretName,
      },
    });
    secret.grantRead(sampleFunc);
  }
}
