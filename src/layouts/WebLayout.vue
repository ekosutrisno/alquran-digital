<template>
   <div class="font-quicksand">
      <div class="relative flex min-h-screen flex-col justify-start overflow-hidden">
         <img src="@/assets/beams.jpg" alt="" class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" />
         <div class="absolute inset-0 bg-[url(@/assets/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
         <Header />
         <router-view/>
      </div>

   </div>
</template>

<script setup lang="ts">
import Header from '../components/web/Header.vue';

</script>