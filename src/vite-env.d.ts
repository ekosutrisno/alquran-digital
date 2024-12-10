/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@heroicons/vue/solid';
declare module '@heroicons/vue/outline';
declare module '@vueuse/motion';
declare module 'virtual:pwa-register';
declare module 'amplitudejs';
declare module 'crypto-js';

interface ImportMetaEnv {
  readonly VITE_BASE_FIREBASE_APIKEY: string;
  readonly VITE_BASE_FIREBASE_AUTHDOMAIN: string;
  readonly VITE_BASE_FIREBASE_PROJECTID: string;
  readonly VITE_BASE_FIREBASE_STORAGEBUCKET: string;
  readonly VITE_BASE_FIREBASE_MESSAGINGSENDERID: string;
  readonly VITE_BASE_FIREBASE_APPID: string;
  readonly VITE_BASE_FIREBASE_MEASUREMENTID: string;
  readonly VITE_BASE_FIREBASE_VAPID: string;
  readonly VITE_BASE_FIREBASE_DATABASE_URL: string;
  readonly VITE_BASE_APP_VERSION: string;
  readonly VITE_DEFAULT_LOCALE: string;
  readonly VITE_FALLBACK_LOCALE: string;
  readonly VITE_SUPPORTED_LOCALES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}