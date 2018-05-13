pushd ../..
npm i
lerna bootstrap
popd

npm run build_prod
