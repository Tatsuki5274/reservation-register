bash script/build.sh

cdk synth --no-staging > template.yaml

sam local invoke NaiveLambda2A66C0B6 --no-event --env-vars env.json