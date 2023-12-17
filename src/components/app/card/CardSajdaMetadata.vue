<template>
<router-link :id="`sajda_${sajda.number}`" v-motion-slide-bottom v-motion-slide-visible-once-bottom class="cursor-default sm:cursor-pointer" :to="{name: 'AlquranPageDetail', query:{ sn: sajda.surah, an: sajda.ayah, sajda: 'true'}}">
    <div :class="[sajda.recommended ? 'hover:ring-sky-400 dark:hover:ring-sky-400' : 'hover:ring-green-400 dark:hover:ring-green-400']" class="antialiased group transition  bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700 card-shadow-md select-none font-quran group sm:cursor-pointer flex flex-col w-full h-full mx-auto mb-2 rounded-lg p-5 overflow-hidden relative">
        <div :class="[sajda.recommended ? 'bg-sky-200/20 dark:bg-sky-500/5': 'bg-green-200/20 dark:bg-green-500/5']" class="absolute -left-10 -top-5 w-64 h-64 rounded-r-full bg-opacity-25">
        </div>
    <div class="w-full flex items-start py-2 justify-between">
      <div>
        <span :class="[sajda.recommended ? 'group-hover:text-sky-600' : 'group-hover:text-green-500']" class="font-bold transition text-lg text-slate-900 dark:text-slate-100">
          {{ `${sajda.recommended ? 'Recommended' : 'Not Recommended'}`}}
        </span>
      <p class="text-sm text-gray-700 dark:text-slate-300"><span class=""> {{ `${sajda.obligatory ? 'Obligatory' : 'Not Obligatory'}`}}</span></p>
      </div>
      <div class="text-slate-800 dark:text-slate-100 absolute right-2 top-2 w-12 h-12 rounded-full bg-slate-50 dark:bg-sky-300/10 bg-opacity-50 flex items-center justify-center font-semibold">
         {{ sajda.number }}
      </div>
    </div>
    <h1 :class="[sajda.recommended ? 'group-hover:text-sky-500' : 'group-hover:text-green-500']" class="text-right text-3xl text-slate-800 dark:text-slate-100 transition">Surah {{sajda.surah}}  <span class="text-sm">Ayat ({{sajda.ayah}})</span></h1>
    <div class="inline-flex items-center text-xs mt-2">
        <div :class="[ sajda.recommended ? 'text-sky-400' : 'text-green-400' ]" class="inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M6.04 7.772c-2.46.557-3.69.835-3.983 1.776c-.292.94.546 1.921 2.223 3.882l.434.507c.476.557.715.836.822 1.18c.107.345.071.717-.001 1.46l-.066.677c-.253 2.617-.38 3.925.386 4.506c.766.582 1.918.051 4.22-1.009l.597-.274c.654-.302.981-.452 1.328-.452c.347 0 .674.15 1.329.452l.595.274c2.303 1.06 3.455 1.59 4.22 1.01c.767-.582.64-1.89.387-4.507m1.189-3.824c1.677-1.96 2.515-2.941 2.223-3.882c-.293-.941-1.523-1.22-3.983-1.776l-.636-.144c-.699-.158-1.048-.237-1.329-.45c-.28-.213-.46-.536-.82-1.182l-.328-.588C13.58 3.136 12.947 2 12 2c-.947 0-1.58 1.136-2.847 3.408"/></svg>
        </div>
        <span :class="[ sajda.recommended ? 'text-sky-500' : 'text-green-500' ]" class="font-mono  text-xl">({{convertToArab(`${sajda.number}`)}})</span>
    </div>
  </div>
</router-link>
</template>

<script setup lang="ts">
import { SajdaMetadata } from '@/types/alquran.interface';
import { convertToArab } from '@/utils/helperFunction';
defineProps<{ sajda: SajdaMetadata }>()
</script>