module.exports = {
    env: {
        node: true,
        browser: true,
        es6: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:promise/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:react-hooks/recommended',
        'plugin:jsdoc/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018,
        project: './tsconfig.json',
        sourceType: 'module'
    },
    plugins: [
        'react',
        'react-hooks',
        '@typescript-eslint',
        'jsdoc',
        'import',
    ],
    settings: {
        'import/resolver': {
            typescript: {}
        },
        react: { version: 'detect' }
    },
    rules: {
        'indent': [
            'error',
            4
        ],
        'semi': [
            'error',
            'always'
        ]
    },
    overrides: [
        {
            files: ["*.test.*"],
            rules: {
                "react/jsx-key": "off"
            }
        }
    ]
}
