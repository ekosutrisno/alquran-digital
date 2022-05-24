<template>
    <div class="flex flex-col w-full flex-1 my-auto mx-auto items-center justify-center">
        <div class="md:bg-white md:dark:bg-slate-800 max-w-md px-6 pt-10 pb-8 transition md:ring-1 ring-gray-900/5 md:dark:ring-slate-700/75 sm:mx-auto w-full h-full md:rounded-lg sm:px-10">
            <!-- main Form -->
            <div class="max-w-md z-30 with-transition w-full space-y-8">
                <div>
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-800 dark:text-slate-50">
                    Reset Password
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600 dark:text-slate-300">
                        Will send email reset password or 
                    <router-link to="/auth/login" class="font-medium text-sky-600 dark:text-sky-400 hover:text-sky-500">
                        Back to login
                    </router-link>
                    </p>
                </div>
                <form class="mt-8 space-y-6" @submit.prevent="onSendEmailVerification">
                    <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" v-model="state.auth.email" name="email" type="email" autocomplete="off" required="true" class="appearance-none relative block w-full px-3 py-2 border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-300 rounded-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                        <p v-if="state.isEmailNotRegisterd" class="text-red-400 text-sm my-3">Email is not registered, please fill in your registered email.</p>
                    </div>
                    </div>
                    <div>
                    <button type="submit" :disabled="!isValidEmail" class="group relative disabled:bg-opacity-25 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                        Send email
                    </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useAuth } from '../../services';
import { validateEmail } from '../../utils/helperFunction';

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
            state.isSendProcess = false;
            state.auth.email = '';
        })
    }

    setTimeout(() => {
        state.isSendProcess = false;
    }, 3000);
}

const isValidEmail = computed(()=> validateEmail(state.auth.email));

</script>