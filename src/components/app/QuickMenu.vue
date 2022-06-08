<template>
    <router-link :to="menu.to" class="w-full group relative overflow-hidden cursor-pointer hover:ring-sky-400 dark:hover:ring-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition card-shadow-sm h-32 bg-white dark:bg-dark-blue ring-1 dark:ring-slate-700/50 ring-slate-700/10 rounded">
        <div class="p-4 z-20 space-y-2">
            <p class="font-semibold inline-flex items-center">
                <span class="bg-white dark:bg-slate-800 rounded-full p-2 ring-1 dark:ring-slate-700/50 ring-slate-700/10 mr-2 group-hover:ring-sky-500 dark:group-hover:ring-sky-500 delay-75 transition">
                    <svg v-if="menu.id == '1'" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <svg v-else-if="menu.id == '2'" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <svg v-else-if="menu.id == '3'" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span> 
                <span class="text-slate-800 font-bold dark:text-white">{{ menu.title }}</span>
            </p>
            <p class="text-sm text-slate-700 dark:text-slate-300">{{ menu.description }}</p>
        </div>

        <Svg2 aria-hidden="true" class="absolute z-10 right-0 -top-0.5"/>
    </router-link>
</template>

<script setup lang="ts">
import Svg2 from '../svg/Svg2.vue';

export interface QuickMenuType{
    id?: string;
    title?: string;
    description?: string;
    to: string
}

defineProps<{menu: QuickMenuType}>()
</script>