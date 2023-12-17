<template>
<router-link :id="`page_${page.page}`" v-motion-slide-bottom v-motion-slide-visible-once-bottom class="cursor-default sm:cursor-pointer" :to="{name: 'AlquranPageDetail', query:{ sn: page.surat, an: page.ayat}}">
   <div class="hover:ring-sky-400 antialiased group transition dark:hover:ring-sky-400 bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700 card-shadow-md select-none font-quran group sm:cursor-pointer flex flex-col w-full h-full mx-auto mb-2 rounded-lg p-5 overflow-hidden relative">
    <div class="w-full flex items-start py-2 justify-between">
      <div class="text-gray-800  text-xl absolute right-0 -top-3 w-auto px-4 h-16 rounded-l-2xl bg-gradient-to-bl from-sky-300/20 to-sky-200/5 dark:from-sky-800/10 dark:to-sky-700/10 flex items-center justify-center font-semibold">
        <span class="font-semibold text-sky-600">
          {{page.surat}}:{{page.ayat}} <span class="font-mono font-semibold text-sm">({{ convertToArab(`${page.surat}`) }}:{{ convertToArab(`${page.ayat}`) }})</span> 
        </span> 
      </div>
    </div>
    <div>
      <span class="text-xl text-sky-500">
        Halaman
      </span>
    </div>
    <div class="text-slate-800 absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-sky-300/5 flex items-center justify-center font-semibold"></div>
    <h1 class="text-right font-mono text-4xl mt-8 font-semibold text-slate-700 dark:text-slate-100 group-hover:text-sky-500 transition">{{convertToArab(`${page.page}`)}}</h1>
    <div class="inline-flex space-x-1 text-xs">
        <div class="inline-flex text-sky-500">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-6 h-6" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M2.75 10a.75.75 0 0 0-1.5 0h1.5Zm18.5 4a.75.75 0 0 0 1.5 0h-1.5Zm-5.857-9.946l-.502.557l.502-.557Zm3.959 3.563l-.502.557l.502-.557Zm2.302 2.537l-.685.305l.685-.305ZM3.172 20.828l.53-.53l-.53.53Zm17.656 0l-.53-.53l.53.53ZM1.355 5.927a.75.75 0 0 0 1.493.146l-1.493-.146Zm21.29 12.146a.75.75 0 1 0-1.493-.146l1.493.146ZM14 21.25h-4v1.5h4v-1.5ZM2.75 14v-4h-1.5v4h1.5Zm18.5-.437V14h1.5v-.437h-1.5ZM14.891 4.61l3.959 3.563l1.003-1.115l-3.958-3.563l-1.004 1.115Zm7.859 8.952c0-1.689.015-2.758-.41-3.714l-1.371.61c.266.598.281 1.283.281 3.104h1.5Zm-3.9-5.389c1.353 1.218 1.853 1.688 2.119 2.285l1.37-.61c-.426-.957-1.23-1.66-2.486-2.79L18.85 8.174ZM10.03 2.75c1.582 0 2.179.012 2.71.216l.538-1.4c-.852-.328-1.78-.316-3.248-.316v1.5Zm5.865.746c-1.086-.977-1.765-1.604-2.617-1.93l-.537 1.4c.532.204.98.592 2.15 1.645l1.004-1.115ZM10 21.25c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812l-1.06 1.06c.748.75 1.697 1.081 2.869 1.239c1.15.155 2.625.153 4.489.153v-1.5ZM1.25 14c0 1.864-.002 3.338.153 4.489c.158 1.172.49 2.121 1.238 2.87l1.06-1.06c-.422-.424-.676-1.004-.811-2.01c-.138-1.027-.14-2.382-.14-4.289h-1.5ZM14 22.75c1.864 0 3.338.002 4.489-.153c1.172-.158 2.121-.49 2.87-1.238l-1.06-1.06c-.424.422-1.004.676-2.01.811c-1.027.138-2.382.14-4.289.14v1.5Zm-3.97-21.5c-1.875 0-3.356-.002-4.511.153c-1.177.158-2.129.49-2.878 1.238l1.06 1.06c.424-.422 1.005-.676 2.017-.811c1.033-.138 2.395-.14 4.312-.14v-1.5ZM2.848 6.073c.121-1.234.382-1.9.854-2.371l-1.06-1.06c-.836.834-1.153 1.919-1.287 3.285l1.493.146Zm18.304 11.854c-.121 1.234-.383 1.9-.854 2.371l1.06 1.06c.836-.834 1.153-1.919 1.287-3.285l-1.493-.146Z"/><path stroke="currentColor" stroke-width="1.5" d="M13 2.5V5c0 2.357 0 3.536.732 4.268C14.464 10 15.643 10 18 10h4"/></g></svg>
        </div>
        <span class="font-mono text-xl text-sky-500">({{ page.page }})</span>
    </div>
  </div>
</router-link>  
</template>

<script setup lang="ts">
import { PageMetadata } from '@/types/alquran.interface';
import { convertToArab } from '@/utils/helperFunction';
defineProps<{ page: PageMetadata }>()
</script>