<template>
<div class="space-y-6">
    <!-- S1 -->
    <section>
        <div class="pb-2">
            <p class="text-xl dark:text-white inline-flex items-center space-x-2">
                <AppearanceIcon class="text-slate-500 w-6 h-6"/>
                <span>Tema Aplikasi</span>
            </p>
            <div class="border-t dark:border-slate-700/50 mt-2 py-2">
                <p class="text-sm text-slate-700 dark:text-slate-300">Choose how Al-Qur'an Digital looks to you. Select a single theme, or sync with your system and automatically switch between day and night themes.</p>
            </div>
        </div>
        <div class="text-sm dark:text-white max-w-md">
            <div @click="toggle()" class="border cursor-pointer dark:hover:bg-sky-800/50 hover:bg-sky-50/75 transition border-sky-500 dark:border-slate-700/50 rounded-lg p-3 flex flex-col">
                <div class="inline-flex justify-between">
                    <div class="inline-flex dark:hidden items-center space-x-1.5 text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p class="font-semibold">Day theme</p>
                    </div>
                    <div class="hidden dark:inline-flex items-center space-x-1.5 text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        <p class="font-semibold">Night theme</p>
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
                <SizeIcon class="text-slate-500"/>
                <span>Lebar Tampilan Ayat</span>
            </p>
            <div class="border-t dark:border-slate-700/50 mt-2 py-2">
                <p class="text-sm text-slate-700 dark:text-slate-300">This is the provider that is used for you to log in to the application and also what accounts are connected.</p>
            </div>
        </div>

         <div class="grid sm:grid-cols-3 gap-2">
            <ul v-for="size in state.sizes" :key="size.id">
                <button type="button" @click="selectSize(size)" :class="[size.id == state.sizeSelected.id ? 'bg-sky-500 ring-0 text-white' : '']" class="py-2 rounded-lg ring-1 ring-slate-700/20 dark:ring-slate-700 dark:hover:ring-sky-500 hover:ring-sky-500 px-3 inline-flex items-center justify-center space-x-1 w-full relative dark:text-white transition">
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
import AppearanceIcon from '../svg/AppearanceIcon.vue';
import SizeIcon from '../svg/SizeIcon.vue';
import { QuranLayoutSize } from '@/types/user.interface';

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

const selectSize = (size: QuranLayoutSize) => {
    utilService.setAlquranSize(size);
    state.sizeSelected = size;
}
</script>