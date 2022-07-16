<template>
<div class="space-y-6">
    <!-- S1 -->
    <section>
        <div class="pb-2">
            <p class="text-xl dark:text-white inline-flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>Theme preferences</span>
            </p>
            <div class="border-t dark:border-slate-700/50 mt-2 py-2">
                <p class="text-sm text-slate-600 dark:text-slate-300">Choose how Al-Quran Digital looks to you. Select a single theme, or sync with your system and automatically switch between day and night themes.</p>
            </div>
        </div>
        <div class="text-sm dark:text-white max-w-md">
            <div @click="toggle()" class="border cursor-pointer dark:hover:bg-sky-800/50 hover:bg-sky-100/75 transition border-sky-500 dark:border-slate-700/50 rounded-lg p-3 flex flex-col">
                <div class="inline-flex justify-between">
                    <div class="inline-flex dark:hidden items-center space-x-1.5 text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        <p class="font-semibold"> Day theme </p>
                    </div>
                    <div class="hidden dark:inline-flex items-center space-x-1.5 text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        <p class="font-semibold"> Night theme </p>
                    </div>
                    <span class="text-xs py-0.5 px-1.5 text-sky-500 rounded-full border border-sky-500">Active</span>
                </div>
                <p class="text-xs mt-3 dark:hidden">This theme will be active when your system is set to “light mode”</p>
                <p class="text-xs mt-3 hidden dark:block">This theme will be active when your system is set to “dark mode”</p>
            </div>
        </div>
    </section>

    <!-- S2 -->
    <section>
        <div class="pb-2">
            <p class="text-xl dark:text-white inline-flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                 <span>Card ayah width</span>
            </p>
            <div class="border-t dark:border-slate-700/50 mt-2 py-2">
                <p class="text-sm text-slate-600 dark:text-slate-300">This is the provider that is used for you to log in to the application and also what accounts are connected.</p>
            </div>
        </div>

         <div class="grid grid-cols-3 gap-2">
            <ul v-for="size in state.sizes" :key="size.id">
                <button type="button" @click="selectSize(size)" :class="[size.id == state.sizeSelected.id ? 'bg-sky-500 ring-0 text-white' : '']" class="py-2 rounded-lg ring-1 ring-slate-700/20 dark:ring-slate-700/50 dark:hover:ring-sky-500 hover:ring-sky-500 px-3 inline-flex items-center justify-center space-x-1 w-full relative dark:text-white transition">
                    <div class="col-span-1 hidden md:inline">{{ size.size }}</div> <div class="text-sm col-span-3 text-left"> &bull; {{ size.text}}</div>
                </button>
            </ul>
         </div>
    
    </section>
</div>
</template>

<script setup lang="ts">
import { useUtil } from '@/services';
import { useDark, useToggle } from '@vueuse/core';
import { reactive } from 'vue';

const isDark = useDark();
const toggle = useToggle(isDark);

const utilService = useUtil();


const state = reactive({
    sizeSelected: localStorage.getItem('_a_size') != null
        ? JSON.parse(localStorage.getItem('_a_size') as string)
        : {
            id: 1,
            size: 'MD',
            text: 'Medium',
            class: 'max-w-screen-lg'
        },
    sizes: [
        {
            id: 1,
            size: 'MD',
            text: 'Medium',
            class: 'max-w-screen-lg'
        },
        {
            id: 2,
            size: 'LG',
            text: 'Large',
            class: 'max-w-screen-xl'
        },
        {
            id: 3,
            size: 'XL',
            text: 'Extra',
            class: 'w-full'
        }
    ]
})


const selectSize = (size: any)=> {
    utilService.setAlquranSize(size); 
    state.sizeSelected  = size;
}
</script>