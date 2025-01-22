module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['@typescript-eslint'],
  env: {
    'jest/globals': true
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'plugin:@typescript-eslint/recommended'
      ],
      rules: {
        // Vos règles personnalisées ici
      },
    },
  ],
};
