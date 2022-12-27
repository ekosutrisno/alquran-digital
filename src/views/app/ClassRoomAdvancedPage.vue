<template>
    <div ref="pageUp" class="absolute -top-20"></div>

    <div class="wrapper md:p-2 space-y-6 max-w-screen-xl mx-auto">
        <!-- Section 0 -->
        <section class="flex flex-col gap-2 md:flex-row md:items-center justify-between">
            <div class="inline-flex space-x-3 items-center">
                <div class="flex cursor-default text-sm rounded-full">
                    <span class="sr-only">General user info</span>
                    <img class="h-16 w-16 object-cover object-top p-1 rounded-full" :src="getPhotoUrl"
                        alt="profile-avatar" />
                </div>
                <div class="flex flex-col">
                    <h1 class="text-slate-800 inline-flex items-center space-x-2 dark:text-white text-xl font-semibold">
                        <span>{{ currentUser?.full_name }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                            :class="[currentUser?.is_active ? 'text-green-500' : '']" class="h-5 w-5"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clip-rule="evenodd" />
                        </svg>
                    </h1>
                    <p class="text-slate-700 dark:text-slate-400 text-sm">Your personal account</p>
                </div>
            </div>
            <div class="pl-20 md:pl-0">
                <button  type="button" @click="$router.back()" class="text-slate-800 dark:text-sky-50 bg-white hover:bg-slate-50 ring-1 ring-slate-700/20 hover:ring-slate-700/20 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-lg text-sm">
                    <span>Cancel</span>
                </button>
            </div>
        </section>


        <!-- Section 1-->
        <section class="grid gap-y-4 h-auto xl:gap-4 grid-cols-1 xl:grid-cols-4">
            <div
                class="hidden xl:block bg-white h-max sm:max-w-md space-y-2 dark:bg-dark-blue shadow-lg shadow-slate-200 dark:shadow-slate-900 ring-1 dark:ring-slate-700/50 ring-slate-700/10 rounded overflow-hidden col-span-1">
                <img src="https://i.pinimg.com/564x/fd/14/90/fd1490eb21c52945cdce747251d3700c.jpg" alt="left-image">
            </div>

            <div
                class="bg-white relative overflow-hidden dark:bg-dark-blue shadow-lg shadow-slate-200 dark:shadow-slate-900 ring-1 dark:ring-slate-700/50 ring-slate-700/10 rounded p-4 col-span-3 flex flex-col">
                <Svg3 aria-hidden="true" class="absolute right-[-6.5rem] bottom-24 rotate-90" />

                <!-- Header of Details tab -->
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-500" aria-hidden="true"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                        </span>
                        <span> Class room </span>
                    </p>
                    <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Details of your class room</p>
                </div>

                <!-- Content of tabs 1 -->
                <div class="with-transition w-full grid grid-cols-1 md:grid-cols-6 md:gap-4 py-6 px-2">
                    <!-- Room Data -->
                    <form @submit.prevent="addMember" class="md:col-span-4 mt-4 md:mt-0 w-full max-w-lg space-y-5">
                        <div>
                            <label for="email-invitation" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Invitation</label>
                            <div class="mt-1 relative rounded-md shadow-sm">
                                <input type="email" required autocomplete="off" id="email-invitation" v-model="state.emailInvitations"
                                    class="focus:ring-sky-500 dark:bg-slate-900 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md"
                                    placeholder="Email" />
                            </div>
                            <p class="text-xs mt-2 dark:text-slate-400">Invitation email is an active user email registered as a Digital Al-Quran user.</p>
                        </div>

                        <button type="submit" :disabled="!isValidEmail" class="mt-6 disabled:bg-opacity-50 float-right inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                            <span>Send invitation</span>
                        </button>
                    </form>

                    <!-- Profile Picture -->
                    <div class="col-span-2 w-full hidden md:block text-slate-800 row-start-1 md:row-span-2 dark:text-slate-100">
                        <img src="/code.svg" alt="ilustrations">
                    </div>
                </div>
                <div>
                    <div class="pb-2">
                        <p class="text-xl dark:text-white inline-flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>Data classroom</span>
                        </p>
                        <div class="border-t dark:border-slate-700/50 mt-2 py-2">
                            <p class="text-sm text-slate-700 dark:text-slate-300">This is the provider that is used for you to log in to the application and also what accounts are connected.</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-4 text-sm dark:text-white">
                        <div class="border border-slate-700/20 dark:border-slate-700/50 rounded-lg py-1 px-2 flex items-center">
                            <div  class="inline-flex items-center space-x-2">
                                <img alt="firebase" src="/firebase.png" width="28" height="28" />
                                <p class="text-color-dark-gray-darker dark:text-color-gray-light uppercase font-semibold"> {{ 'Firebase' }} </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

        </section>

        <ScrollToTop @on-back="scrollToPageUp" />

    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { useClassRoom, useUser } from '@/services';
import { storeToRefs } from 'pinia';
import { Room } from '@/types/room.interface';
import Svg3 from '@/components/svg/Svg3.vue';
import { validateEmail } from '@/utils/helperFunction';

const route = useRoute();
const roomService = useClassRoom();
const userService = useUser();

const { currentUser, getPhotoUrl } = storeToRefs(userService);

const state = reactive({
    isLogin: computed(() => localStorage.getItem('_uid')),
    emailInvitations: ''
});

onMounted(async () => {
    roomService.getRoom(route.query.id as Room['id']);
})

const addMember = () => {
    if(isValidEmail.value)
        roomService
            .addRoomMember(route.params.room_id as string, state.emailInvitations);
}

const isValidEmail = computed(()=>validateEmail(state.emailInvitations.trim()))

const pageUp = ref<any>(null)
const scrollToPageUp = () => {
    if (pageUp != null)
        pageUp.value.scrollIntoView({ behavior: 'smooth' });
}

</script>