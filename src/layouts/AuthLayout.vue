<template>
   <div class="font-quicksand">
      <div class="relative dark:bg-[#10172A] flex min-h-screen flex-col justify-start overflow-hidden transition-colors">
         <div class="absolute inset-0 bg-[url(@/assets/grid-light.svg)] dark:bg-[url(@/assets/grid-dark.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
   
         <router-view/>
      </div>

   </div>
</template>