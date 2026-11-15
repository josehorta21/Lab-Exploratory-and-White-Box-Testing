/** Jest runs React component tests in a simulated browser environment. */
module.exports = {
  testEnvironment: 'jsdom',
  transform: { '^.+\.[jt]sx?$': 'babel-jest' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverageFrom: ['src/App.tsx'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};
