<template>
  <div class="flex relative bg-color-gray-lighter dark:bg-color-dark-black-default flex-col font-quicksand items-center justify-center h-full min-h-screen">
     <img 
      aria-hidden="true" 
      class="hidden lg:block object-cover absolute inset-0 opacity-5" 
      src="https://www.gstatic.com/mobilesdk/200303_mobilesdk/ML_fore@2x.png" 
      alt="img"
    >
    <div class="flex z-30 with-transition items-start divide-x divide-color-dark-gray-darker space-x-4">
      <div class="text-indigo-400 text-4xl font-semibold">401</div>
      <div class="pl-4">
        <h3 class="dark:text-color-gray-light text-color-dark-gray-darker text-4xl font-semibold">UnAuthorized</h3>
        <p class="text-color-dark-gray-lighter">You do not get permission to access this page.</p>
        <button type="button" @click="$router.back()" class="mt-8 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
               <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            <span class="ml-2">Back to the last page</span> 
         </button>
      </div>
    </div>
  </div>
</template>