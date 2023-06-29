<template>
<router-link :id="`sajda_${sajda.number}`" v-motion-slide-bottom v-motion-slide-visible-once-bottom class="cursor-default sm:cursor-pointer" :to="{name: 'AlquranPageDetail', query:{ sn: sajda.surah, an: sajda.ayah, sajda: 'true'}}">
    
    <div :class="[sajda.recommended ? 'hover:ring-sky-400 dark:hover:ring-sky-400' : 'hover:ring-green-400 dark:hover:ring-green-400']" class="antialiased group transition  bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700/50 card-shadow-md select-none font-quran group sm:cursor-pointer flex flex-col w-full h-full mx-auto mb-2 rounded-md p-5 overflow-hidden relative">
        <div :class="[sajda.recommended ? 'bg-sky-200 dark:bg-sky-500/5': 'bg-green-200 dark:bg-green-500/5']" class="absolute -left-10 -top-5 w-64 h-64 rounded-r-full bg-opacity-25">
        </div>
    <div class="w-full flex items-start py-2 justify-between">
      <div>
        <span :class="[sajda.recommended ? 'group-hover:text-sky-500' : 'group-hover:text-green-500']" class="font-bold transition text-lg text-slate-800 dark:text-slate-100">
          {{ `${sajda.recommended ? 'Recommended' : 'Not Recommended'}`}}
        </span>
      <p class="text-sm text-gray-600 dark:text-slate-300"><span class=""> {{ `${sajda.obligatory ? 'Obligatory' : 'Not Obligatory'}`}}</span></p>
      </div>
      <div class="text-slate-800 dark:text-slate-100 absolute -right-2 -top-2 w-12 h-12 rounded-full bg-slate-50 dark:bg-sky-300/10 bg-opacity-50 flex items-center justify-center font-semibold">
         {{ sajda.number }}
      </div>
    </div>
    <h1 :class="[sajda.recommended ? 'group-hover:text-sky-500' : 'group-hover:text-green-500']" class="text-right text-3xl text-slate-800 dark:text-slate-100 transition">Surah {{sajda.surah}}  <span class="text-sm">Ayat ({{sajda.ayah}})</span></h1>
    <div class="inline-flex text-xs mt-2">
        <div :class="[ sajda.recommended ? 'text-sky-400' : 'text-green-400' ]" class="inline-flex items-center space-x-1 font-semibold uppercase">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        </div>
      <span :class="[ sajda.recommended ? 'text-sky-500' : 'text-green-500' ]" class="font-mono font-semibold text-xl">({{convertToArab(`${sajda.number}`)}})</span>

    </div>
  </div>
</router-link>
</template>

<script setup lang="ts">
import { SajdaMetadata } from '@/types/alquran.interface';
import { convertToArab } from '@/utils/helperFunction';
defineProps<{sajda: SajdaMetadata}>()
</script>