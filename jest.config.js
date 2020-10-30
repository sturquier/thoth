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
      statements: 80,
      branches: 70,
      functions: 65,
      lines: 80
    }
  },
  moduleNameMapper: {
    "^.+\\.(less)$": "identity-obj-proxy"
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
    '\\.(gif|ttf|eot|woff|woff2|png|jpeg|jpg|svg)$': '<rootDir>/tests/__mocks__/fileMock.js'
  }
}
