<template>
<div class="fixed group bottom-10 right-5 float-right transition hover:ring-sky-400 dark:hover:ring-sky-400  bg-slate-50/25 backdrop-blur-sm dark:bg-dark-blue/25 ring-1 ring-slate-700/10 dark:ring-slate-700/50 shadow-xl p-2 rounded-full">
    <div class="inline-flex space-x-4">
        <button @click="$emit('on-back')" class="p-1.5 cursor-default md:cursor-pointer rounded-full focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 text-slate-600 dark:text-sky-400 group-hover:animate-bounce group-hover:text-sky-500" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="m12 4.5l5 5m-5-5l-5 5m5-5V11m0 3.5c0 1.667-1 5-5 5"/></svg>
        </button>
    </div>
</div>
</template>

<script setup lang="ts"></script>