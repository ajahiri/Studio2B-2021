module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['airbnb', '@react-native-community', 'prettier', 'prettier/react'],
  plugins: ['react', 'react-native', 'jsx-a11y', 'import', 'prettier'],
  rules: {
    // 0=ignore, 1=warning, 2=error
    'no-plusplus': 1,
    'no-shadow': 1,
    'camelcase': 1,
    'no-restricted-globals': 1,
    'no-underscore-dangle': 0,
    'no-unused-vars': 1,
    'no-restricted-syntax': 1,
    'no-param-reassign': 1,
    'prefer-destructuring': 1,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-no-bind': 1,
    'react/jsx-wrap-multilines': 1,
    'react/sort-comp': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 1,
    'import/no-named-as-default': 1,
    'import/no-named-as-default-member': 1,
    'prettier/prettier': ['error', { singleQuote: true, bracketSpacing: true }],
    'object-curly-spacing': 0
  }
};
