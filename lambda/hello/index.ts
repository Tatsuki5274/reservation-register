import * as AWS from "aws-sdk";
import { env } from "process";

var client = new AWS.SecretsManager({
  region: "ap-northeast-1",
});
const secretName = env.SECRET_NAME;
if (!secretName) {
  throw new Error("Secret name is not defined");
}

export const handler = async () => {
  const value = await client.getSecretValue({ SecretId: secretName }).promise();
  return JSON.stringify(value);
};
