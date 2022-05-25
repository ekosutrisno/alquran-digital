<template>
    <button type="button" @click="$router.back()" class="mt-8 inline-flex justify-center py-2 px-4 text-sm font-medium rounded-md text-slate-500 dark:text-white hover:text-sky-500" :class="[asLink ? '' : 'bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2', addClass]">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        <span class="ml-2"> {{text}} </span>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    text?: string
    asLink?: boolean
    addClass?: string
}>()
</script>