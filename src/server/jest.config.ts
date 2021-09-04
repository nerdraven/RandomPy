export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  coverageProvider: "v8",
  coverageReporters: [
    "lcov",
    "clover"
  ],
  globals: {},
  maxWorkers: "50%",

  moduleFileExtensions: [
    "js",
    "ts",
    "json",
  ],

  notify: true,
  notifyMode: "failure-change",
  rootDir: "tests/",
  setupFiles: [],

  testMatch: [
    "**/tests/*.ts",
  ],

  watchman: true,
};
