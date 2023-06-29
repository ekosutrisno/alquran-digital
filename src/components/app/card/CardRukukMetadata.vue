<template>
<router-link :id="`rukuk_${rukuk.number}`" v-motion-slide-bottom v-motion-slide-visible-once-bottom class="cursor-default sm:cursor-pointer" :to="{name: 'AlquranPageDetail', query:{ sn: rukuk.surah, an: rukuk.ayah}}">

   <div class="antialiased hover:ring-sky-400 group transition dark:hover:ring-sky-400 bg-white dark:bg-dark-blue  ring-1 ring-slate-700/10 dark:ring-slate-700/50 card-shadow-md relative overflow-hidden font-quran group sm:cursor-pointer flex flex-col select-none w-full h-full mx-auto mb-2 rounded-md p-5">
    <div class="w-full flex items-start py-2 justify-between">
      <div>
        <span class="font-bold text-xl text-sky-500">
          Rukuk
        </span></div>
      <div class="text-slate-800 dark:text-slate-100 absolute -right-3 -top-3 w-16 h-16 rounded-full bg-gray-50 dark:bg-slate-700/30 flex items-center justify-center font-semibold">
         {{ rukuk.number }}
      </div>
    </div>
    
    <h1 class="text-right group-hover:text-sky-500 transition text-4xl font-semibold text-slate-800 dark:text-slate-100"><span class="text-xs text-slate-500 dark:text-slate-300 align-super font-light">Surah ke</span> {{rukuk.surah}} <span class="text-xs text-slate-500 dark:text-slate-300 font-light">Ayah</span>  <span class="text-sm">({{rukuk.ayah}})</span></h1>
    
    <div class="inline-flex space-x-1 text-xs mt-2">
      <div class="inline-flex text-sky-500 items-center space-x-1 font-semibold uppercase">
        <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </div>
      <span class="font-mono font-semibold text-xl text-sky-500">({{convertToArab(`${rukuk.number}`)}})</span>

    </div>
  </div>
</router-link>  
</template>
<script setup lang="ts">
import { Metadata } from '@/types/alquran.interface';
import { convertToArab } from '@/utils/helperFunction';
defineProps<{rukuk: Metadata}>()
</script>