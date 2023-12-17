<template>
<router-link :id="`manzil_${manzil.number}`" v-motion-slide-bottom v-motion-slide-visible-once-bottom class="cursor-default sm:cursor-pointer" :to="{name: 'AlquranPageDetail', query:{ sn: manzil.surah, an: manzil.ayah}}">
   <div class="hover:ring-sky-400 antialiased group transition dark:hover:ring-sky-400 bg-white dark:bg-dark-blue  ring-1 ring-slate-700/10 dark:ring-slate-700 card-shadow-md relative overflow-hidden font-quran group sm:cursor-pointer flex flex-col select-none w-full h-full mx-auto mb-2 rounded-lg p-5">
     <div class="absolute -left-10 -bottom-10 w-28 h-28 rounded-full bg-purple-200/5">
    </div>
     <div class="absolute left-10 bottom-10 w-10 h-10 rounded-full bg-purple-200/5">
    </div>
     <div class="absolute -right-5 -top-5 w-14 h-14 rounded-full bg-purple-200/10">
    </div>
    <div class="w-full flex items-start py-2 justify-between">
      <div>
        <span class="font-bold text-sky-500 text-xl">
          Manzil {{ manzil.number }}
        </span>
      </div>
    </div>
    <h1 class="text-right group-hover:text-sky-500 transition text-4xl font-semibold text-slate-700 dark:text-slate-100"><span class="text-xs text-slate-500 dark:text-slate-300 align-super font-light">Surah ke</span> {{manzil.surah}} <span class="text-xs text-slate-500 dark:text-slate-300 font-light">Ayah</span>  <span class="text-sm">({{manzil.ayah}})</span></h1>
    <div class="inline-flex space-x-1 text-xs mt-2">
      <div class="inline-flex items-center text-sky-500">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-6 h-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path stroke-linejoin="round" d="m8.5 12.5l2 2l5-5"/><path d="M3.03 13.078a2.5 2.5 0 0 1 0-2.157c.14-.294.38-.576.86-1.14c.192-.225.288-.337.368-.457a2.5 2.5 0 0 0 .376-.907c.028-.142.04-.289.063-.583c.059-.738.088-1.107.197-1.416A2.5 2.5 0 0 1 6.42 4.894c.308-.109.677-.139 1.416-.197c.294-.024.44-.036.582-.064a2.5 2.5 0 0 0 .908-.376c.12-.08.232-.175.456-.367c.564-.48.846-.72 1.14-.861a2.5 2.5 0 0 1 2.157 0c.295.14.577.38 1.14.861c.225.192.337.287.457.367a2.5 2.5 0 0 0 .908.376c.141.028.288.04.582.064c.739.058 1.108.088 1.416.197a2.5 2.5 0 0 1 1.525 1.524M4.894 17.581a2.5 2.5 0 0 0 1.525 1.524c.308.11.677.139 1.416.197c.294.024.44.036.582.064a2.5 2.5 0 0 1 .908.376c.12.08.232.175.456.367c.564.48.846.72 1.14.861a2.5 2.5 0 0 0 2.157 0c.295-.14.577-.38 1.14-.861a5.25 5.25 0 0 1 .457-.367a2.5 2.5 0 0 1 .908-.376c.141-.028.288-.04.582-.064c.739-.058 1.108-.088 1.416-.197a2.5 2.5 0 0 0 1.525-1.524c.109-.308.138-.678.197-1.416c.023-.294.035-.441.063-.583c.064-.324.192-.633.376-.907c.08-.12.176-.232.367-.457c.48-.564.721-.846.862-1.14a2.5 2.5 0 0 0 0-2.157"/></g></svg>
      </div>
      <span class="font-mono text-xl text-sky-500">({{convertToArab(`${manzil.number}`)}})</span>
    </div>
  </div>
</router-link>
</template>

<script setup lang="ts">
import { Metadata } from '@/types/alquran.interface';
import { convertToArab } from '@/utils/helperFunction';
defineProps<{ manzil: Metadata }>()
</script>