<template>
<div class="h-full relative with-scroll overflow-hidden transition-colors antialiased font-quicksand flex min-h-screen flex-col justify-between dark:bg-slate-900">
   <div class="dark:hidden">
      <img src="@/assets/beams.jpg" alt="" class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" />
   </div>
   <div class="absolute inset-0 bg-[url(@/assets/grid-light.svg)] dark:bg-[url(@/assets/grid-dark.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

   <header class="w-full relative text-slate-700 dark:text-slate-200 bg-white border-b border-gray-300/50 dark:border-slate-800 dark:bg-[#0B1120] h-64 p-4">
       <NavbarHeader/>
   </header>

   <div class="flex-1 w-full relative mx-auto p-4 sm:p-8 -mt-44 max-w-7xl pb-20 md:pb-0">
      <router-view />
   </div>
   <footer class="text-xs hidden sm:block text-slate-900 relative dark:text-white p-3 pb-5 text-center">
      Al-Quran Digital &copy;{{new Date().getFullYear()}}
   </footer>
   <!-- <NavBottom/> -->
</div>
</template>
<script setup lang="ts">
import NavbarHeader from '@/components/app/NavbarHeader.vue';
</script>