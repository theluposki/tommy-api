import { defineConfig } from 'tsup'

export default defineConfig({
  loader: {
    '.html': 'text',
    '.css': 'css',
  },
  entry: ['src/index.ts'],
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  clean: true,
})
