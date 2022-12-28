<template>
   <div class="flex p-4 sm:items-center justify-between py-3 border-b-2 border-gray-200">
      <div class="relative flex items-center space-x-4">
         <div class="rounded-full border">
            <img :src="peer ? peer.photo_url : ''" :alt="peer.full_name" class="w-10 sm:w-16 h-10 sm:h-16 object-cover object-top rounded-full">
         </div>
         <div class="flex flex-col leading-tight">
            <div class="text-lg font-semibold mt-1 flex items-center">
               <span class="text-gray-700 mr-3">{{ peer.full_name }}</span>
            </div>
            <span v-if="peerUserStatus.state == 'online'" class="text-gray-600 text-sm">Online</span>
            <span v-else class="text-gray-600 text-sm">Last seen {{ formatAtTime(peerUserStatus.last_changed) }}</span>
         </div>
      </div>
      <div class="flex items-center space-x-2">
         <button type="button" class="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
         </button>
         <button type="button" class="hidden sm:inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
         </button>
         <button type="button" class="hidden sm:inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
         </button>
      </div>
   </div>
</template>

<script setup lang="ts">
import { useChats } from '@/services';
import { User } from '@/types/user.interface';
import { formatAtTime} from '@/utils/helperFunction';
import { storeToRefs } from 'pinia';

defineProps<{peer: User}>();

const chatService = useChats();
const { peerUserStatus } = storeToRefs(chatService);
</script>