<template>
    <div class="fixed flex items-center justify-center group right-6 bottom-6 transition hover:ring-sky-400 dark:hover:ring-sky-400  bg-slate-50/25 backdrop-blur-sm dark:bg-dark-blue/25 ring-1 ring-slate-700/10 dark:ring-slate-700 shadow-xl p-2 rounded-full">
        <button @click="$emit('on-back')" class="w-6 h-6 rounded-full cursor-default md:cursor-pointer focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-slate-600 dark:text-sky-400 group-hover:text-sky-500" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="m12 4.5l5 5m-5-5l-5 5m5-5V11m0 3.5c0 1.667-1 5-5 5"/></svg>
        </button>
    </div>
</template>