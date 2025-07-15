import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from '@rollup/plugin-inject'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  define: {
    global: 'window',
  },
  build: {
      rollupOptions: {
        plugins: [
          inject({
            include: ['node_modules/@ledgerhq/**'],
            modules: { Buffer: ['buffer', 'Buffer'], }
          })
        ],
      },
  },
  optimizeDeps: {
      include: ['buffer'],
      esbuildOptions: {
          // Node.js global to browser globalThis
          define: {
              global: 'globalThis'
          },
          // Enable esbuild polyfill plugins
          plugins: [
              NodeGlobalsPolyfillPlugin({
                  buffer: true
              })
          ]
      }
  },
  resolve: {
      alias: {
          buffer: 'buffer',
      },
  },
})
