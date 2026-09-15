import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier';

// Flat config sedan ESLint 9. next och prettier levereras redan i det formatet
// och kan användas direkt.
const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  prettier,
  {
    rules: {
      quotes: [1, 'single'],
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
        },
      ],
      'padding-line-between-statements': [
        1,
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  },
];

export default eslintConfig;
