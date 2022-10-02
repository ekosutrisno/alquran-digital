<template>
    <div>
        <button class="bg-sky-500 text-white py-2 px-3 rounded" type="button" @click="sendChat"> Send Chat </button>
    </div>
</template>

<script setup lang="ts">
import { useChats } from '@/services';
import { onMounted } from 'vue';
const { send, getChats } = useChats();

const sendChat = ()=>{
    const chat = {
        content: "Uji Coba Test Chat",
        from: "Qu5fQK09a5R5YWIcG2yFiuKEpJ03",
        to: "nwZ2U6E2UOTMQ2e0ES8XXaC6F5F2"
    }

    send(chat);
}

onMounted(()=>{
    getChats('Qu5fQK09a5R5YWIcG2yFiuKEpJ03@nwZ2U6E2UOTMQ2e0ES8XXaC6F5F2')
})

</script>
