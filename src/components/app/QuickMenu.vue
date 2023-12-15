<template>
    <router-link :to="{name: menu.to}" class="w-full group relative overflow-hidden cursor-pointer hover:ring-sky-400 dark:hover:ring-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition card-shadow-sm sm:h-32 bg-white dark:bg-dark-blue ring-1 dark:ring-slate-700 ring-slate-700/10 rounded-lg">
        <div class="p-4 z-20 space-y-2">
            <p class="font-semibold flex flex-col sm:flex-row items-start sm:items-center">
                <span class="bg-white dark:bg-slate-800 rounded-full p-2 ring-1 dark:ring-slate-700 ring-slate-700/10 mr-2 group-hover:ring-sky-500 dark:group-hover:ring-sky-500 delay-75 transition">
                   <component :is="icons[menu.icon]"/>
                </span> 
                <span class="text-slate-800 block font-semibold dark:text-white">{{ menu.title }} <StatusFlag v-if="menu.tag" :flag="menu.tag"/> </span>
            </p>
            <p class="text-sm hidden sm:inline-flex text-slate-700 dark:text-slate-300">{{ menu.description }}</p>
        </div>

        <Svg2 aria-hidden="true" class="absolute h-8 -right-16 sm:right-0 sm:h-auto -top-0.5"/>
    </router-link>
</template>

<script setup lang="ts">
import Svg2 from '../svg/Svg2.vue';
import BookmarkIcon from '../svg/BookmarkIcon.vue';
import HeartIcon from '../svg/HeartIcon.vue';
import BooksIcon from '../svg/BooksIcon.vue';
import ClassRoomIcon from '../svg/ClassRoomIcon.vue';
import type { QuickMenuType } from "@/types/user.interface";
import type { Component } from 'vue';
import StatusFlag from '../StatusFlag.vue';

defineProps<{ menu: QuickMenuType }>();

const icons: Record<string, Component> = {
    'bookmark': BookmarkIcon,
    'heart': HeartIcon,
    'books': BooksIcon,
    'classroom': ClassRoomIcon,
}
</script>