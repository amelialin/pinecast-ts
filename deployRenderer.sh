lerna bootstrap

pushd packages/renderer

echo "Building…"
npm run build_prod

echo "Uploading…"
rsync -e "ssh -i ~/.aws/basta-imac-devkey.pem" -a build/ ubuntu@34.192.214.136:/opt/site-server/
echo "Finalizing deployment…"
ssh -i ~/.aws/basta-imac-devkey.pem ubuntu@34.192.214.136 "sudo service site-server restart"

echo "Deployment successful"
popd
