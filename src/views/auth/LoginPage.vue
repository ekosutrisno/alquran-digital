<template>
    <ButtonBack/>

    <div class="relative flex flex-col w-full flex-1 my-auto mx-auto items-center justify-center">        
        <div class="md:bg-white md:dark:bg-slate-800 max-w-md px-6 pt-10 pb-8 transition md:ring-1 ring-gray-900/5 md:dark:ring-slate-700/75 sm:mx-auto w-full h-full md:rounded-lg sm:px-10">
               <!-- Main Form -->
            <div class="with-transition w-full space-y-8">
                <div>
                    <h2 class="text-center text-3xl font-extrabold text-slate-800 dark:text-slate-50">
                        Login
                    </h2>
                    <p class="mt-4 text-center text-sm text-gray-600 dark:text-slate-300">
                        Or
                        {{ ' ' }} Not register yet?
                    <router-link to="/auth/register" class="font-medium text-sky-600 dark:text-sky-400 hover:text-sky-500">
                        Create an Account
                    </router-link>
                    </p>
                </div>
                <form class="mt-8 space-y-6" @submit.prevent="onLoginAction">
                    <input type="hidden" name="remember" value="true" />
                    <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" v-model="state.auth.email" name="email" type="email" autocomplete="email" required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-300 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" v-model="state.auth.password" name="password" type="password" autocomplete="current-password" required="true" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-300 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Password" />
                    </div>
                    </div>

                    <div class="flex items-center justify-end">
                    <div class="text-sm">
                        <router-link to="/auth/reset-password" class="font-medium text-sky-600 dark:text-sky-400 hover:text-sky-500">
                        Forgot your password?
                        </router-link>
                    </div>
                    </div>

                    <div>
                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon class="h-5 w-5 text-sky-500 group-hover:text-sky-400" aria-hidden="true" />
                        </span>
                        Sign in
                    </button>
                    </div>
                </form>

                <div class="flex flex-col space-y-4 items-center justify-end">
                    <div class="text-sm">
                        <p class="font-medium text-gray-600 dark:text-slate-300">
                            Or continue with Google?
                        </p>
                    </div>
                    <button 
                        @click="loginWithGoogleHandler"
                        class="rounded-md inline-flex items-center space-x-2 py-2 px-6 border dark:border-slate-700 dark:hover:bg-slate-700 ring-sky-400 hover:ring-2 transition dark:text-white text-slate-800 dark:bg-slate-800 bg-white"
                    >
                        <GoogleIcon class="w-7 h-7"/> <span>Google</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { LockClosedIcon } from '@heroicons/vue/solid';
import GoogleIcon from '@/components/svg/GoogleIcon.vue';
import { useRouter } from 'vue-router';
import { signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { auth, gProvider } from '@/services/useFirebase';
import { useAuth, useUser } from '@/services';
import ButtonBack from '@/components/shared/ButtonBack.vue';

const router = useRouter();
const authService = useAuth();
const userService = useUser();

const state = reactive({
    auth:{
        email: '',
        password: ''
    },
    isLoginProcess: false
})

onMounted(()=>{
    if (localStorage.getItem('_uid')) 
        router.replace('/app/dashboard/personal');
})

const onLoginAction = () => {
    /** Initial Loading. */
    state.isLoginProcess = true;

    signInWithEmailAndPassword(auth, state.auth.email, state.auth.password)
        .then((userCredential) => {
            /** Get User Cred. */
            const user = userCredential.user;

            /** Set User Detail to Context. */
            authService.onLoginAction(user);

            /** Stop Loading and Redirect in to Dashboard. */
            state.isLoginProcess =  false;
            router.replace('/app/dashboard/personal');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            authService.$patch(state => state.error = {
            errorCode: errorCode,
            errorMessage: errorMessage
            });

            state.isLoginProcess =  false;
            console.log(`${errorCode} => ${errorMessage}`);
        });
    }

 const loginWithGoogleHandler = () => {
    signInWithPopup(auth, gProvider)
        .then((result) => {
            const user = result.user;
            /** Save user data to DB */
            userService
                .onRegisterUser({ userId: user.uid, email: user.email as string }, { user: user, oauth: true })
                .then(() => {
                    
                    authService.onLoginAction(user);
                    
                    router.replace('/app/dashboard/personal')
                });

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            authService.$patch(state => state.error = {
                errorCode: errorCode,
                errorMessage: errorMessage
            });

            state.isLoginProcess =  false;
            console.log(`${errorCode} => ${errorMessage}`);
        });
}

</script>