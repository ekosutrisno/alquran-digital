<template>
  <div class="flex flex-col justify-between">
    <div class="relative flex flex-col justify-center items-center pt-20 px-6 mx-auto">
      <p class="text-slate-900 font-extrabold text-xl md:text-4xl text-center">Management Bacaan &#38; Hafalan <span class="text-sky-500">Al-Quran</span></p>
      <p class="text-slate-900 font-extrabold text-xl md:text-4xl text-center md:mt-2">Lebih Mudah Dan Sederhana</p>
      <p class="text-center text-sm md:text-lg text-slate-700 max-w-2xl mt-4 md:mt-8 leading-6">Mengelola bacaan dan hafalan <span class="text-sky-500 font-semibold">Al-Quran</span> lebih mudah dengan fitur Personal Bacaan, Organization/Madrasah, Bacaan Terakhir, Menyimpan Ayat-ayat Favorit, dan juga bisa mendengarkan langsung via audio.</p>

      <div class="mt-10">
        <!-- <router-link class="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400" to="/docs/installation">Get started</router-link> -->
        <Button :text="`Get started`" :to="`/home-dashboard`" />
      </div>
  </div>
  <footer class="text-sm relative leading-6">
    <div class="mt-16 pt-10 text-center">
      Al-Quran Digital &copy;{{new Date().getFullYear()}}
    </div>
  </footer>
</div>

</template>

<script setup lang="ts">
import Button from '../../components/shared/Button.vue';
</script>