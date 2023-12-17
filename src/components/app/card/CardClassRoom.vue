<template>
    <router-link :id="`room_${room.id}`" :to="{ name: `ClassRoomDetailPage`, params: {room_id: room.id}, query: {tab: 'subject'} }" class="w-auto max-w-full p-4 space-y-4 text-slate-800 dark:text-slate-50 hover:ring-sky-500 dark:hover:ring-sky-500 transition flex flex-col justify-between bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 card-shadow-sm min-h-[150px] rounded-lg dark:ring-slate-700">
        <!-- Header -->
        <div class="flex items-start justify-between">
            <div class="flex flex-col items-start justify-between">
                <p class="font-semibold">Kelas &bull; <span class="text-xs font-normal">Sejak {{ formatDateWithMonth(room.createdDate) }}</span></p>
                <p class="text-sm">{{ room.scheduleDay }} {{ room.scheduleTime }}</p>
            </div>
            <div class="text-sm">
                {{ room.members.length }} Anggota
            </div>
        </div>
        <div>
            <p class="text-2xl text-gradien max-w-xs md:max-w-sm font-medium truncate"> {{ room.name }} </p>
            <p class="text-sm mt-2 truncate max-w-[290px] text-slate-700 dark:text-slate-300 font-light">{{
                    room.description
            }}</p>
        </div>
        <!-- Member preview Footer-->
        <div class="flex items-center justify-between">
            <p> {{ room.organization }} </p>
            <div class="flex -space-x-1 overflow-hidden p-1">
                <img class="inline-block object-cover object-top h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-700"
                    :src="mentor.photo_url" :alt="mentor.full_name" />
            </div>
        </div>
    </router-link>
</template>

<script setup lang="ts">
import { Room } from '@/types/room.interface';
import { AppUser } from '@/types/user.interface';
import { formatDateWithMonth } from '@/utils/helperFunction';
import { getDoc } from 'firebase/firestore';
import { onMounted, ref } from 'vue';

const props = defineProps<{ room: Room }>();

const mentor = ref<AppUser>({} as AppUser);

onMounted(() => loadMentor())

function loadMentor() {
    getDoc(props.room.mentor)
        .then((snap) => {
            if (snap.exists())
                mentor.value = snap.data() as AppUser
        }
        )
}

</script>