/* eslint-disable no-alert, no-console */
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import * as path from 'path';

export default defineConfig({
  test:{},
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',

      manifest: {
        name: "Al-Quran Digital",
        short_name: "Al-Quran Digital",
        start_url: '/',
        theme_color: "#0B1120",
        background_color: "#0B1120",
        description: "Mengelola bacaan dan hafalan Al-Quran",
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
  }
})