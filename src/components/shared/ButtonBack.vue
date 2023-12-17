<template>
    <button type="button" @click="$router.push(to)" class="mt-8 inline-flex justify-center py-2 px-4 text-sm font-medium rounded-md text-slate-700 hover:text-sky-500 md:hover:ring-1 transition dark:text-white dark:hover:text-sky-500 hover:border-slate-800/25 absolute left-1.5 md:left-14 top-5 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        <span class="ml-2">Back</span>
    </button>
    <router-link to="/" class="text-sm md:text-xl relative mx-auto mt-[60px] md:mt-14 inline-flex items-center space-x-1.5">
        <span class="text-slate-800 dark:text-white font-semibold">Al-Qur'an Digital</span>
    </router-link>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';
defineProps<{ to: RouteLocationRaw }>()
</script>