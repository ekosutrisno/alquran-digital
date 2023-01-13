/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@heroicons/vue/solid';
declare module '@heroicons/vue/outline';
declare module 'virtual:pwa-register';
declare module 'amplitudejs';

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_BASE_MEDIA_SERVER: string;
  readonly VITE_BASE_FIREBASE_APIKEY: string;
  readonly VITE_BASE_FIREBASE_AUTHDOMAIN: string;
  readonly VITE_BASE_FIREBASE_PROJECTID: string;
  readonly VITE_BASE_FIREBASE_STORAGEBUCKET: string;
  readonly VITE_BASE_FIREBASE_MESSAGINGSENDERID: string;
  readonly VITE_BASE_FIREBASE_APPID: string;
  readonly VITE_BASE_FIREBASE_MEASUREMENTID: string;
  readonly VITE_BASE_FIREBASE_VAPID: string;
  readonly VITE_BASE_APP_VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}