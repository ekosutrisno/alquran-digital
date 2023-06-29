<template>
<router-link :id="`page_${page.page}`" v-motion-slide-bottom v-motion-slide-visible-once-bottom class="cursor-default sm:cursor-pointer" :to="{name: 'AlquranPageDetail', query:{ sn: page.surat, an: page.ayat}}">

   <div class="hover:ring-sky-400 antialiased group transition dark:hover:ring-sky-400 bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700/50 card-shadow-md select-none font-quran group sm:cursor-pointer flex flex-col w-full h-full mx-auto mb-2 rounded-md p-5 overflow-hidden relative">
    <div class="w-full flex items-start py-2 justify-between">
      <div class="text-gray-800  text-xl absolute -right-3 -top-3 w-28 h-16 rounded-l-xl bg-gradient-to-bl from-sky-500/20 to-sky-500/5 dark:from-sky-800/10 dark:to-sky-700/10 flex items-center justify-center font-semibold">
        <span class="font-semibold text-sky-500">
          Page {{ page.page }}
        </span> 
      </div>
    </div>
      <div class="text-gray-800 absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-sky-800/5 flex items-center justify-center font-semibold">
      </div>
    <h1 class="text-right text-5xl mt-4 font-semibold text-slate-800 dark:text-slate-100 group-hover:text-sky-500 transition"><span class="text-xs text-slate-500 dark:text-slate-300 align-super font-light">Surah ke</span> {{page.surat}} <span class="font-mono font-semibold text-sm">({{convertToArab(`${page.surat}`)}})</span>  <span class="text-sm"><span class="text-xs text-slate-500 dark:text-slate-300 font-light">Ayah</span> ({{page.ayat}})</span></h1>
    <div class="inline-flex items-center space-x-1 text-xs mt-4">
        <div class="inline-flex text-sky-500 text-lg items-center space-x-1 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        </div>
        <span class="font-mono font-semibold text-xl text-sky-500">({{convertToArab(`${page.page}`)}})</span>
    </div>
  </div>
</router-link>  
</template>
<script setup lang="ts">
import { PageMetadata } from '@/types/alquran.interface';
import { convertToArab } from '@/utils/helperFunction';
defineProps<{page: PageMetadata}>()
</script>