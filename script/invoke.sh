bash script/build.sh

cdk synth --no-staging > template.yaml

sam local invoke MailCheckerB2F20048 --no-event --env-vars env.json