<template>
  <div @click="getChats(member.id)" v-if="member.id !== me" class="with-transition group flex h-auto w-full lg:cursor-pointer bg-white px-4 py-2 text-slate-500 transition hover:bg-slate-50">
    <div>
      <div class="h-12 w-12 overflow-hidden rounded-full bg-slate-100">
        <img class="h-full w-full object-cover object-top" :src=" member.avatar ? member.avatar : 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'" :alt="member.name"/>
      </div>
    </div>
    <div class="w-full pl-4">
      <div class="flex items-center justify-between">
        <h1 class="font-semibold">{{ member.name }}</h1>
        <p v-if="lastChat.timestamps" class="text-xs text-slate-400">{{ formatChatTime(lastChat.timestamps) }}</p>
      </div>
      <div class="mt-1 flex flex-col justify-between sm:flex-row sm:items-center">
        <p class="text-xs text-slate-500 truncate max-w-[200px]"> {{ lastChat.content }} </p>
        <svg v-if="lastChat.timestamps" class="h-4 w-4 text-green-500" viewBox="0 0 24 24"><path fill="currentColor" d="m2.394 13.742l4.743 3.62l7.616-8.704l-1.506-1.316l-6.384 7.296l-3.257-2.486zm19.359-5.084l-1.506-1.316l-6.369 7.279l-.753-.602l-1.25 1.562l2.247 1.798z" /></svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChats } from '@/services';
import { onMounted, ref } from 'vue';
import { Chat } from '@/types/chat.interface';
import { get, limitToLast, onValue, orderByKey, query, ref as reference } from 'firebase/database';
import { database } from '@/config/firebase.config';
import { formatChatTime } from '@/utils/helperFunction';
const props = defineProps<{member: {name: string,id: string,color: string,avatar: string}}>()

const me = ref<string>(localStorage.getItem("_uid") as string);
const lastChat = ref<Chat>({} as Chat);
const { getChats, onNewMesage } = useChats();

onMounted(async () => await getLastChat(me.value, props.member.id));

async function getLastChat(meId: string, peerId: string) {
  const temporary = ref<Chat[]>([] as Chat[]);
  const chatKey = ref<string>()

  const toMe = `${peerId}@${meId}`; // ID: peer:me
  const fromMe = `${meId}@${peerId}`; // ID: me:peer

  let checkingReference = reference(database, `personal_chats/${toMe}`);
  const checkIfExist = await get(checkingReference);

  chatKey.value  = checkIfExist.exists() ? toMe : fromMe;

  const chatQuery = query(reference(database, `personal_chats/${chatKey.value}`), orderByKey(), limitToLast(1));
  onValue(chatQuery, async (resultQuery) => {
    resultQuery.forEach(snap => {
      if (snap.exists()) {
        snap.forEach(data => { temporary.value.push(data.val() as Chat) })
      }
    })
    lastChat.value = temporary.value[temporary.value.length - 1] || { content: "Let's start chatting." } as Chat;
    await onNewMesage(lastChat.value);
  })
}
</script>