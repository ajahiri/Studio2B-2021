module.exports = {
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  arrowParens: 'avoid',
  disableLanguages: ['html'],
  overrides: [
    {
      files: ['*.css', '*.less'],
      options: {
        useTabs: true,
        printWidth: 240,
      },
    },
  ],
};
