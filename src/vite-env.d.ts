/// <reference types="vite/client" />

import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@heroicons/vue/solid';
declare module '@heroicons/vue/outline';
declare module '@vueuse/motion';
declare module 'virtual:pwa-register';
declare module 'amplitudejs';
declare module 'crypto-js';
declare module 'pinia' { export interface PiniaCustomProperties { router: Router, route: RouteLocationNormalizedLoaded } };

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