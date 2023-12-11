<template>
 <div :id="`chat-${chat.timestamps}`" class="chat-message w-full">
    <div class="flex items-end" :class="[me ? 'justify-end' : '']">
        <div class="flex flex-col space-y-2 text-sm max-w-xs mx-2" :class="[me ? 'order-1 items-end' : 'order-2 items-start']">
            <div>
                <p class="px-4 pt-2 pb-1 rounded-lg inline-block" :class="[me ? 'bg-sky-500 text-white rounded-br-none' : 'bg-gray-300/70 text-gray-800 rounded-bl-none']">
                    {{ chat.content }}
                    <span class="block text-right text-[10px]" :class="[me? 'text-white' : 'text-gray-600']">{{formatChatTime(chat.timestamps)}}</span>
                </p>
                
            </div>
        </div>
        <img v-if="chat.isGroup" :src="me ? getPhotoUrl :  peer ? peer.photo_url : ''" :alt="`peer-${peer.username}`" class="w-6 h-6 object-cover object-top rounded-full order-1">
    </div>
</div>
</template>

<script setup lang="ts">
import { useUser } from '@/services';
import { Chat } from '@/types/chat.interface';
import { User } from '@/types/user.interface';
import { decrypt } from '@/utils/cryp';
import { formatChatTime } from '@/utils/helperFunction';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const props = defineProps<{ chat: Chat, peer: User }>();

const { getPhotoUrl } = storeToRefs(useUser());

const me = computed(() => decrypt(String(localStorage.getItem("_uid"))) == props.chat.from)
</script>