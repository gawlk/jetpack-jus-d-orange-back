module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["clear-text"],
    testRunner: "jest",
    transpilers: ["babel"],
    coverageAnalysis: "off",
    babel: {
      optionsFile: null
    },
    mutate: [
      // Include:
      'src/**/*.js',
      // Exclude:
      '! src/**/*.test.js',
      '! src/controller/**/*.js',
      '! src/db.js',
      '! src/coverage',
      '! src/testFile.js'
    ]
  });
};
