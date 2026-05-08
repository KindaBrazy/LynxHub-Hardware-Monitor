import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'electron-vite';
import {resolve} from 'path';

export default defineConfig({
  main: {
    root: resolve('extension/src/main'),
    build: {
      externalizeDeps: {exclude: ['graceful-fs']},
      outDir: resolve('extension_out/main'),
      rollupOptions: {
        input: resolve('extension/src/main/lynxExtension.ts'),
        output: {entryFileNames: 'mainEntry.cjs', format: 'cjs'},
      },
    },
    resolve: {
      alias: {
        '@lynx_common': resolve(__dirname, 'src/common'),
        '@lynx_main': resolve(__dirname, 'src/main'),
      },
    },
  },
  renderer: {
    root: resolve('extension/src/renderer'),
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'extension',
        filename: 'rendererEntry.mjs',
        exposes: {
          Extension: resolve('extension/src/renderer/Extension.tsx'),
        },
        shared: {
          react: {generate: false},
          'react-dom': {generate: false},
          'react-redux': {generate: false},
          '@heroui/react': {generate: false},
          '@heroui/styles': {generate: false},
          'react-aria': {generate: false},
        },
      }),
    ],
    resolve: {
      alias: {
        '@lynx_module': resolve(__dirname, 'module/src'),
        '@lynx_extension': resolve(__dirname, 'extension/src'),
        '@lynx_common': resolve(__dirname, 'src/common'),
        '@lynx': resolve(__dirname, 'src/renderer/mainWindow'),
        '@lynx_shared': resolve(__dirname, 'src/renderer/shared'),
        '@lynx_assets': resolve(__dirname, 'src/renderer/shared/assets'),
      },
    },
    build: {
      outDir: resolve('extension_out/renderer'),
      rollupOptions: {
        input: resolve('extension/src/renderer/index.html'),
        treeshake: {moduleSideEffects: false},
      },
      assetsDir: '',
      minify: false,
      target: 'esnext',
      cssCodeSplit: false,
      modulePreload: false,
    },

    publicDir: resolve(__dirname, 'extension/src/renderer/Public'),
  },
});
