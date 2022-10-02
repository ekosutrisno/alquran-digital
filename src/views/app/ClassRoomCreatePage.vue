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
                    <FormClassRoom :room="state.room" @send="saveRoom" />

                    <!-- Profile Picture -->
                    <div
                        class="col-span-2 w-full hidden md:block text-slate-800 row-start-1 md:row-span-2 dark:text-slate-100">
                        <p>Banner Preview</p>
                    </div>

                </div>

            </div>

        </section>

        <ScrollToTop @on-back="scrollToPageUp" />

    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { useClassRoom, useUser } from '@/services';
import { storeToRefs } from 'pinia';
import { Room } from '@/types/room.interface';
import FormClassRoom from '@/components/app/FormClassRoom.vue';
import Svg3 from '@/components/svg/Svg3.vue';

const route = useRoute();
const router = useRouter();
const roomService = useClassRoom();
const userService = useUser();

const { room } = storeToRefs(roomService);

const { currentUser, getPhotoUrl } = storeToRefs(userService);

const state = reactive({
    isLogin: computed(() => localStorage.getItem('_uid')),
    room: route.query.a == 'edit' && room.value
        ? room.value
        : {} as Room
});

onMounted(async () => {
    roomService.getRoom(route.query.id as Room['id']);
})

const saveRoom = () => {
    if(route.query.a == 'create')
        roomService.addRoom(state.room)
            .then(() => {
                state.room = {} as Room
                router.push(`/app/dashboard/class-room`)
        });
    else {
        roomService.editRoom(state.room)
            .then();
    }
}

const pageUp = ref<any>(null)
const scrollToPageUp = () => {
    if (pageUp != null)
        pageUp.value.scrollIntoView({ behavior: 'smooth' });
}

</script>