<template>
    <ButtonBack :to="{name: 'LoginPage'}"/>

    <div v-if="isRegisterProcess" class="absolute inset-0 z-50 bg-gray-400/25 flex flex-col items-center justify-center">
        <Loader/>
    </div>

    <div v-if="$route.query.cta == 'create-confirmed'" class="relative flex flex-col w-full flex-1 my-auto mx-auto items-center justify-center">
        <div class="max-w-md text-center with-transition px-6 pb-8 transition sm:mx-auto w-full h-full md:rounded-lg sm:px-10">
            <img src="https://tairo.cssninja.io/img/illustrations/placeholders/flat/placeholder-launch.svg" alt="Create Account Success Images">
            <p class="font-medium text-2xl dark:text-gray-300">Konfirmasi akun Anda</p>
            <p class="mt-2 text-gray-600 dark:text-gray-400">Hai Santri, selamat bergabung! Cuzzzz cek email buat konfirmasi akunmu ya.</p>
            <router-link :to="{name: 'LoginPage'}" class="mt-4 inline-flex items-center space-x-2 text-white font-medium bg-purple-500 hover:bg-purple-400 py-2 px-3 rounded-lg">
                <span>Kembali Ke Halaman Masuk</span>
            </router-link>
        </div>
    </div>

    <div v-else class="relative flex flex-col w-full flex-1 my-auto mx-auto items-center justify-center">
        <div class="md:bg-white md:card-shadow-md md:dark:bg-dark-blue max-w-md px-6 pt-10 pb-8 transition md:ring-1 ring-gray-900/5 md:dark:ring-slate-700 sm:mx-auto w-full h-full md:rounded-lg sm:px-10">
            <!-- main Form -->
            <div class="max-w-md with-transition w-full space-y-8">
                <div>
                    <h2 class="text-center text-3xl font-extrabold text-slate-800 dark:text-slate-50">
                    Daftar Sekarang
                    </h2>
                    <p class="mt-6 text-center text-sm text-gray-600 dark:text-slate-100">
                    Sudah punya akun?
                    <router-link :to="{name: 'LoginPage'}" class="font-medium text-sky-600 dark:text-sky-400 hover:text-sky-500">
                        Masuk
                    </router-link>
                    </p>
                </div>
                <form class="mt-8 space-y-6" @submit.prevent="registerWithEmailPassword">
                    <input type="hidden" name="remember" value="true" />
                    <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">Alamat Email</label>
                        <input required id="email-address" v-model="authRequest.email" name="email" type="text" autocomplete="off" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 bg-white dark:bg-dark-blue dark:border-slate-700/50 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Alamat Email" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input required id="password" v-model="authRequest.password" name="password" type="password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 bg-white dark:bg-dark-blue dark:border-slate-700/50 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Password" />
                    </div>
                    <div>
                        <label for="confirm-password" class="sr-only">Ulangi Password</label>
                        <input required id="confirm-password" v-model="authRequest.confirmPassword" name="confirm-password" type="password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 bg-white dark:bg-dark-blue dark:border-slate-700/50 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Ulangi Password" />
                    </div>
                    </div>
                    <div v-if="error.errorMessage" class="text-xs space-y-0.5 ring-1 ring-red-500 rounded p-2">
                        <span class="py-0.5 px-2 rounded bg-red-500 text-white">Error</span>
                        <span class="block text-red-400">
                            {{ error.userMessage }}
                        </span>
                    </div>
                    <div>
                        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockIcon class="h-5 w-5 text-sky-500 group-hover:text-sky-400" aria-hidden="true" />
                            </span>
                            Daftar
                        </button>
                    </div>
                    <p class="text-center text-sm dark:text-white">Dengan mendaftar, saya menyetujui Syarat dan Ketentuan serta <RouterLink class="text-sky-600 dark:text-sky-400" :to="{name: 'PrivacyPolicyPage'}" title="Kebijakan Privasi">Kebijakan Privasi</RouterLink> </p>
                </form>
                <div class="flex flex-col space-y-4 items-center justify-end">
                    <div class="text-sm">
                        <p class="font-medium text-gray-600 dark:text-slate-100">
                            atau daftar dengan
                        </p>
                    </div>
                    <button 
                        @click="loginGoogle"
                        class="rounded-md inline-flex items-center space-x-2 py-2 px-6 border border-slate-700/10 dark:border-slate-700/50 dark:hover:bg-slate-800 ring-sky-400 hover:ring-2 transition dark:text-white text-slate-800 dark:bg-dark-blue bg-white"
                    >
                        <GoogleIcon class="w-7 h-7"/> <span>Google</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/services/useAuth';
import GoogleIcon from '@/components/svg/GoogleIcon.vue';
import ButtonBack from '@/components/shared/ButtonBack.vue';
import Loader from '@/components/Loader.vue';
import { storeToRefs } from 'pinia';
import LockIcon from '@/components/svg/LockIcon.vue';

const authService = useAuth()
const { error, authRequest, isRegisterProcess } = storeToRefs(authService)
const { registerWithEmailPassword, loginGoogle } = authService;
</script>