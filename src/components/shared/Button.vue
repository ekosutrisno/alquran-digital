<template>
    <router-link
        class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 dark:ring-0 dark:focus:ring-offset-0"
        :to="to"
        :class="[addClass]"
    >
        {{ text }}
    </router-link>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
    text?: string
    addClass?: string
    to: RouteLocationRaw
}>()
</script>