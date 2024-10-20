const path = require('path');

const babelConfig = {
  presets: [ 'module:@react-native/babel-preset' ],
  plugins: [
    [ 'module:react-native-dotenv', {
      'envName': 'APP_ENV',
      'moduleName': '@env',
      'path': '.env',
      'blocklist': null,
      'allowlist': null,
      'blacklist': null, // DEPRECATED
      'whitelist': null, // DEPRECATED
      'safe': false,
      'allowUndefined': true,
      'verbose': false
    } ],
    [ 'module-resolver', {
      extensions: ['.ios.js', '.android.js', '.ios.jsx', '.android.jsx', '.js', '.jsx', '.json', '.ts', '.tsx'],
      root: ['.'],
      alias: {
        '@application': path.resolve(__dirname, './src/application'),
        '@assets': path.resolve(__dirname, './src/presentation/assets'),
        '@auth': path.resolve(__dirname, './src/presentation/modules/auth'),
        '@config': path.resolve(__dirname, './src/config'),
        '@courses': path.resolve(__dirname, './src/presentation/modules/courses'),
        '@domain': path.resolve(__dirname, './src/domain'),
        '@infrasturcture': path.resolve(__dirname, './src/infrasturcture'),
        '@lessons': path.resolve(__dirname, './src/presentation/modules/lessons'),
        '@mocks': path.resolve(__dirname, './__tests__/mocks'),
        '@navigation': path.resolve(__dirname, './src/presentation/navigation'),
        '@package': path.resolve(__dirname, './package.json'),
        '@preaching': path.resolve(__dirname, './src/presentation/modules/preaching'),
        '@providers': path.resolve(__dirname, './src/presentation/providers'),
        '@revisits': path.resolve(__dirname, './src/presentation/modules/revisits'),
        '@services': path.resolve(__dirname, './src/presentation/services'),
        '@setups': path.resolve(__dirname, './__tests__/setups'),
        '@shared': path.resolve(__dirname, './src/presentation/modules/shared'),
        '@test-config': path.resolve(__dirname, './__tests__/config'),
        '@test-setup': path.resolve(__dirname, './jest.setup.ts'),
        '@theme': path.resolve(__dirname, './src/presentation/modules/theme'),
        '@ui': path.resolve(__dirname, './src/presentation/modules/ui'),
        '@utils': path.resolve(__dirname, './src/presentation/utils')
      }
    } ],
    [
      'react-native-reanimated/plugin',
      {
        relativeSourceLocation: true
      }
    ]
  ]
}

module.exports = babelConfig;