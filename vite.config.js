import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// set repository to define base property for github deploy
const REPOSITORY_NAME = 'quick-json-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: `/${REPOSITORY_NAME}/`,
  // for path alias
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@/': `${__dirname}/src/`,
      // eslint-disable-next-line no-undef
      '~/': `${__dirname}/public/`,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest-setup.jsx',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
    coverage: {
      exclude: ['.eslintrc.cjs', 'src/main.jsx'],
    },
  },
});
