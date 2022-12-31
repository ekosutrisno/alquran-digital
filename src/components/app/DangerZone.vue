<template>
<div>
    <div class="pb-2">
        <p class="text-xl inline-flex items-center space-x-2">
            <svg class="w-6 h-6" aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M21.99 12.34c.01-.11.01-.23.01-.34c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5.17 3.93 9.43 8.96 9.95a9.343 9.343 0 0 1-2.32-2.68A8.01 8.01 0 0 1 4 12c0-1.85.63-3.55 1.69-4.9l5.66 5.66c.56-.4 1.17-.73 1.82-1L7.1 5.69A7.902 7.902 0 0 1 12 4c4.24 0 7.7 3.29 7.98 7.45c.71.22 1.39.52 2.01.89zM17 13c-3.18 0-5.9 1.87-7 4.5c1.1 2.63 3.82 4.5 7 4.5s5.9-1.87 7-4.5c-1.1-2.63-3.82-4.5-7-4.5zm0 7a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5zm1.5-2.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"/></svg>
            <span> {{ currentUser?.is_active ? 'Disable Account' : 'Enable Account' }}</span>
        </p>
        <div class="border-t dark:border-slate-700/50 mt-2 py-2">
            <p class="text-sm text-slate-700 dark:text-slate-300">This action will only deactivate your account temporarily and you can reactivate it later. This will prevent some group friends from being able to chat with you and see your status.</p>
        </div>
    </div>
    <div class="flex items-center space-x-4 text-sm dark:text-white">
        <button type="button" @click="currentUser?.is_active ? authService.deactivatedAccount() : authService.activatedAccount()" class="mt-4 disabled:bg-opacity-50 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
            <span class="mr-2">{{ currentUser?.is_active ? 'Disable' : 'Enable' }}</span>
        </button>
    </div>
</div>
<div>
    <div class="pb-2">
        <p class="text-xl text-red-500 inline-flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Danger zone</span>
        </p>
        <div class="border-t dark:border-slate-700/50 mt-2 py-2">
            <p class="text-sm text-slate-700 dark:text-slate-300">This action cannot be undone, please think again before clicking the button below.</p>
        </div>
        <div v-if="asMentorInRoom.length" class="text-sm mt-3">
            <p>You are still registered as an admin in the following Class Room:</p>
            <ul class="list-disc pl-4">
                <li v-for="room in asMentorInRoom" :key="room.id">{{room.name}}</li>
            </ul>
        </div>
    </div>
    <div class="flex items-center space-x-4 text-sm dark:text-white">
        <button type="button" :disabled="asMentorInRoom.length > 0" @click="authService.deleteAccount()" class="mt-4 disabled:bg-red-400 disabled:cursor-not-allowed inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            <span class="mr-2">Delete account</span>
        </button>
    </div>
</div>
</template>

<script setup lang="ts">
import { useAuth, useUser, useClassRoom } from '@/services';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const authService = useAuth();

const roomService = useClassRoom();
const { asMentorInRoom } = storeToRefs(roomService)

const userService = useUser();
const { currentUser } = storeToRefs(userService);

onMounted(()=> roomService.haveClassRoom());

</script>