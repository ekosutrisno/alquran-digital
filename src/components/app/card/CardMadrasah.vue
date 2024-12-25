<template>
    <router-link :id="`room_${madrasah.code}`" :to="{ name: `ClassRoomPage`, params: {madrasah_id: madrasah.code} }" class="w-auto max-w-full p-4 space-y-4 text-slate-800 dark:text-slate-50 hover:ring-sky-500 dark:hover:ring-sky-500 transition flex flex-col justify-between bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 card-shadow-sm min-h-[150px] rounded-lg dark:ring-slate-700">
        <!-- Header -->
        <div class="flex items-start justify-between">
            <div class="flex flex-col items-start justify-between">
                <p class="font-semibold">Madrasah &bull; <span class="text-xs font-normal">Sejak {{ formatDateWithMonth(madrasah.createdDate) }}</span></p>
                <p class="text-sm">{{ madrasah.email }}</p>
            </div>
            <div class="text-sm">
                <span :class="[madrasah.public ? 'bg-green-50 dark:bg-transparent text-green-500 dark:text-green-400 border-green-500 dark:border-green-400' : 'bg-blue-50 dark:bg-transparent text-blue-500 dark:text-blue-400 border-blue-500 dark:border-blue-400']" class="font-bold uppercase text-[9px] py-0.5 px-2 rounded-full border" >
                    {{ madrasah.public ? 'Publik': 'Privat' }}
                </span>
            </div>
        </div>
        <div>
            <p class="text-2xl text-gradien max-w-xs md:max-w-sm font-medium truncate"> {{ madrasah.name }} </p>
            <p class="text-sm mt-2 truncate max-w-[290px] text-slate-700 dark:text-slate-300 font-light">{{
                    madrasah.description
            }}</p>
        </div>
        <!-- Member preview Footer-->
        <div class="flex items-center justify-between">
            <p> {{ `${madrasah.district}, ${madrasah.province}` }} </p>
            <div class="flex -space-x-1 overflow-hidden p-1">
                <img class="inline-block object-cover object-top h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-700" :src="madrasah.logo" :alt="madrasah.name" />
            </div>
        </div>
    </router-link>
</template>

<script setup lang="ts">
import { Madrasah } from '@/types/madrasah.interface';
import { formatDateWithMonth } from '@/utils/helperFunction';

defineProps<{ madrasah: Madrasah }>();
</script>