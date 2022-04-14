import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), svgrPlugin(), tsconfigPaths({ root: '../../' })],
  root: './src/renderer',
  base: './',
  build: {
    outDir: '../../build/renderer'
  }
})
