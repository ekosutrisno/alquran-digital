<template>
<router-link :id="`rukuk_${rukuk.number}`" v-motion-slide-bottom v-motion-slide-visible-once-bottom class="cursor-default sm:cursor-pointer" :to="{name: 'AlquranPageDetail', query:{ sn: rukuk.surah, an: rukuk.ayah}}">

   <div class="antialiased hover:ring-sky-400 group transition dark:hover:ring-sky-400 bg-white dark:bg-dark-blue  ring-1 ring-slate-700/10 dark:ring-slate-700/50 card-shadow-md relative overflow-hidden font-quran group sm:cursor-pointer flex flex-col select-none w-full h-full mx-auto mb-2 rounded-lg p-5">
    <div class="w-full flex items-start py-2 justify-between">
      <div>
        <span class="text-xl text-sky-500">
          Rukuk
        </span>
      </div>
      <div class="text-slate-800 dark:text-slate-100 absolute right-3 -top-2 w-auto h-16 flex items-center justify-center font-medium">
         {{ rukuk.surah }}:{{ rukuk.ayah }} <span class="font-mono">({{convertToArab(`${rukuk.surah}`)}}:{{convertToArab(`${rukuk.ayah}`)}})</span>
      </div>
    </div>
    
    <h1 class="text-right group-hover:text-sky-500 transition text-4xl font-semibold text-slate-800 dark:text-slate-100 font-mono">{{convertToArab(`${rukuk.number}`)}}</h1>
    
    <div class="inline-flex space-x-1 text-xs mt-2 relative z-10">
      <div class="inline-flex text-sky-500">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-6 h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="m7.351 15l-.637 2.323c-.628 2.292-.942 3.438-.523 4.065c.147.22.344.396.573.513c.652.332 1.66-.193 3.675-1.243c.67-.35 1.006-.524 1.362-.562a1.87 1.87 0 0 1 .398 0c.356.038.691.213 1.362.562c2.015 1.05 3.023 1.575 3.675 1.243c.229-.117.426-.293.573-.513c.42-.627.105-1.773-.523-4.065L16.649 15"/><path d="M5.5 6.397A7 7 0 1 0 9.397 2.5"/></g></svg>
      </div>
      <span class="font-mono text-xl text-sky-500">({{ rukuk.number }})</span>
    </div>
    <div class="text-slate-800 dark:text-slate-100 absolute -left-10 -bottom-3 h-28 w-28 rounded-full bg-gray-50 dark:bg-slate-700/30 flex items-center justify-center font-medium"></div>
  </div>
</router-link>  
</template>
<script setup lang="ts">
import { Metadata } from '@/types/alquran.interface';
import { convertToArab } from '@/utils/helperFunction';
defineProps<{rukuk: Metadata}>()
</script>