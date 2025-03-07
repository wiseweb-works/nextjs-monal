import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = async () => {
  return [
    ...compat.extends('next/core-web-vitals', 'next/typescript', 'plugin:prettier/recommended'),
    {
      plugins: {
        import: (await import('eslint-plugin-import')).default,
        'unused-imports': (await import('eslint-plugin-unused-imports')).default,
        'simple-import-sort': (await import('eslint-plugin-simple-import-sort')).default,
        security: (await import('eslint-plugin-security')).default,
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        'import/order': ['error', { alphabetize: { order: 'asc' } }],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'unused-imports/no-unused-imports': 'error',
        'security/detect-object-injection': 'warn',
        'react/react-in-jsx-scope': 'off',
        'no-console': 'warn',
        'no-warning-comments': [
          'warn',
          {
            terms: ['TODO', 'FIXME'],
            location: 'anywhere',
          },
        ],
      },
      ignores: ['node_modules', '.next', 'dist', 'public'],
    },
  ];
};

export default eslintConfig();
