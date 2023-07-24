import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    clearMocks: true,
    moduleFileExtensions: ['js', 'json', 'ts'],
    testEnvironment: 'node',
};

export default config;
