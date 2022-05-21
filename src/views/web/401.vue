<template>
  <div class="relative font-quicksand flex flex-1 px-4 flex-col justify-center items-center overflow-hidden">
    <div class="flex flex-col z-30 with-transition items-start">
      <div class="text-sky-500 text-2xl md:text-4xl font-semibold">401</div>
      <div class="pt-4">
        <h3 class="dark:text-color-gray-light text-color-dark-gray-darker text-2xl md:text-4xl font-semibold">UnAuthorized</h3>
        <p class="text-color-dark-gray-lighter">You do not get permission to access this page.</p>
         <ButtonSky :text="`Back to the last page`"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonSky from '../../components/shared/ButtonSky.vue';
</script>