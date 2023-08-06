/// <reference types="vitest" />
import { defineConfig, splitVendorChunkPlugin } from 'vite';

import viteTsConfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/vite-app',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  build: {
    minify: 'esbuild',
  },
  // base: '',
  assetsInclude: [
    '**/*.wasm, **/*.gltf, **/*.glb, **/*.bin, **/*.ktx2, **/*.*',
  ],

  plugins: [
    viteTsConfigPaths({
      root: '../../',
    }),
    nodePolyfills({
      // To exclude specific polyfills, add them to this list.
      exclude: [
        'fs', // Excludes the polyfill for `fs` and `node:fs`.
      ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
    viteCommonjs({
      exclude: ['libs/'],
    }),
    splitVendorChunkPlugin(),
  ],

  // define: {
  //   'process.env': {},
  //   'global': {},
  // },

  resolve: {
    alias: {
      'cannon-es': 'cannon-es/dist/cannon-es.js',
      'three-mesh-bvh': 'three-mesh-bvh/src/index.js',
    },
  },
  // optimizeDeps: {
  //   include: ['aframe-input-mapping-component'],
  // },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },
});
