<template>
<div>
    <div class="pb-2">
        <p class="text-xl dark:text-white inline-flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
             <span>Connected account</span>
        </p>
        <div class="border-t dark:border-slate-700/50 mt-2 py-2">
            <p class="text-sm text-slate-600 dark:text-slate-300">This is the provider that is used for you to log in to the application and also what accounts are connected.</p>
        </div>
    </div>
    <div class="flex items-center space-x-4 text-sm dark:text-white">
        <div v-for="prov in currentUserSession?.providedId" :key="prov" class="border border-slate-700/20 dark:border-slate-700/50 rounded-lg py-1 px-2 flex items-center">
            <div v-if="prov == 'password'" class="inline-flex items-center space-x-2">
                <img alt="firebase" src="/firebase.png" width="28" height="28" />
                <p class="text-color-dark-gray-darker dark:text-color-gray-light uppercase font-semibold"> {{ 'Firebase' }} </p>
            </div>

            <div v-if="prov == 'google.com'" class="inline-flex items-center space-x-2 h-7">
                <GoogleIcon class="h-7 w-7"/>
                <p class="text-color-dark-gray-darker dark:text-color-gray-light uppercase font-semibold"> {{ 'Google' }} </p>
            </div>
        </div>
    </div>
    
</div>
</template>

<script setup lang="ts">
import { useAuth } from '@/services';
import { storeToRefs } from 'pinia';
import GoogleIcon from '../svg/GoogleIcon.vue';

const { currentUserSession } = storeToRefs(useAuth());

</script>