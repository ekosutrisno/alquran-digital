<template>
    <router-link :to="menu.to" class="relative overflow-hidden h-auto p-4 cursor-pointer hover:ring-sky-400 dark:hover:ring-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition card-shadow-md bg-white dark:bg-dark-blue ring-1 dark:ring-slate-700/50 ring-slate-700/10 rounded">
        <div class="p-2 grid grid-cols-2">
            <div>
                <span class="text-sm text-slate-500 dark:text-slate-300">Total</span>
                <h1 class="xl:text-4xl text-5xl font-semibold text-sky-500 dark:text-sky-400"> {{menu.total}} </h1>
            </div>
            <div>
                <span class="text-sm text-slate-500 dark:text-slate-300"> Terindex  </span>
                <h1 class="md:text-xl font-semibold dark:text-white">{{menu.title}}</h1>
            </div>
        </div>
        <div class="p-2">
            <p class="text-white rounded bg-sky-500 w-min px-2 mb-2 text-sm">Description</p>
            <h1 class="dark:text-slate-300 text-slate-500"> {{menu.description}} </h1>
        </div>
        <Svg1 aria-hidden="true" class="absolute z-10 -right-20 bottom-[75px] rotate-90"/>

    </router-link>
</template>

<script setup lang="ts">
import Svg1 from '../svg/Svg1.vue';

export interface MainMenuType {
    id: string;
    total: number;
    description: string;
    title: string;
    to: string;
}

defineProps<{menu: MainMenuType}>()
</script>
