<template>
    <router-link :to="menu.to" class="relative overflow-hidden h-auto p-4 cursor-pointer hover:ring-sky-400 dark:hover:ring-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition card-shadow-md bg-white dark:bg-dark-blue ring-1 dark:ring-slate-700/50 ring-slate-700/10 rounded-lg">
        <div class="p-2 grid grid-cols-2">
            <div>
                <span class="text-sm text-slate-700 dark:text-slate-300">Total</span>
                <h1 class="xl:text-4xl text-5xl font-semibold text-gradien"> {{menu.total}} <span class="text-lg">({{convertToArab(menu.total.toString())}})</span> </h1>
            </div>
            <div>
                <span class="text-sm text-slate-700 dark:text-slate-300"> Terindex  </span>
                <h1 class="md:text-xl font-semibold text-gradien">{{menu.title}}</h1>
            </div>
        </div>
        <div class="p-2 text-sm">
            <h1 class="dark:text-slate-300 text-slate-700"> {{menu.description}} </h1>
        </div>
        <Svg1 aria-hidden="true" class="absolute -right-20 bottom-[75px] rotate-90"/>

    </router-link>
</template>

<script setup lang="ts">
import { convertToArab } from '@/utils/helperFunction';
import Svg1 from '../svg/Svg1.vue';
import type { MainMenuType } from "@/types/user.interface";

defineProps<{menu: MainMenuType}>()
</script>
