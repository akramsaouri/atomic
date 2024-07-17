module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",

    // Ignore examples folder
    testPathIgnorePatterns: ["/node_modules/", "/examples/"],

    // Exclude examples folder from coverage
    coveragePathIgnorePatterns: ["/node_modules/", "/examples/"],
};
