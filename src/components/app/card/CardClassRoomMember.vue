<template>
    <div class="w-full h-full flex flex-col group items-start justify-start p-4 space-y-4 transition bg-white dark:bg-dark-blue border border-slate-700/10 card-shadow-sm rounded dark:border-slate-700/50">
      <!-- Header -->
        <div class="inline-flex space-x-3 items-start w-full">
            <div class="flex cursor-default text-sm rounded-full">
                <span class="sr-only">Member user info</span>
                <div class="h-12 w-12 rounded-full overflow-hidden">
                    <img class="object-cover h-full w-full object-top" :src="member.photo_url" alt="profile-avatar" />
                </div>
            </div>
            <div class="flex w-full items-start justify-between">
                <div class="flex flex-col items-start">
                    <h1 class="text-slate-800 inline-flex items-center space-x-2 dark:text-white text-xl font-semibold">
                        <span>{{ member.full_name }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" :class="[member.is_active ? 'text-green-500': '']" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                    </h1>
                    <p class="text-slate-500 dark:text-slate-400 text-sm"> {{ member.email }} </p>
                </div>
                <div class="dark:text-slate-100 text-slate-400 mt-4 inline-flex space-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 hover:text-sky-500 cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.25">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 hover:text-sky-500 cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.25">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-end w-full">
            <p class="text-xs text-slate-800 dark:text-sky-500">Active 7 minutes ago</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User } from '@/types/user.interface';

defineProps<{member: User}>()

</script>