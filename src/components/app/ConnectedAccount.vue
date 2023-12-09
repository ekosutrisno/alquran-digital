<template>
    <div>
        <div class="pb-2">
            <p class="text-xl dark:text-white inline-flex items-center space-x-2">
                <ProfileIcon class="text-slate-500 w-6 h-6"/>
                <span>Akun terhubung</span>
            </p>
            <div class="border-t dark:border-slate-700/50 mt-2 py-2">
                <p class="text-sm text-slate-700 dark:text-slate-300">Ini adalah provider yang digunakan bagi Anda untuk masuk ke aplikasi dan juga akun apa yang terhubung.</p>
            </div>
        </div>
        <div class="flex items-center space-x-4 text-sm dark:text-white">
            <div v-for="prov in currentUserSession?.providedId" :key="prov" class="border border-slate-700/20 dark:border-slate-700/50 rounded-lg py-1 px-2 flex items-center">
                <div v-if="prov == 'password'" class="inline-flex items-center space-x-2">
                    <FirebaseIcon class="h-7 w-7"/>
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
import FirebaseIcon from '../svg/FirebaseIcon.vue';
import ProfileIcon from '../svg/ProfileIcon.vue';

const { currentUserSession } = storeToRefs(useAuth());

</script>