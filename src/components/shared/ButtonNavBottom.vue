<template>
    <button type="button" :class="[isActive ? 'text-sky-600 dark:text-sky-500' : 'text-slate-600 dark:text-slate-500']" class="cursor-default md:cursor-pointer inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <slot />
        <span class="text-sm font-medium">{{ title }}</span>
    </button>
</template>

<script lang="ts" setup>
defineProps<{ title: string, isActive: boolean }>();
</script>