import fs from 'node:fs'
import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
// 读取自动生成的 globals
let autoImportGlobals = {}
try {
  const autoImport = JSON.parse(fs.readFileSync('./.eslintrc-auto-import.json', 'utf8'))
  autoImportGlobals = autoImport.globals ?? {}
} catch {
  // 忽略错误，首次运行可能未生成
}
export default tseslint.config(
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  tseslint.configs.recommended,
  eslintPluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        extraFileExtensions: ['.vue'],
        parser: tseslint.parser
      },
      globals: autoImportGlobals // ✅ 添加自动导入的 globals
    }
  },
  {
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts'
          }
        }
      ],
      // 忽略以下划线开头的未使用变量
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/member-ordering': [
        'warn',
        {
          default: [
            // 静态字段
            'public-static-field',
            'protected-static-field',
            'private-static-field',

            // 静态方法
            'public-static-method',
            'protected-static-method',
            'private-static-method',

            // 实例字段
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',

            // 构造器
            'constructor',

            // 实例方法
            'public-instance-method',
            'protected-instance-method',
            'private-instance-method'
          ]
        }
      ]
    }
  },
  eslintConfigPrettier
)
