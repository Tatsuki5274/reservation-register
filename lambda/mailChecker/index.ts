import * as AWS from "aws-sdk";
import { env } from "process";
import Connection = require("imap");
import * as Util from "util";
const inspect = Util.inspect;

var imap = new Connection({
  user: "mygmailname@gmail.com",
  password: "mygmailpassword",
  host: "imap.gmail.com",
  port: 993,
  tls: true,
});

const getImapConnection = async () => {
  const client = new AWS.SecretsManager({
    region: "ap-northeast-1",
  });
  const secretName = env.SECRET_NAME;
  if (!secretName) {
    throw new Error("Secret name is not defined");
  }
  const secret = await await client
    .getSecretValue({ SecretId: secretName })
    .promise();
  if (!secret.SecretString) {
    throw new Error("SecretString is empty");
  }
  const secretObject = JSON.parse(secret.SecretString);
  const userName: unknown = secretObject.IMAP_USER_NAME;
  if (typeof userName !== "string") {
    throw new Error("IMAP_USER_NAME is not string");
  }
  const password: unknown = secretObject.IMAP_PASSWORD;
  if (typeof password !== "string") {
    throw new Error("IMAP_PASSWORD is not string");
  }
  const host: unknown = secretObject.IMAP_HOST;
  if (typeof host !== "string") {
    throw new Error("IMAP_HOST is not string");
  }
  // const imap = new Imap({
  //   user: userName,
  //   password: password,
  //   host: host,
  //   port: 993,
  //   tls: true,
  // });
  return imap;
};

export const handler = async () => {
  const imap = await getImapConnection();
  return "success!";
};
