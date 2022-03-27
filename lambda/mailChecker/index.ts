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
  const secret = await await client
    .getSecretValue({ SecretId: secretName })
    .promise();
  if (!secret.SecretString) {
    throw new Error("SecretString is empty");
  }
  const secretObject = JSON.parse(secret.SecretString);
  const userName: unknown = secretObject.USER_NAME;
  if (typeof userName !== "string") {
    throw new Error("USER_NAME is not string");
  }
  return userName;
};
