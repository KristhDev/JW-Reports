module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 0,
    'eol-last': 0,
    'semi': 0,
    'comma-dangle': 0,
    'react-native/no-inline-styles': 0,
    '@typescript-eslint/no-shadow': 0,
    'react-hooks/exhaustive-deps': 0,
    'curly': 0
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
