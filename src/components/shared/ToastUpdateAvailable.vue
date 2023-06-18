<template>
<div v-if="newAppAvailable" class="fixed top-5 w-full">
  <div class="w-full mx-auto max-w-sm p-4 text-gray-500 bg-white rounded-lg shadow-xl shadow-sky-800/10 dark:shadow-slate-900/50 dark:bg-gray-800 dark:text-gray-400" role="alert">
      <div class="flex">
          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-sky-500 bg-sky-100 rounded-lg dark:text-sky-300 dark:bg-sky-900">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Refresh icon</span>
          </div>
          <div class="ml-3 text-sm font-normal">
              <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Update available</span>
              <div class="mb-2 text-sm font-normal">A new software version is available.</div> 
              <div class="grid grid-cols-2 gap-2">
                  <div>
                      <button type="button" @click="reloadAndInstall" class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-offset-1 focus:outline-none focus:ring-sky-300 dark:bg-sky-500 dark:hover:bg-sky-600 dark:focus:ring-sky-800">Update</button>
                  </div>
                  <div>
                      <button type="button" @click="closeToast" class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-offset-1 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Not now</button> 
                  </div>
              </div>    
          </div>
          <button type="button"  @click="closeToast" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
              <span class="sr-only">Close</span>
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
      </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { useUtil } from '@/services';
import { storeToRefs } from 'pinia';
import { reloadAndInstall } from '@/utils/serviceWorker';

const { newAppAvailable } = storeToRefs(useUtil());
const closeToast = () => newAppAvailable.value = false;
</script>