<template>
  <div class="flex flex-col justify-between with-transition">
    <div class="relative flex flex-col justify-center items-center pt-20 px-6 mx-auto">
      <p class="text-slate-900 dark:text-slate-100 font-extrabold text-xl md:text-4xl text-center">Management Bacaan &#38; Hafalan <span class="text-sky-500">Al-Quran</span></p>
      <p class="text-slate-900 dark:text-slate-100 font-extrabold text-xl md:text-4xl text-center md:mt-2">Lebih Mudah Dan Sederhana</p>
      <p class="text-center text-sm md:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mt-4 md:mt-8 leading-6">Mengelola bacaan dan hafalan <span class="text-sky-500 font-semibold">Al-Quran</span> lebih mudah dengan fitur Personal Bacaan, Organization/Madrasah, Bacaan Terakhir, Menyimpan Ayat-ayat Favorit, dan juga bisa mendengarkan langsung via audio.</p>

      <div class="mt-10">
       <Button :text="`Baca Al-Quran`" :to="`/app/dashboard`" />
      </div>
  </div>
</div>

</template>

<script setup lang="ts">
import Button from '@/components/shared/Button.vue';
import { useAuth } from '@/services';
import { useRouter } from 'vue-router';

const authService = useAuth();
const router = useRouter();

const onLogoutAction = () => {
  localStorage.removeItem('_uid');
  authService.onLogoutAction();
  router.replace('/auth/login');
}
</script>