module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "prefer-const": ["warn"],
        "sort-imports": ["warn"],
        "spaced-comment": ["warn"],
    }
}
