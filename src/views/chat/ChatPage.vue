<template>
    <div>
        UNDER CONSTRUCTIONS

        <Chat/>

        <pre>
            {{ chats }}
        </pre>
    </div>
</template>

<script setup lang="ts">
import Chat from '@/components/chat/Chat.vue';
import { useChats } from '@/services';
import { storeToRefs } from 'pinia';

const chatService = useChats();

const { chats } = storeToRefs(chatService);

</script>
