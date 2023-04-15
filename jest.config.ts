import type { Config } from 'jest';

export default async (): Promise<Config> => {
    return {
        preset: 'react-native',
        setupFilesAfterEnv: [ '@testing-library/jest-native/extend-expect' ],
        setupFiles: [ './jest.setup.ts' ],
        transformIgnorePatterns: [],
        testMatch: [
            '**/__tests__/**',
            '!**/src/**',
            '!**/__snapshots__/**'
        ]
    }
}
