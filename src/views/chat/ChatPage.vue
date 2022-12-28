<template>
    <div class="flex w-full h-[80vh] bg-white rounded-lg overflow-hidden card-shadow-sm">
        <div class="flex-none hidden md:block flex-shrink-0 w-full max-w-xs divide-y overflow-y-auto light-scroll">
            <CardRoomList v-for="room in rooms" :key="room.id" :room="room"/>
        </div>
        <div class="flex-none hidden sm:block  border-x flex-shrink-0 w-full max-w-xs divide-y overflow-y-auto light-scroll">
            <CardMemberList v-for="member in getMembers" :key="member.id" :member="member"/>
        </div>
        <div class="flex-1 overflow-y-auto">
            <ChatRoom v-if="peerUser.user_id"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useChats, useClassRoom } from '@/services';
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import CardRoomList from '@/components/chat/CardRoomList.vue';
import CardMemberList from '@/components/chat/CardMemberList.vue';
import ChatRoom from '@/components/chat/ChatRoom.vue';
const route = useRoute();
const roomService = useClassRoom();
const chatService = useChats();

const { getMembers, rooms } = storeToRefs(roomService);
const { peerUser } = storeToRefs(chatService);

const state = reactive({
    roomsIds: computed(() =>localStorage.getItem('_rooms') as string)
})

onMounted(() => {
    if (state.roomsIds) {
        roomService.getRooms(JSON.parse(state.roomsIds))
            .then( async () => {
                await roomService.getRoom(route.params.roomId as string);
            });
    }
})
</script>