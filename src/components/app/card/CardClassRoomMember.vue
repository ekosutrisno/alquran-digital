<template>
    <div :id="`room_member_${member.user_id}`" class="w-full h-full flex flex-col group items-start justify-start p-4 space-y-4 transition bg-white dark:bg-dark-blue border border-slate-700/10 card-shadow-sm rounded dark:border-slate-700/50">
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
                    <h1 class="text-slate-800 inline-flex items-center dark:text-white text-xl font-semibold">
                        <span>{{ member.full_name }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" v-if="member.is_active" aria-hidden="true" class="h-4 w-4 text-sky-400"  viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M9.592 3.2a5.574 5.574 0 0 1-.495.399c-.298.2-.633.338-.985.408c-.153.03-.313.043-.632.068c-.801.064-1.202.096-1.536.214a2.713 2.713 0 0 0-1.655 1.655c-.118.334-.15.735-.214 1.536a5.707 5.707 0 0 1-.068.632c-.07.352-.208.687-.408.985c-.087.13-.191.252-.399.495c-.521.612-.782.918-.935 1.238c-.353.74-.353 1.6 0 2.34c.153.32.414.626.935 1.238c.208.243.312.365.399.495c.2.298.338.633.408.985c.03.153.043.313.068.632c.064.801.096 1.202.214 1.536a2.713 2.713 0 0 0 1.655 1.655c.334.118.735.15 1.536.214c.319.025.479.038.632.068c.352.07.687.209.985.408c.13.087.252.191.495.399c.612.521.918.782 1.238.935c.74.353 1.6.353 2.34 0c.32-.153.626-.414 1.238-.935c.243-.208.365-.312.495-.399c.298-.2.633-.338.985-.408c.153-.03.313-.043.632-.068c.801-.064 1.202-.096 1.536-.214a2.713 2.713 0 0 0 1.655-1.655c.118-.334.15-.735.214-1.536c.025-.319.038-.479.068-.632c.07-.352.209-.687.408-.985c.087-.13.191-.252.399-.495c.521-.612.782-.918.935-1.238c.353-.74.353-1.6 0-2.34c-.153-.32-.414-.626-.935-1.238a5.574 5.574 0 0 1-.399-.495a2.713 2.713 0 0 1-.408-.985a5.72 5.72 0 0 1-.068-.632c-.064-.801-.096-1.202-.214-1.536a2.713 2.713 0 0 0-1.655-1.655c-.334-.118-.735-.15-1.536-.214a5.707 5.707 0 0 1-.632-.068a2.713 2.713 0 0 1-.985-.408a5.73 5.73 0 0 1-.495-.399c-.612-.521-.918-.782-1.238-.935a2.713 2.713 0 0 0-2.34 0c-.32.153-.626.414-1.238.935Zm6.781 6.663a.814.814 0 0 0-1.15-1.15l-4.85 4.85l-1.596-1.595a.814.814 0 0 0-1.15 1.15l2.17 2.17a.814.814 0 0 0 1.15 0l5.427-5.425Z" clip-rule="evenodd"/></svg>
                    </h1>
                    <p class="text-slate-500 dark:text-slate-400 text-sm"> {{ member.email }} </p>
                </div>
                <div v-if="member.user_id !== me" class="dark:text-slate-400 text-slate-400 mt-2 inline-flex space-x-2">
                    <svg @click="$router.push({name: 'ClassRoomChatPage', params:{ roomId }})" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-sky-500 cursor-pointer transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.25">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <ProfilePopover :member="member"/>
                </div>
                <div v-else>
                    <span class="text-xs font-semibold py-px px-2 rounded-full bg-green-200 text-green-600">You</span>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-end w-full">
            <p class="text-xs font-semibold text-slate-400">{{ getPresence(member.user_id).value.state == 'online' ? 'Online' : `Active ${formatDateFromNow(getPresence(member.user_id).value.last_changed)}` }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/user.interface';
import { formatDateFromNow } from '@/utils/helperFunction';
import { getPresence } from '@/utils/firebaseHelperFunction';
import { onMounted, ref } from 'vue';
import ProfilePopover from '../modal/ProfilePopover.vue';
import { initTooltips } from 'flowbite';


defineProps<{ member: User, roomId: string }>();

const me = ref<string | null>(localStorage.getItem('_uid'));
const open = ref(false);

onMounted(() => initTooltips());

</script>