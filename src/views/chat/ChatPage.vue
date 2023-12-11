<template>
    <div class="flex w-full h-[80vh] bg-white rounded-lg overflow-hidden card-shadow-sm">
        <div class="flex-none hidden md:block flex-shrink-0 w-full max-w-xs divide-y overflow-y-auto light-scroll">
            <CardRoomList v-for="room in rooms" :key="room.id" :room="room"/>
        </div>
        <div class="flex-none hidden sm:block border-x flex-shrink-0 w-full max-w-xs divide-y overflow-y-auto light-scroll">
            <CardMemberList v-for="member in getMembers" :key="member.id" :member="member"/>
        </div>
        <div class="flex-1 overflow-y-auto h-full">
            <ChatRoom v-if="peerUser.user_id"/>
            <div v-else class="flex flex-col items-center justify-center h-full bg-gradient-to-t from-sky-50">
                    <div class="text-center with-transition">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10 text-sky-500 mx-auto mb-5">
                            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                        </svg>
                        <h1 class="text-slate-700 font-semibold text-lg lg:text-2xl">Great, you have a channel already!</h1>
                        <p class="text-sm lg:text-base">Let's start with basics. What would you like to do first?</p>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useChats, useClassRoom } from '@/services';
import { storeToRefs } from 'pinia';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CardRoomList from '@/components/chat/CardRoomList.vue';
import CardMemberList from '@/components/chat/CardMemberList.vue';
import ChatRoom from '@/components/chat/ChatRoom.vue';
const route = useRoute();
const roomService = useClassRoom();
const chatService = useChats();

const { getMembers, rooms } = storeToRefs(roomService);
const { peerUser } = storeToRefs(chatService);
const roomsIds = computed(() => String(localStorage.getItem('_rooms')))

onMounted(() => {
    if (roomsIds.value) {
        roomService.getRooms(JSON.parse(roomsIds.value))
            .then(async () => {
                await roomService.getRoom(String(route.params.roomId));
            });
    }
})
</script>