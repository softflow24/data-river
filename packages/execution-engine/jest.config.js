const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = require("../../tsconfig.base.json");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/__tests__"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: "<rootDir>/../..",
    }),
    "^@blocks$": "<rootDir>/../blocks/src",
    "^@blocks/(.*)$": "<rootDir>/../blocks/src/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>/../.."],
};
