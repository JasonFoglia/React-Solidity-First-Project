import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

const nonce = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      //'content-security-policy': "default-src 'self' 'unsafe-eval' 'unsafe-inline'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
      'content-security-policy': "default-src 'self' 'unsafe-eval' 'unsafe-inline'; script-src 'self' 'nonce-" + nonce + "' 'unsafe-eval'"
    },
  },
  html: {
    cspNonce: nonce,
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser global polyfills
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
})
