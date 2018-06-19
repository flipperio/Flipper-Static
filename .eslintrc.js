const path = require('path');
module.exports = {
    'parserOptions': {
        'sourceType': 'module',
        'ecmaVersion': 6,
    },
    'env': {
        'browser': true,
        'jest': true
    },
    'extends': [
        'eslint-config-airbnb',
        path.resolve(__dirname, 'coding-standards/.eslintrc-chox.js'),
        path.resolve(__dirname, 'coding-standards/.eslintrc-import.js'),
        path.resolve(__dirname, 'coding-standards/.eslintrc-react.js'),
        path.resolve(__dirname, 'coding-standards/.eslintrc-jsx-a11y.js'),
    ],
}
