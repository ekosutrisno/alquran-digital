<template>
    <ButtonBack :to="{name: 'LoginPage'}"/>

    <div v-if="state.isSendProcess" class="absolute inset-0 z-50 bg-gray-400/25 flex flex-col items-center justify-center">
        <Loader/>
    </div>

    <div class="relative flex flex-col w-full flex-1 my-auto mx-auto items-center justify-center">
        <div class="md:bg-white md:card-shadow-md md:dark:bg-dark-blue max-w-md px-6 pt-10 pb-8 transition md:ring-1 ring-gray-900/5 md:dark:ring-slate-700 sm:mx-auto w-full h-full md:rounded-lg sm:px-10">
            <!-- main Form -->
            <div class="max-w-md z-30 with-transition w-full space-y-8">
                <div>
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-800 dark:text-slate-50">
                        Reset Password
                    </h2>
                    <p v-if="$route.query.cta == 'reset-confirmed'" class="mt-2 text-center text-sm text-gray-600 dark:text-slate-300">
                        Reset password link email berhasil dikirim, cek email ya.
                    </p>
                    <p v-else class="mt-2 text-center text-sm text-gray-600 dark:text-slate-300">
                        Kirim reset password atau  
                        <router-link to="/auth/login" class="font-medium text-sky-600 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-500">
                            Kembali ke Login
                        </router-link>
                    </p>
                </div>
                <div v-if="$route.query.cta == 'reset-confirmed'">
                    <RouterLink :to="{name: 'LoginPage'}" class="group relative disabled:bg-opacity-50 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 dark:hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                        Kembali ke halaman masuk
                    </RouterLink>
                </div>
                <form v-else class="mt-8 space-y-6" @submit.prevent="onSendEmailVerification">
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="email-address" class="sr-only">Alamat email</label>
                            <input id="email-address" v-model="state.auth.email" name="email" type="email" autocomplete="off" required="true" class="appearance-none relative block w-full px-3 py-2 border border-slate-300 bg-white dark:bg-dark-blue dark:border-slate-700/50 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-300 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                            <p v-if="state.isEmailNotRegisterd" class="text-red-400 text-sm my-3">Email tidak terdaftar.</p>
                        </div>
                    </div>
                    <div>
                        <button type="submit" :disabled="!isValidEmail" class="group relative disabled:bg-opacity-50 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 dark:hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                            Kirim email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useAuth } from '@/services';
import { validateEmail } from '@/utils/helperFunction';
import ButtonBack from '@/components/shared/ButtonBack.vue';
import Loader from '@/components/Loader.vue';

const authService = useAuth();

const state = reactive({
    auth:{
        email: ''
    },
    isEmailNotRegisterd: false,
    isSendProcess: false
})

const onSendEmailVerification = () => {

    state.isSendProcess = true;

    if(validateEmail(state.auth.email)){
        authService
            .sendPasswordResetEmail(state.auth.email)
                .then(()=> {
                    state.auth.email = '';
                    state.isSendProcess = false;
                })
    }
}

const isValidEmail = computed(()=> validateEmail(state.auth.email));

</script>