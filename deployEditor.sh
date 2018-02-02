DATE=$(date +%Y-%m-%d)
UUID=$(uuidgen)

echo "Build ${DATE}_${UUID}"

lerna bootstrap

pushd packages/editor

npm run build
aws s3 sync build/ s3://pinecast-js/site-builder/${DATE}_${UUID}/ --acl public-read

echo "Run the following commands to deploy:"
echo ""
echo "  Staging:"
echo "    heroku config:set -a pinecast-staging SB_VERSION=site-builder/${DATE}_${UUID}"
echo ""
echo "  Production:"
echo "    heroku config:set -a pinecast SB_VERSION=site-builder/${DATE}_${UUID}"

popd
