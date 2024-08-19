import type { Config } from 'jest';

const jestConfig: Config = {
    bail: 1,
    coverageDirectory: '__tests__/coverage',
    coverageProvider: 'v8',
    fakeTimers: {
        enableGlobally: true
    },
    moduleDirectories: [ 'node_modules', '<rootDir>' ],
    moduleFileExtensions: [ 'ts', 'tsx', 'js', 'jsx', 'json', 'node', 'setup.ts' ],
    modulePathIgnorePatterns: [
        '<rootDir>/__tests__/mocks/',
        '<rootDir>/__tests__/setups/',
        '<rootDir>/__tests__/config',
        '<rootDir/>/src',
        '<rootDir/>/ReactotronConfig.ts'
    ],
    preset: 'react-native',
    setupFiles: [ './jest.setup.ts' ],
    setupFilesAfterEnv: [ './jest.setup-after-env.ts' ],
    transformIgnorePatterns: [],
    verbose: true,
}

export default jestConfig;