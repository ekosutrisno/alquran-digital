<template>
<router-link :id="`juz_${juz.number}`" v-motion-slide-bottom v-motion-slide-visible-once-bottom class="cursor-default sm:cursor-pointer" :to="{name: 'AlquranPageDetail', query:{ sn: juz.surah, an: juz.ayah}}">
   <div class="antialiased hover:ring-sky-400 group transition dark:hover:ring-sky-400 bg-white dark:bg-dark-blue  ring-1 ring-slate-700/10 dark:ring-slate-700 card-shadow-md relative overflow-hidden font-quran group sm:cursor-pointer flex flex-col select-none w-full h-full mx-auto mb-2 rounded-lg p-5">
    <div class="w-full flex items-start py-2 justify-between z-10">
      <div>
        <span class="text-xl text-sky-500">
          Juz
        </span>
      </div>
      <div class="text-slate-800 dark:text-slate-100 absolute right-3 top-3 flex items-center justify-center">
        {{juz.surah}}:{{juz.ayah}} <span class="font-mono">({{convertToArab(`${juz.surah}`)}}:{{convertToArab(`${juz.ayah}`)}})</span>
      </div>
    </div>
    
    <h1 class="text-right font-mono group-hover:text-sky-500 transition text-4xl font-semibold text-slate-800 dark:text-slate-100">{{convertToArab(`${juz.number}`)}}</h1>
    <div class="inline-flex space-x-1 text-xs mt-2 relative">
      <div class="inline-flex text-sky-500 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-6 h-6" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="m20.082 3.018l.026.75l-.026-.75Zm-3.582.47l-.215-.719l.215.719Zm-2.826 1.315l-.376-.65l.376.65ZM3.982 3.075l-.046.749l.046-.749ZM7 3.488l.191-.726L7 3.488Zm3.282 1.388l-.35.663l.35-.663Zm3.346 15.193l.352.662l-.352-.662ZM17 18.634l-.191-.726l.191.726Zm2.985-.411l.047.748l-.047-.748Zm-9.613 1.846l-.352.662l.352-.662ZM7 18.634l.191-.726l-.191.726Zm-2.985-.411l-.047.748l.047-.748Zm18.735-7.684a.75.75 0 0 0-1.5 0h1.5ZM21.25 7a.75.75 0 0 0 1.5 0h-1.5Zm-20 3.57a.75.75 0 0 0 1.5 0h-1.5ZM2.75 14a.75.75 0 0 0-1.5 0h1.5ZM20.056 2.268c-1.139.04-2.626.158-3.771.501l.43 1.437c.95-.284 2.274-.4 3.393-.439l-.052-1.499Zm-3.771.501c-.995.298-2.114.88-2.987 1.385l.752 1.298c.85-.492 1.845-1 2.665-1.246l-.43-1.437ZM3.936 3.824c.966.059 2.06.174 2.873.389l.382-1.45c-.96-.254-2.176-.376-3.163-.437l-.092 1.498Zm2.873.389c.962.254 2.146.81 3.123 1.326l.7-1.326c-.995-.527-2.304-1.15-3.44-1.45l-.383 1.45ZM13.98 20.73c.991-.528 2.219-1.11 3.211-1.372l-.382-1.45c-1.17.308-2.526.961-3.534 1.498l.705 1.324Zm3.211-1.372c.803-.212 1.882-.328 2.841-.388l-.094-1.497c-.98.062-2.179.183-3.13.434l.383 1.45Zm-6.466.048c-1.008-.537-2.363-1.19-3.534-1.499l-.382 1.45c.992.263 2.22.845 3.21 1.373l.706-1.324Zm-3.534-1.499c-.95-.25-2.15-.372-3.13-.434l-.093 1.497c.959.06 2.038.176 2.84.388l.383-1.45Zm14.059-1.764c0 .686-.568 1.284-1.312 1.33l.094 1.497c1.474-.092 2.718-1.291 2.718-2.827h-1.5Zm1.5-11.21c0-1.464-1.165-2.719-2.694-2.666l.052 1.5c.615-.022 1.142.484 1.142 1.165h1.5Zm-21.5 11.21c0 1.536 1.244 2.735 2.718 2.828l.094-1.498c-.744-.046-1.312-.645-1.312-1.33h-1.5Zm12.025 3.264a2.723 2.723 0 0 1-2.55 0l-.705 1.323a4.224 4.224 0 0 0 3.96 0l-.705-1.324Zm.023-15.254a2.77 2.77 0 0 1-2.665.059l-.701 1.326a4.27 4.27 0 0 0 4.117-.087l-.75-1.298ZM2.75 4.998c0-.697.552-1.213 1.186-1.174l.092-1.498C2.47 2.231 1.25 3.5 1.25 4.998h1.5Zm20 11.146v-5.605h-1.5v5.605h1.5Zm0-9.144V4.933h-1.5V7h1.5Zm-20 3.57V4.999h-1.5v5.573h1.5Zm0 5.574V14h-1.5v2.144h1.5Z"/><path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M12 5.5v15"/></g></svg>
      </div>
      <span class="font-mono text-xl text-sky-500">({{ juz.number }})</span>
    </div>
    <div class="w-36 h-36 bg-blue-50/50 dark:bg-sky-100/5 absolute rounded-full -top-20 -right-20"></div>
  </div>
</router-link>  
</template>

<script setup lang="ts">
import { Metadata } from '@/types/alquran.interface';
import { convertToArab } from '@/utils/helperFunction';
defineProps<{ juz: Metadata }>()
</script>