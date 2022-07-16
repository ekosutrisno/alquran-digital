<template>
<div>
    <div class="pb-2">
        <p class="text-xl text-red-500 inline-flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Danger zone</span>
        </p>
        <div class="border-t dark:border-slate-700/50 mt-2 py-2">
            <p class="text-sm text-slate-600 dark:text-slate-300">This action cannot be undone, please think again before clicking the button below.</p>
        </div>
    </div>
    <div class="flex items-center space-x-4 text-sm dark:text-white">
        <button type="button" class="mt-4 disabled:bg-opacity-50 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            <span class="mr-2">Delete account</span>
        </button>
    </div>
    
</div>
</template>

<script setup lang="ts">
import { useAuth } from '@/services';
import { storeToRefs } from 'pinia';
import GoogleIcon from '../svg/GoogleIcon.vue';

const { currentUserSession } = storeToRefs(useAuth());

</script>