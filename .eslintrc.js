module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['tsconfig.eslint.json'],
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        indent: ['error', 4],
        'import/prefer-default-export': 0,
    },
};
