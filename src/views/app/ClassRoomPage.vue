<template>
    <div ref="pageUp" class="absolute -top-20"></div>

    <div class="wrapper md:p-4 space-y-6">
        <!-- Section 1 -->
        <section class="grid lg:grid-cols-2">
            <div class="bg-white card-shadow-md dark:bg-dark-blue ring-1 dark:ring-slate-700/50 ring-slate-700/10 rounded p-4 flex flex-col">
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                            </svg>
                        </span>
                       <span >Class Room</span> 
                    </p>
                    <p class="text-sm hidden md:block text-slate-500 dark:text-slate-50">Semua kelasmu ada di sini</p>
                </div>
                <div class="pt-4">
                    <p class="text-white rounded bg-sky-500 w-max py-1 px-2 mb-2 text-sm">Info</p>
                    <p class="text-slate-600 dark:text-slate-100">Halaman ini berisi semua kelas yang kamu buat atau pun ikuti, kamu dapat menambahkan anggota baru yang sudah terdaftar sebagai User di Al-quran Digital</p>

                    <button type="button" @click="$router.back()" class="mt-8 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 w-max">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        <span class="ml-2">Back</span>
                    </button>
                </div>
            </div>
        </section>

        <!-- Section 2 -->
        <section>
            <div class="w-full flex items-center justify-between border-b border-slate-700/20 dark:border-slate-700/75 pb-2 px-1">
                <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </span>
                    <span>Your Class</span> 
                </p>
                <div class="md:inline-flex hidden items-center space-x-2">
                    <p class="text-sm text-slate-500 dark:text-slate-50">List semua kelasmu ada disini.</p>
                </div>
            </div>

            <div class="w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 pt-6 pb-2 dark:bg-slate-900/50 bg-white/30">
             <CardClassRoom v-for="room in rooms" :key="room.id" :room="room"/>
                <router-link to="/app/dashboard/class-room/detail?a=create">
                    <div class="w-full h-full flex flex-col group items-center justify-center p-4 space-y-4 hover:border-sky-500 dark:hover:border-sky-500 transition bg-white dark:bg-dark-blue border-2 border-dashed border-slate-700/10 card-shadow-sm min-h-[14rem] rounded dark:border-slate-700/50">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-slate-300 group-hover:text-sky-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                </router-link>
                <div v-if="isLoading" class="flex items-center justify-center">
                    <Loader />
                </div>
            </div>

            <div v-if="!isLoading && state.isLogin" class="hidden items-center my-4 justify-center">
                <button @click="onLanjutBacaan" class="py-2 px-3 inline-flex items-center space-x-2 transition rounded-lg bg-sky-500 hover:bg-sky-600 text-white focus:outline-none"><span>Selanjutnya</span> <span><svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg></span> 
                </button>
            </div>

           <div v-if="!state.isLogin" class="mx-auto w-full max-w-xs">
                <router-link to="/auth/login">
                    <div class="transition-shadow relative h-20 duration-300 flex overflow-hidden flex-col bg-white rounded-md hover:card-shadow-md">
                        <div class="max-h-72 w-full overflow-hidden absolute inset-0 bg-gradient-to-tr from-sky-400/90 via-sky-500 to-sky-400/90"></div>
                        <div class="h-16 absolute z-10 sm:h-full max-h-72 w-full overflow-hidden py-2 px-3 md:p-5">
                            <span class="font-semibold text-white">Fitur Non Aktif</span> 
                            <p class="text-xs text-gray-100">Fitur akan aktif setelah Login, click untuk login.</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8 text-sky-100 z-10 absolute right-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        <div class="bg-gray-900 absolute inset-0 z-0 bg-opacity-30"></div>
                    </div>
                </router-link>
            </div>

            <div class="rounded-md border-r-4 px-4 border-sky-400 mx-auto max-w-md text-xs sm:text-sm text-center bg-white dark:bg-dark-blue dark:text-slate-100 mt-10 card-shadow-md ring-1 ring-slate-700/10 dark:ring-slate-700/50 h-full p-2">
                <p class="flex items-center flex-wrap space-x-2">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                    </span>
                    <span>Tambahkan kelas kamu disini, dan mulai mengajar.</span>
                </p>
            </div>
        </section>
        <ScrollToTop @on-back="scrollToPageUp"/>

    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { onClickOutside } from '@vueuse/core';
import ScrollToTop from '@/components/ScrollToTop.vue';
import CardClassRoom from '@/components/app/card/CardClassRoom.vue';
import { useClassRoom, useUser } from '@/services';
import { storeToRefs } from 'pinia';
import Loader from '@/components/Loader.vue';

const router = useRouter();
const roomService = useClassRoom();
const userService = useUser();
const { isLast, isPush, isLoading, rooms} = storeToRefs(roomService);

const state = reactive({
    isLogin: computed(()=> localStorage.getItem('_uid')),
    option: false,
});

onMounted(()=>{ 
    roomService.getRooms(userService.currentUser?.rooms as string[])
})

const pageUp = ref<any>(null)
const scrollToPageUp = () => {
    if(pageUp != null)
        pageUp.value.scrollIntoView({behavior: 'smooth'});
}


const target = ref(null)
onClickOutside(target, (event) => hideMenuOption())

const hideMenuOption = () => {
    state.option = !state.option
}

const onLanjutBacaan = ()=>{
    router.push({
        path: '/app/dashboard/class-room/',
        params:{
            act: 'next'
        } 
})
}
</script>