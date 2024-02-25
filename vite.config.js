import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // for path alias
  resolve: {
    alias: {
      '@/': `${__dirname}/src/`, // eslint-disable no-undef
      '~/': `${__dirname}/public/`, // eslint-disable no-undef
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
