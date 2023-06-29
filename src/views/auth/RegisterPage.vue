<template>
    <ButtonBack/>

    <div v-if="state.isRegisterProcess" class="absolute inset-0 z-50 bg-gray-400/25 flex flex-col items-center justify-center">
        <Loader/>
    </div>

    <div class="relative flex flex-col w-full flex-1 my-auto mx-auto items-center justify-center">
        <div class="md:bg-white md:card-shadow-md md:dark:bg-dark-blue max-w-md px-6 pt-10 pb-8 transition md:ring-1 ring-gray-900/5 md:dark:ring-slate-700/50 sm:mx-auto w-full h-full md:rounded-lg sm:px-10">
            <!-- main Form -->
            <div class="max-w-md with-transition w-full space-y-8">
                <div>
                    <h2 class="text-center text-3xl font-extrabold text-slate-800 dark:text-slate-50">
                    Sign Up
                    </h2>
                    <p class="mt-6 text-center text-sm text-gray-600 dark:text-slate-100">
                    Or
                    {{ ' ' }} Already have an Account?
                    <router-link to="/auth/login" class="font-medium text-sky-600 dark:text-sky-400 hover:text-sky-500">
                        Sign in
                    </router-link>
                    </p>
                </div>
                <form class="mt-8 space-y-6" @submit.prevent="onRegisterAction">
                    <input type="hidden" name="remember" value="true" />
                    <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" v-model="state.auth.email" name="email" type="text" autocomplete="off" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 bg-white dark:bg-dark-blue dark:border-slate-700/50 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" v-model="state.auth.password" name="password" type="password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 bg-white dark:bg-dark-blue dark:border-slate-700/50 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Password" />
                    </div>
                    <div>
                        <label for="confirm-password" class="sr-only">Confirm Password</label>
                        <input id="confirm-password" v-model="state.auth.confirmPassword" name="confirm-password" type="password" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 bg-white dark:bg-dark-blue dark:border-slate-700/50 placeholder-gray-500 dark:placeholder-slate-400 text-gray-900 dark:text-slate-100 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
                    </div>
                    </div>
                    <div v-if="v$.$errors.length" class="text-xs space-y-0.5 ring-1 ring-red-500 rounded p-2">
                        <span class="py-0.5 px-2 rounded bg-red-500 text-white">Error</span>
                        <span class="block text-red-400" v-for="item in v$.$errors" :key="item.$uid">
                            {{ item.$property }}: {{item.$message}}
                        </span>
                    </div>
                    <div v-if="error.errorMessage" class="text-xs space-y-0.5 ring-1 ring-red-500 rounded p-2">
                        <span class="py-0.5 px-2 rounded bg-red-500 text-white">Error</span>
                        <span class="block text-red-400">
                            {{ error.errorCode }}
                        </span>
                    </div>
                    <div>
                        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LockClosedIcon class="h-5 w-5 text-sky-500 group-hover:text-sky-400" aria-hidden="true" />
                            </span>
                            Sign up
                        </button>
                    </div>
                </form>
                <div class="flex flex-col space-y-4 items-center justify-end">
                    <div class="text-sm">
                        <p class="font-medium text-gray-600 dark:text-slate-100">
                            Or continue with
                        </p>
                    </div>
                    <button 
                        @click="loginWithGoogleHandler"
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
import { computed, reactive } from 'vue';
import { LockClosedIcon } from '@heroicons/vue/solid';
import { useRouter } from 'vue-router';
import { useAuth, useUser } from '@/services';
import { createUserWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { auth, gProvider } from '@/config/firebase.config';
import GoogleIcon from '@/components/svg/GoogleIcon.vue';
import ButtonBack from '@/components/shared/ButtonBack.vue';
import Loader from '@/components/Loader.vue';
import {useVuelidate} from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { storeToRefs } from 'pinia';

const router = useRouter();
const authService = useAuth()
const userService = useUser();
const { error } = storeToRefs(authService)

const state = reactive({
    auth:{
        email: '',
        password: '',
        confirmPassword: ''
    },
    isRegisterProcess: false
})

const rules = computed(()=> {
    return {
        email: {required, email},
        password: {required, minLength: minLength(6)},
        confirmPassword: {required, sameAs: sameAs(state.auth.password)}
    }
})

const v$ = useVuelidate(rules,state.auth);

const onRegisterAction =async () => {
    /**
     * Validate the input
     */
    const result = await v$.value.$validate();
    
    if(result){
        /** Initial Loading. */
        state.isRegisterProcess = true;

        createUserWithEmailAndPassword(auth, state.auth.email, state.auth.password)
            .then((userCredential: { user: any; }) => {
                const user = userCredential.user;
                /** Set User Details Data. */
                authService.onLoginAction(user);

                /** Save User Details To tbl_users. */
                userService.onRegisterUser({userId: user.uid, email: user.email as string});

                /** Set isRegister to false and Redirect to Dashboard page. */
                state.isRegisterProcess = false;

                router.replace('/app/dashboard');
            })
            .catch((error) => {
                authService.$patch((state) => state.error = {
                    errorCode: error.code,
                    errorMessage: error.message
                });

                state.isRegisterProcess = false;
            });
        }
        else{
            state.isRegisterProcess = false;
        }
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
                    
                    router.replace('/app/dashboard')
                });

        }).catch((error) => {
            authService.$patch(state => state.error = {
                errorCode: error.code,
                errorMessage: error.message
            });

            state.isRegisterProcess =  false;
        });
}
</script>