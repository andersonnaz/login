import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "@shelf/jest-mongodb",
  roots: [
    "<rootDir>/src"
  ],
  testEnvironment: "node",
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
};

export default config;
