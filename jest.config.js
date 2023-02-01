const dynamoPreset = require('jest-dynalite/jest-preset');
const _ = require('lodash');
const tsPreset = require('ts-jest/jest-preset');

module.exports = _.merge(tsPreset, dynamoPreset, {
  setupFilesAfterEnv: [
    'jest-dynalite/setupTables',
    'jest-dynalite/clearAfterEach',
  ],
  testPathIgnorePatterns: [
    '/dist/',
    '/node_modules/',
    '/test/acceptance/'
  ],
});
