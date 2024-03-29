/// <reference types="vite" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import * as path from 'node:path';

import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      runtimeOnly: false,
      include: path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'),
    }),
    VitePWA({
      registerType: 'prompt',
      manifest: {
        name: "Al-Qur'an",
        short_name: "Al-Qur'an",
        start_url: '/',
        theme_color: "#0B1120",
        background_color: "#0B1120",
        description: "Mengelola bacaan dan hafalan Al-Qur'an",
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          }
        ],

        shortcuts: [
          {
            name: "Home Dashboard",
            url: "/home-dashboard",
            icons: [{
              src: 'android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },],
          }
        ],
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    port: 3000
  },
})