const path = require('path');

module.exports = {
  '@pinecast/common': path.resolve(__dirname, 'packages/common/src/'),

  '@pinecast/db-import-tool$': path.resolve(
    __dirname,
    'packages/db-import-tool/src/index.ts',
  ),
  '@pinecast/db-spotify$': path.resolve(
    __dirname,
    'packages/db-spotify/src/index.ts',
  ),
  '@pinecast/db-upgrade$': path.resolve(
    __dirname,
    'packages/db-upgrade/src/index.ts',
  ),
  '@pinecast/externals': path.resolve(__dirname, 'packages/externals/src/'),

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
  '@pinecast/sb-styles$': path.resolve(
    __dirname,
    'packages/styles/src/index.ts',
  ),

  '@pinecast/xhr$': path.resolve(__dirname, 'packages/xhr/src/index.ts'),
};
