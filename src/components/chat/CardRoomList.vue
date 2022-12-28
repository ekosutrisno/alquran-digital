<template>
  <div @click="setMember(room.id)" class="with-transition group lg:cursor-pointer flex h-auto w-full bg-white p-4 text-slate-500 transition hover:bg-slate-50">
    <div>
      <svg class="transition-colors group-hover:text-sky-500" width="32" height="32" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="m16.719 19.752l-.64-5.124A3 3 0 0 0 13.101 12h-2.204a3 3 0 0 0-2.976 2.628l-.641 5.124A2 2 0 0 0 9.266 22h5.468a2 2 0 0 0 1.985-2.248Z" />
          <circle cx="12" cy="5" r="3" />
          <circle cx="4" cy="9" r="2" />
          <circle cx="20" cy="9" r="2" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 14h-.306a2 2 0 0 0-1.973 1.671l-.333 2A2 2 0 0 0 3.361 20H7m13-6h.306a2 2 0 0 1 1.973 1.671l.333 2A2 2 0 0 1 20.639 20H17" />
        </g>
      </svg>
    </div>
    <div class="w-full px-4">
      <div class="flex items-center justify-between">
        <div>
            <h1 class="font-semibold text-sky-500">{{ room.name }}</h1>
            <div class="flex mt-2 flex-col justify-between">
                <p class="text-xs text-slate-500">{{ room.members.length }} members</p>
                <p class="text-xs text-slate-500">{{ room.organization }}</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClassRoom } from '@/services';
import { Room } from '@/types/room.interface';

defineProps<{room: Room}>();

const roomService =  useClassRoom();

async function setMember(roomId: Room['id']) {
     await roomService.getRoom(roomId);
}
</script>