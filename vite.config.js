import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate', // 自动更新
      devOptions: {
        enabled: true, // 启用开发模式的 PWA
      },
      manifest: {
        name: '记录',
        short_name: '记录',
        description: '记录',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      resolvers: [PrimeVueResolver()],
    }),
    UnoCSS(),
    vue(),
  ],
  // vite.config.js
  server: {
    proxy: {
      '/api': {
        target: 'https://api.suqi.xyz',
        // target: 'http://localhost:3333',
        changeOrigin: true,
      },
      '/hot': {
        target: 'https://api.52vmy.cn',
        changeOrigin: true,
      },
    },
  },
})
