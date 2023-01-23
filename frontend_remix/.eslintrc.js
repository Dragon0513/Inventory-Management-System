/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
    extends: [
        "@remix-run/eslint-config",
        "@remix-run/eslint-config/node",
        "@remix-run/eslint-config/jest-testing-library",
        "prettier",
        "plugin:cypress/recommended",
    ],
    settings: {
        jest: {
            version: 28,
        },
    },
}
