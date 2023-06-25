<template>
    <div v-if="!online" tabindex="-1" class="with-transition fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] lg:max-w-screen-sm p-4 -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-lg shadow-slate-200 dark:shadow-slate-900 left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600">
        <div class="flex flex-col items-start mb-3 mr-4 md:items-center md:flex-row md:mb-0">
            <p class="flex items-center mb-2 text-sky-500 border-gray-200 md:pr-4 md:mr-4 md:border-r md:mb-0 dark:border-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M23.21 8.24A16.871 16.871 0 0 0 12 4C7.7 4 3.78 5.6.79 8.24C.35 8.63.32 9.3.73 9.71l10.56 10.58c.19.19.45.29.7.29V14c0-1.1.9-2 2-2h6.99l2.29-2.29c.41-.41.38-1.08-.06-1.47z"/><path fill="currentColor" d="M20.3 14.71a.996.996 0 0 0-1.41 0l-1.39 1.38l-1.39-1.38a.996.996 0 1 0-1.41 1.41l1.39 1.39l-1.39 1.39a.996.996 0 1 0 1.41 1.41l1.39-1.38l1.39 1.38a.996.996 0 1 0 1.41-1.41l-1.38-1.39l1.38-1.39a.996.996 0 0 0 0-1.41z"/></svg>
                <span class="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Oops! You're offline</span>
            </p>
            <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">Please check your internet connection and try again.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useOnline } from '@vueuse/core';
const online = useOnline();
</script>