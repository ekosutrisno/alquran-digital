<template>
    <ButtonBack :to="{name: 'LoginPage'}"/>

    <div v-if="isSendProcess" class="absolute inset-0 z-50 bg-gray-400/25 flex flex-col items-center justify-center">
        <Loader/>
    </div>

    <div v-if="mode == 'verifyEmail'" class="relative flex flex-col w-full flex-1 my-auto mx-auto items-center justify-center">
        <div class="max-w-md text-center px-6 pb-8 transition sm:mx-auto w-full h-full md:rounded-lg sm:px-10">
            <img src="https://tairo.cssninja.io/img/illustrations/dashboards/travel-cases.svg" alt="Confirm Account Success Images">
            <p class="font-medium text-2xl mt-5 dark:text-gray-200">Verifikasi Akun</p>
            <p class="mt-2 text-gray-600 dark:text-gray-400">Klik tombol verifikasi dibawah ini untuk melanjutkan menggunakan aplikasi.</p>
            <form @submit.prevent="doVerifyAcount(String(oobCode))">
                <button type="submit" class="mt-4 inline-flex items-center space-x-2 text-white font-medium bg-green-400 hover:bg-green-400/90 py-2 px-3 rounded-lg">
                    <span>Verifikasi Sekarang</span>
                </button>
            </form>
        </div>
    </div>
    <div v-if="mode == 'resetPassword'" class="relative flex flex-col w-full flex-1 my-auto mx-auto items-center justify-center">
        <div class="md:bg-white md:card-shadow-md md:dark:bg-slate-800 max-w-md px-6 pt-10 pb-8 transition md:ring-1 ring-gray-900/5 md:dark:ring-slate-700/75 sm:mx-auto w-full h-full md:rounded-lg sm:px-10">
            <!-- main Form -->
            <div class="max-w-md z-30 with-transition w-full space-y-8">
                <div>
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-800 dark:text-slate-50">
                    Update Password
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600 dark:text-slate-300">
                        Buat password baru atau 
                    <router-link :to="{name: 'LoginPage'}" class="font-medium text-sky-600 dark:text-sky-400 hover:text-sky-500">
                        Masuk
                    </router-link>
                    </p>
                </div>
                <form class="mt-8 space-y-6" @submit.prevent="confirmPasswordResetAction">
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="new-password" class="sr-only">Password</label>
                            <input id="new-password" v-model="authRequest.newPassword" name="new-password" type="password" autocomplete="off" required="true" class="appearance-none relative block w-full px-3 py-2 border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-300 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm rounded-b-none" placeholder="Password" />
                            <p v-if="isEmailNotRegisterd" class="text-red-400 text-sm my-3">Email is not registered, please fill in your registered email.</p>
                        </div>
                        <div>
                            <label for="new-confirm-password" class="sr-only">Ulangi Password</label>
                            <input id="new-confirm-password" v-model="authRequest.newConfirmPassword" name="new-confirm-password" type="password" autocomplete="off" required="true" class="appearance-none relative block w-full px-3 py-2 border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-300 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm rounded-t-none" placeholder="Ulangi Password" />
                            <p v-if="isEmailNotRegisterd" class="text-red-400 text-sm my-3">Email is not registered, please fill in your registered email.</p>
                        </div>
                    </div>
                    <div>
                        <button type="submit" :disabled="!isValidPassword" class="group relative disabled:bg-opacity-25 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { verifyPasswordResetCode } from "@firebase/auth";
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import { useAuth } from '@/services/useAuth';
import { isMatchPassword } from '@/utils/helperFunction';
import { auth } from "@/config/firebase.config";
import ButtonBack from "@/components/shared/ButtonBack.vue";
import Loader from "@/components/Loader.vue";

const { resetPasswordConfirm, doVerifyAcount } = useAuth();
const route = useRoute();
const router = useRouter();
const toast = useToast();

const { oobCode, mode } = route.query;

const authRequest = ref({ newPassword: '', newConfirmPassword: '' });
const isEmailNotRegisterd = ref(false);
const isSendProcess = ref(false);

const isValidPassword = computed(() =>
    isMatchPassword(authRequest.value.newPassword, authRequest.value.newConfirmPassword)
);

const confirmPasswordResetAction = (): void => {
    if (isValidPassword.value)
        verifyPasswordResetCode(auth, `${oobCode}`)
            .then((email) => {
                if (email) {
                    resetPasswordConfirm(oobCode as string, authRequest.value.newPassword)
                        .then(() => {
                            router.replace({ name: 'LoginPage' });
                            toast.success('Password berhasil diupdate.');
                        });
                }
            })
            .catch(() => toast.warning('Invalid Action Code'))
}
</script>