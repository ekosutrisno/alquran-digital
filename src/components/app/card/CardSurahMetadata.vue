<template>
<router-link :id="`surah_${surah.id}`" v-motion-slide-bottom v-motion-slide-visible-once-bottom class="cursor-default sm:cursor-pointer" :to="{ name: 'AlquranPageDetail', query:{ surah_number: surah.id, is_surah: 'true'}}">
   <div class="hover:ring-sky-400 group transition dark:hover:ring-sky-400 bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700/50 card-shadow-md select-none font-quran group shadow-sm sm:cursor-pointer flex flex-col w-full h-full mx-auto mb-2 rounded-lg p-5 overflow-hidden">

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
      <div :class="[ surah.revelation_type == 'Meccan' ? 'text-sky-600 dark:text-sky-400' : 'text-slate-700 dark:text-slate-300' ]" class="inline-flex items-end space-x-1 font-semibold uppercase">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-6 h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M12.5 7.041A3 3 0 1 0 14.959 9.5"/><path d="M5 15.216c-.647-1.654-1-3.415-1-5.073C4 5.646 7.582 2 12 2s8 3.646 8 8.143c0 4.462-2.553 9.67-6.537 11.531a3.45 3.45 0 0 1-2.926 0C9.265 21.08 8.138 20.144 7.194 19"/></g></svg>
       <div>
          {{surah.surat_golongan}} &bull; <span class="font-quran">{{surah.revelation_type == 'Meccan' ? `\u0645\u0643\u0629` : `\u0645\u062F\u064A\u0646\u0629`}}</span>
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