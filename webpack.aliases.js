const path = require('path');

module.exports = {
  '@piencast/sb-components$': path.resolve(
    __dirname,
    'packages/sb-components/src/index.ts',
  ),
  '@piencast/sb-presets$': path.resolve(
    __dirname,
    'packages/sb-presets/src/index.js',
  ),
  '@piencast/sb-renderer$': path.resolve(
    __dirname,
    'packages/sb-renderer/src/index.ts',
  ),
  '@piencast/sb-resources$': path.resolve(
    __dirname,
    'packages/sb-resources/src/index.ts',
  ),
  '@piencast/sb-styles$': path.resolve(
    __dirname,
    'packages/styles/src/index.ts',
  ),
};
