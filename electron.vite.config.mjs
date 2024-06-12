import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      react(),
      UnoCSS(),
      AutoImport({
        imports: [
          'react',
          'react-router-dom',
          {
            classnames: [['default', 'cls']],
            'overlayscrollbars-react': [['OverlayScrollbarsComponent', 'Scrollbar']],
            'react-toastify': ['toast']
          }
        ],
        dts: './auto-imports.d.ts'
      })
    ]
  }
})
