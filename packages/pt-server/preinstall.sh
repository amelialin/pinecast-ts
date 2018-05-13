cd ../..

echo "npm i"
npm i --production
echo "lerna bootstrap"
./node_modules/.bin/lerna bootstrap

cd packages/pt-server

npm run build_prod
