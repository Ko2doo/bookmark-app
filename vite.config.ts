import vue from '@vitejs/plugin-vue';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  base: '/',
  clearScreen: true,

  // css options
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      } as Record<string, unknown>,
    },
  },

  // build options
  build: {
    minify: true,
    copyPublicDir: true,
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    reportCompressedSize: true,
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/assets/styles', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@interfaces': fileURLToPath(new URL('./src/interfaces', import.meta.url)),
    },
  },
});
