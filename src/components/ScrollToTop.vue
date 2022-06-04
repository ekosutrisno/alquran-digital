<template>
<div class="fixed group bottom-10 right-5 float-right transition hover:ring-sky-400 dark:hover:ring-sky-400  bg-slate-50/25 backdrop-blur-sm dark:bg-dark-blue/25 ring-1 ring-slate-700/10 dark:ring-slate-700/50 shadow-xl p-2 rounded-full">
    <div class="inline-flex space-x-4">
        <button @click="$emit('on-back')" class="p-2 cursor-default md:cursor-pointer rounded-full focus:outline-none">
            <svg class="w-5 text-slate-600 dark:text-sky-400 group-hover:animate-bounce group-hover:text-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
        </button>
    </div>
</div>
</template>

<script setup lang="ts"></script>