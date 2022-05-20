<template>
  <div class="relative font-quicksand px-4 flex flex-1 flex-col justify-center items-center overflow-hidden">
    <img src="@/assets/beams.jpg" alt="" class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" />
    <div class="absolute inset-0 bg-[url(@/assets/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
  
    <div class="flex relative z-30 with-transition items-start divide-x divide-color-dark-gray-darker space-x-4">
      <div class="text-sky-500 text-2xl md:text-4xl font-semibold">404</div>
      <div class="pl-4">
        <h3 class="dark:text-color-gray-light text-color-dark-gray-darker text-2xl md:text-4xl font-semibold">Page not found</h3>
        <p class="text-color-dark-gray-lighter max-w-xs pt-2">Please check the URL in the address bar and try again.</p>
        <button type="button" @click="$router.back()" class="mt-8 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
               <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            <span class="ml-2">Back to the last page</span> 
         </button>
      </div>
    </div>
  </div>
</template>