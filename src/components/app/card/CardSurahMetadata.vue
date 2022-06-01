<template>
<router-link v-motion-slide-bottom v-motion-slide-visible-once-bottom :initial="{ opacity: 0, y: 100 }" class="cursor-default sm:cursor-pointer" :to="{ path: '/app/dashboard/alquran', query:{ surah_number: surah.id}}">
   <div class="hover:ring-sky-400 group transition dark:hover:ring-sky-400 bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700/50 card-shadow-md select-none font-quran group shadow-sm sm:cursor-pointer flex flex-col w-full h-full mx-auto mb-2 rounded p-5 overflow-hidden">

    <div class="w-full flex items-start py-2 justify-between relative">
      <div>
        <span class="font-bold text-lg text-slate-800 dark:text-white group-hover:text-sky-500">
          {{ surah.surat_name }}
        </span>
      <p class="text-sm text-gray-700 dark:text-slate-200"><span> {{ surah.surat_terjemahan}}</span></p>
      <p class="text-xs text-gray-600 dark:text-slate-100"><span> {{ surah.count_ayat}} ayat</span></p>
      </div>
      <div class="text-slate-900 dark:text-slate-50 absolute -right-10 -top-8 w-24 h-24 rounded-full bg-slate-50 dark:bg-slate-700/10 flex items-center justify-center font-semibold">
         {{ surah.id }}
      </div>
      <div class="absolute -left-10 top-0 w-56 h-56 rounded-full bg-sky-200/20 dark:bg-sky-800/5">
      </div>
    </div>
    <h1 class="text-right text-3xl font-semibold text-slate-800 dark:text-white group-hover:text-sky-500 transition"> <span class="text-sm">( {{ surah.surat_text_full}})</span> {{surah.surat_text}} </h1>
    <div class="inline-flex space-x-2 text-xs mt-2">
      <div :class="[ surah.revelation_type == 'Meccan' ? 'text-sky-500 dark:text-sky-400' : 'text-slate-700 dark:text-slate-300' ]" class="inline-flex items-center space-x-1 font-semibold uppercase">
        <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
        <div>
          {{surah.surat_golongan}} 
        </div> 
    </div>
    </div>
  </div>
</router-link>
</template>
<script setup lang="ts">
import { SurahData } from '@/types/alquran.interface';


defineProps<{surah: SurahData}>();
</script>