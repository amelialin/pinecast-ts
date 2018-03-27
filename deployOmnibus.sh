DATE=$(date +%Y-%m-%d)
UUID=$(uuidgen)

echo "Build ${DATE}_${UUID}"

lerna bootstrap

pushd packages/db-omnibus

npm run build
aws s3 sync build/ s3://pinecast-js/omnibus/${DATE}_${UUID}/ --acl public-read

echo "Run the following commands to deploy:"
echo ""
echo "  Staging:"
echo "    heroku config:set -a pinecast-staging TS_VERSION=omnibus/${DATE}_${UUID}"
echo ""
echo "  Production:"
echo "    heroku config:set -a pinecast TS_VERSION=omnibus/${DATE}_${UUID}"

popd
