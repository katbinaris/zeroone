module.export = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020,
    requireConfigFile: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@intlify/vue-i18n/recommended',
    'prettier',
  ],
  settings: {
    'vue-i18n': {
      localeDir: '@/lang/*.{json,json5,yaml,yml}',
      messageSyntaxVersion: '^9.0.0',
    },
  },
  rules: {
    indent: 'off',
    camelcase: 'off',
    'space-before-function-paren': 'off',
    'object-curly-spacing': 'off',
    'comma-dangle': 'off',
    'vue/html-self-closing': 'warn',
    '@intlify/vue-i18n/no-v-html': 'off',
    '@intlify/vue-i18n/no-dynamic-keys': 'off',
    '@intlify/vue-i18n/no-raw-text': [
      'warn',
      {
        ignorePattern: '^(([\\W\\d]+)|(http.*))|()$',
        ignoreNodes: [
          'code',
        ],
      },
    ],
    '@intlify/vue-i18n/no-unused-keys': [
      'error',
      {
        extensions: [
          '.js',
          '.ts',
          '.vue',
        ],
      },
    ],
  },
}