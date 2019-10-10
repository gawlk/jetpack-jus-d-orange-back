module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["clear-text", "progress"],
    testRunner: "jest",
    transpilers: ["babel"],
    coverageAnalysis: "off",
    babel: {
      optionsFile: null
    },
    files: [
        // Include:
        'src/**/*.js',
        // Exclude:
        '! src/controller/**/*.js',
        '! src/db.js'
    ]
  });
};
