module.exports = {
  modulePaths: ['./src'],
  setupFiles: ['./jest-setup.js'],
  transformIgnorePatterns: ['node_modules/(?!rxjs-hooks)'],
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node'
};
