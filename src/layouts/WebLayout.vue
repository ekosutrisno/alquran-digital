<template>
   <div class="font-quicksand">
      <div class="relative dark:bg-dark-blue flex min-h-screen flex-col justify-start overflow-hidden transition-colors">
         <div class="absolute inset-0 bg-[url(@/assets/grid-light.svg)] dark:bg-[url(@/assets/grid-dark.svg)] bg-center [mask-image:linear-gradient(10deg,white,rgba(255,255,255,0))]"></div>
         <Header />
         <router-view class="relative"/>
         <Footer/>
      </div>
   </div>
</template>

<script setup lang="ts">
import Header from '@/components/web/Header.vue';
import Footer from '@/components/Footer.vue';
</script>