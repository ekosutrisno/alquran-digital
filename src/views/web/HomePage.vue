<template>
  <div class="flex flex-col justify-between with-transition">
    <div class="relative flex flex-col justify-center items-center pt-20 px-6 mx-auto">
      <p class="text-slate-900 dark:text-slate-100 font-extrabold text-xl md:text-4xl text-center">{{ t('home.s1') }} &#38; {{ t('home.s2') }} <span class="text-gradien">{{ t('home.quran') }}</span></p>
      <p class="text-slate-900 dark:text-slate-100 font-extrabold text-xl md:text-4xl text-center md:mt-2">{{ t('home.s3') }}</p>
      <p class="text-center text-sm md:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mt-4 md:mt-8 leading-6">{{ t('home.s4') }} <span class="text-gradien font-semibold">{{ t('home.quran') }}</span> {{ t('home.s5') }}</p>

      <div class="mt-10">
       <Button :text="t('home.cta')" :to="`/app/dashboard`" />
      </div>
  </div>
</div>

</template>

<script setup lang="ts">
import Button from '@/components/shared/Button.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>