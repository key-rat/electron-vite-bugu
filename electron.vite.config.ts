import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@common': resolve('src/common'),
        '@main': resolve('src/main'),
        '@type': resolve('src/type')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@common': resolve('src/common'),
        '@type': resolve('src/type'),
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [vue()]
  }
})
