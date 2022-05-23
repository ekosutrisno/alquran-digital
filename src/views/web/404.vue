<template>
  <div class="relative font-quicksand px-4 flex flex-1 flex-col justify-center items-center overflow-hidden">
    <div class="flex flex-col relative z-30 with-transition items-start">
      <div class="text-sky-500 text-2xl md:text-4xl font-semibold">404</div>
      <div class="pt-4">
        <h3 class="dark:text-slate-50 text-color-dark-gray-darker text-2xl md:text-4xl font-semibold">Page not
          found</h3>
        <p class="dark:text-slate-300 max-w-xs pt-2">Please check the URL in the address bar and try again.</p>
        <ButtonSky :text="`Back to the last page`"/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ButtonSky from '@/components/shared/ButtonSky.vue';
</script>