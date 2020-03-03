const OFF = 0;
const WARNING = 1;
const ERROR = 2;

const noExtraneousDependencies = [ERROR, { devDependencies: true }];
const jsxFragmentsOptions = [ERROR, 'element'];

module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'prettier/react',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:node/recommended',
  ],
  plugins: ['react', 'react-hooks', 'sort-imports-es6-autofix', 'import'],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      defaultParams: true,
      spread: true,
    },
  },
  rules: {
    'object-curly-newline': OFF,
    'arrow-parens': OFF,
    'node/no-unsupported-features/es-syntax': OFF,
    'node/no-unpublished-require': OFF,
    'node/no-unpublished-import': OFF,

    'import/extensions': OFF,
    'import/no-cycle': OFF,
    'import/no-extraneous-dependencies': noExtraneousDependencies,
    'import/no-dynamic-require': OFF,
    'import/no-unresolved': ERROR,
    'import/prefer-default-export': OFF,

    'comma-dangle': OFF,
    'callback-return': OFF,
    'handle-callback-err': WARNING,
    'array-callback-return': WARNING,
    'class-methods-use-this': OFF,
    'consistent-return': OFF,
    'func-names': OFF,
    'global-require': OFF,
    // too noisy
    'no-use-before-define': OFF,
    'no-console': OFF,
    // treats function parameters as constants, probably too noisy ATM
    'no-param-reassign': OFF,
    'no-plusplus': OFF,
    'no-process-exit': OFF,
    'no-restricted-globals': OFF,
    'no-shadow': WARNING,
    // disabled as it's too noisy ATM
    eqeqeq: [OFF, 'allow-null'],
    'no-underscore-dangle': OFF,
    'no-useless-escape': OFF,
    'no-void': OFF,
    // syntax error in strict mode, almost certainly unintended in any case
    'no-dupe-keys': ERROR,
    'vars-on-top': OFF,
    'max-len': OFF,
    'prefer-destructuring': OFF,
    // "Hello, " + name + "!" vs `Hello, ${name}!` - Auto Fix
    'prefer-template': WARNING,
    quotes: OFF,
    camelcase: OFF,
    radix: OFF,
    semi: ERROR,
    'space-before-function-paren': OFF,
    // Personal preference
    'no-else-return': OFF,

    'jsx-a11y/alt-text': OFF,
    'jsx-a11y/anchor-has-content': OFF,
    'jsx-a11y/anchor-is-valid': OFF,
    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/label-has-associated-control': OFF,
    'jsx-a11y/label-has-for': OFF,
    'jsx-a11y/no-static-element-interactions': OFF,
    'jsx-a11y/tabindex-no-positive': OFF,

    'react-hooks/rules-of-hooks': ERROR,
    // eslint --fix often breaks things, best to check manually
    'react-hooks/exhaustive-deps': OFF,

    'react/destructuring-assignment': OFF,
    'react/forbid-prop-types': OFF,
    'react/jsx-filename-extension': OFF,
    'react/jsx-fragments': jsxFragmentsOptions,
    // Think about turning this one on
    'react/jsx-handler-names': OFF,
    'react/jsx-no-bind': ERROR,
    'react/jsx-no-duplicate-props': ERROR,
    'react/jsx-pascal-case': ERROR,
    'react/jsx-sort-props': WARNING,
    'react/jsx-uses-vars': WARNING,
    'react/no-access-state-in-setstate': ERROR,
    'react/no-did-update-set-state': OFF,
    'react/no-typos': OFF,
    'react/no-unescaped-entities': OFF,
    'react/no-unused-state': WARNING,
    'react/prefer-stateless-function': WARNING,
    'react/prop-types': WARNING,
    'react/require-default-props': OFF,
    'react/sort-comp': WARNING,
    'react/state-in-constructor': OFF,

    'sort-imports-es6-autofix/sort-imports-es6': WARNING,
  },
};
