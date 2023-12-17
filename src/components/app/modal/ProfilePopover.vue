<template>
    <svg xmlns="http://www.w3.org/2000/svg" :data-popover-target="member.user_id" class="h-6 w-6 hover:text-sky-500 cursor-pointer transition-colors focus:outline-none" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
    <div data-popover :id="member.user_id" role="tooltip" class="absolute z-20 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xl shadow-sky-800/10 dark:shadow-slate-900/40/50 opacity-0 dark:text-gray-400 dark:bg-slate-800 dark:border-slate-700">
        <div class="p-3">
            <div class="flex items-center justify-between mb-2">
                <a href="#">
                    <img class="w-10 h-10 rounded-full" :src="member.photo_url" alt="Jese Leos">
                </a>
                <div>
                    <button type="button" class="text-white bg-sky-400 hover:bg-sky-500 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-sky-600 dark:hover:bg-sky-400 focus:outline-none">Follow</button>
                </div>
            </div>
            <p class="text-base font-semibold leading-none text-gray-900 dark:text-white">
                <a href="#">{{ member.full_name }}</a>
            </p>
            <p class="mb-3 text-sm font-normal">
                <a href="#" class="hover:underline">{{ member.email }}</a>
            </p>
            <p class="mb-4 text-sm">{{ member.about }}</p>
            <ul class="flex text-sm">
                <li class="mr-2">
                    <a href="#" class="hover:underline">
                        <span class="font-semibold text-gray-900 dark:text-white">{{ 0 }}</span>
                        <span> Following</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="hover:underline">
                        <span class="font-semibold text-gray-900 dark:text-white">{{ 0 }}</span>
                        <span> Followers</span>
                    </a>
                </li>
            </ul>
        </div>
        <div data-popper-arrow></div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/user.interface';
import { initPopovers } from 'flowbite';
import { onMounted } from 'vue';

defineProps<{ member: User }>();
onMounted(() => initPopovers());
</script>