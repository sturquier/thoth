const threshold = 80

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
  ],
  coveragePathIgnorePatterns: [
    'src/serviceWorker.ts',
    'index.ts$',
    'index.tsx$'
  ],
  coverageThreshold: {
    global: {
      statements: threshold,
      branches: threshold,
      functions: threshold,
      lines: threshold
    }
  },
  setupFiles: [
    './tests/setupTests.ts'
  ],
  setupFilesAfterEnv: [
    './tests/setupTestsAfterEnv.ts'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
    '\\.(css|scss)$': '<rootDir>/tests/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|woff|woff2|png|jpeg|jpg)$': '<rootDir>/tests/__mocks__/fileMock.js'
  }
}
