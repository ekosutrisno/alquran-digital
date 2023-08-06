<template>
<div>
    <div class="pb-2">
        <p class="text-xl inline-flex items-center space-x-2">
            <KeyIcon class="text-slate-500"/>
            <span>Privat Akun</span>
        </p>
        <div class="border-t dark:border-slate-700/50 mt-2 py-2">
            <p class="text-sm text-slate-700 dark:text-slate-300">This action will only deactivate your account temporarily and you can reactivate it later. This will prevent some group friends from being able to chat with you and see your status.</p>
        </div>
    </div>
    <div class="flex items-center space-x-4 text-sm dark:text-white">
        <button type="button" @click="currentUser?.is_active ? authService.deactivatedAccount() : authService.activatedAccount()" class="mt-4 disabled:bg-opacity-50 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
            <span class="mr-2">{{ currentUser?.is_active ? 'Aktifkan' : 'Nonaktifkan' }}</span>
        </button>
    </div>
</div>
<div>
    <div class="pb-2">
        <p class="text-xl text-red-500 inline-flex items-center space-x-2">
            <ExclamationIcon class="text-red-600"/>
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
import KeyIcon from '../svg/KeyIcon.vue';
import ExclamationIcon from '../svg/ExclamationIcon.vue';

const authService = useAuth();

const roomService = useClassRoom();
const { asMentorInRoom } = storeToRefs(roomService)

const userService = useUser();
const { currentUser } = storeToRefs(userService);

onMounted(()=> roomService.haveClassRoom());

</script>