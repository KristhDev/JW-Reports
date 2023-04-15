module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-private-property-in-object',
    ['module:react-native-dotenv', {
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
    }],
    'react-native-reanimated/plugin'
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  }
};
