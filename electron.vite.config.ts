import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons-ng'
// 路径查找
const root = process.cwd()
function pathResolve(dir: string): string {
  return resolve(root, '.', dir)
}

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
        '@renderer': resolve('src/renderer/src'),
        '@demo': resolve('src/demo')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        dts: '../auto-import.d.ts', // 生成 `auto-import.d.ts` 全局声明
        // resolvers: [ElementPlusResolver()],
        // 自动导入eslint报错解决
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        }
      }),
      createSvgIconsPlugin({
        iconDirs: [pathResolve('src/assets/svgs')],
        symbolId: 'icon-[dir]-[name]'
      })
      // Components({
      //   resolvers: [ElementPlusResolver()]
      // })
    ]
  }
})
