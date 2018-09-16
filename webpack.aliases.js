const path = require('path');

module.exports = {
  '@pinecast/common': path.resolve(__dirname, 'packages/common/src/'),

  '@pinecast/db-ads$': path.resolve(__dirname, 'packages/db-ads/src/index.ts'),
  '@pinecast/db-analytics$': path.resolve(
    __dirname,
    'packages/db-analytics/src/index.ts',
  ),
  '@pinecast/db-categories$': path.resolve(
    __dirname,
    'packages/db-categories/src/index.ts',
  ),
  '@pinecast/db-import-tool$': path.resolve(
    __dirname,
    'packages/db-import-tool/src/index.ts',
  ),
  '@pinecast/db-publish-picker$': path.resolve(
    __dirname,
    'packages/db-publish-picker/src/index.ts',
  ),
  '@pinecast/db-spotify$': path.resolve(
    __dirname,
    'packages/db-spotify/src/index.ts',
  ),
  '@pinecast/db-tip-jar-connect$': path.resolve(
    __dirname,
    'packages/db-tip-jar-connect/src/index.ts',
  ),
  '@pinecast/db-uploader$': path.resolve(
    __dirname,
    'packages/db-uploader/src/index.ts',
  ),
  '@pinecast/db-upgrade$': path.resolve(
    __dirname,
    'packages/db-upgrade/src/index.ts',
  ),
  '@pinecast/externals': path.resolve(__dirname, 'packages/externals/src/'),
  '@pinecast/externals/node': path.resolve(
    __dirname,
    'packages/externals/src/node/',
  ),

  '@pinecast/i18n$': path.resolve(__dirname, 'packages/i18n/src/index.ts'),

  '@pinecast/pt-query$': path.resolve(
    __dirname,
    'packages/pt-query/src/index.ts',
  ),
  '@pinecast/sb-components$': path.resolve(
    __dirname,
    'packages/sb-components/src/index.ts',
  ),
  '@pinecast/sb-presets$': path.resolve(
    __dirname,
    'packages/sb-presets/src/index.js',
  ),
  '@pinecast/sb-renderer$': path.resolve(
    __dirname,
    'packages/sb-renderer/src/index.ts',
  ),
  '@pinecast/sb-resources$': path.resolve(
    __dirname,
    'packages/sb-resources/src/index.ts',
  ),
  '@pinecast/styles$': path.resolve(__dirname, 'packages/styles/src/index.ts'),

  '@pinecast/xhr$': path.resolve(__dirname, 'packages/xhr/src/index.ts'),
};
