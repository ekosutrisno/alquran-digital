<template>
   <div class="font-quicksand">
      <div class="relative dark:bg-slate-900 flex min-h-screen flex-col justify-start overflow-hidden">
         <div class="dark:hidden">
            <img src="@/assets/beams.jpg" alt="" class="absolute bg-slate-800 top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" />
         </div>
         <div class="absolute inset-0 bg-[url(@/assets/cc.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
         <router-view class="relative"/>
      </div>

   </div>
</template>