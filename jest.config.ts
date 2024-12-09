import type { Config } from 'jest';

const jestConfig: Config = {
    bail: 1,
    collectCoverageFrom: [
        '**/__tests__/unit/**/*.{ts,tsx,js,jsx}',
        '**/__tests__/integration/**/*.{ts,tsx,js,jsx}',
        '!**/__tests__/coverage/**',
        '!**/node_modules/**',
        '!**/babel.config.js',
        '!**/expo-env.d.ts',
        '!**/.expo/**'
    ],
    coverageDirectory: '__tests__/coverage',
    coverageProvider: 'v8',
    fakeTimers: {
        enableGlobally: true
    },
    moduleDirectories: [ 'node_modules', '<rootDir>' ],
    moduleFileExtensions: [ 'ts', 'tsx', 'js', 'jsx', 'json', 'node', 'setup.ts' ],
    modulePathIgnorePatterns: [
        '<rootDir>/__tests__/coverage',
        '<rootDir>/__tests__/mocks',
        '<rootDir>/__tests__/setups',
        '<rootDir>/src',
        '<rootDir>/ReactotronConfig.ts',
    ],
    preset: 'jest-expo',
    setupFiles: [ './jest.setup.ts' ],
    setupFilesAfterEnv: [ './jest.setup-after-env.ts' ],
    transform: {
        '\\.[jt]sx?$': [ 'babel-jest', { caller: { preserveEnvVars: true } } ],
    },
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)',
        'node_modules/(?!(react-native|@react-native/js-polyfills)/)',
    ],
    verbose: true
}

export default jestConfig;