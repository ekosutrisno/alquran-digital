<template>
  <router-link :to="{name: 'HomePage'}" class="text-sm md:text-xl relative mx-auto mt-[60px] md:mt-14 inline-flex items-center space-x-1.5">
      <span>
          <img src="@/assets/v4.svg" alt="logo" class="h-7 w-7 hidden sm:block">
      </span>
      <span class="text-slate-800 dark:text-white">Al-Quran Digital</span>
  </router-link>
  <div class="relative font-quicksand flex flex-1 px-4 flex-col justify-center items-center overflow-hidden">
    <div class="flex flex-col z-30 with-transition items-start">
      <div class="text-sky-500 text-2xl md:text-4xl font-semibold">401</div>
      <div class="pt-4">
        <h3 class="dark:text-slate-50 text-color-dark-gray-darker text-2xl md:text-4xl font-semibold">Unauthorized</h3>
        <p class="dark:text-slate-300">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
         <ButtonSky text="Kembali Ke Halaman Terakhir"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonSky from '@/components/shared/ButtonSky.vue';
</script>