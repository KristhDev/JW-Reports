import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'react-native',
    setupFilesAfterEnv: [ '@testing-library/jest-native/extend-expect' ],
    setupFiles: [ './jest.setup.js' ],
    transformIgnorePatterns: [],
    testMatch: [
        '**/__tests__/**',
        '!**/src/**',
        '!**/__snapshots__/**'
    ]
};

export default config;
