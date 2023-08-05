<template>
    <div class="wrapper md:p-4 space-y-6">
        <!-- Section 1-->
        <section class="grid gap-y-4 xl:gap-4 grid-cols-1 xl:grid-cols-4">
            <div class="bg-white row-start-2 xl:row-start-1 dark:bg-dark-blue shadow-lg shadow-slate-200 dark:shadow-slate-900 ring-1 dark:ring-slate-700/50 ring-slate-700/10 rounded p-4 col-span-3 flex flex-col">
                <div class="flex items-center justify-between">
                    <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                        <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 lg:text-xl">
                            <WidgetPlusIcon />
                            <span>Hi <span class="text-gradien">{{ getFirstName(getLoginAsInfo.fullName as string) }}</span>, {{ dayGreeting() }}</span>
                        </p>
                        <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Menu yang sering digunakan</p>
                    </div>
                    <svg fill="none" aria-hidden="true" @click="onSearch(true)" class="flex-none sm:hidden dark:text-white w-8 h-8">
                        <path d="m19 19-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                    </svg>
                </div>
                <div class="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 pt-6 sm:px-2">
                    <QuickMenu 
                        v-for="menu in quickMenu" 
                        :key="menu.id"
                        :menu="menu"
                    />
                </div>
            </div>
            <div class="bg-white sm:max-w-md dark:bg-dark-blue overflow-hidden shadow-lg shadow-slate-200 dark:shadow-slate-900 ring-1 dark:ring-slate-700/50 ring-slate-700/10 rounded p-4 col-span-1 h-min">
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <ChartIcon />
                        <span>Statistik</span> 
                    </p>
                </div>

                <div v-if="isLogedIn">
                    <div v-if="currentUser?.bacaanku" class="grid grid-cols-2 relative w-auto">
                        <div class="p-2">
                            <div>
                                <span class="text-sm text-slate-700 dark:text-slate-100">Juz</span>
                                <h1 class="text-6xl font-semibold text-gradien"> {{currentUser?.bacaanku?.juz_id}}</h1>
                            </div>
                            <div>
                                <span class="text-sm text-slate-700 dark:text-slate-100">Surah</span>
                                <h1 class="md:text-lg font-semibold dark:text-white">{{getSurahNameBacaan}}</h1>
                            </div>
                        </div>
                        <div>
                            <div class="grid grid-cols-2">
                                <div>
                                    <span class="text-sm text-slate-700 dark:text-slate-100">Manzil</span>
                                    <h1 class="text-2xl font-semibold dark:text-white">{{currentUser?.bacaanku?.manzil}}</h1>
                                </div>
                                <div>
                                    <span class="text-sm text-slate-700 dark:text-slate-100">Ayat</span>
                                    <h1 class="text-2xl font-semibold dark:text-white">{{currentUser?.bacaanku?.aya_number}}</h1>
                                </div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div>
                                    <span class="text-sm text-slate-700 dark:text-slate-100">Halaman</span>
                                    <h1 class="text-xl font-semibold dark:text-white">{{currentUser?.bacaanku?.page_number}}</h1>
                                </div>
                                <div>
                                    <span class="text-sm text-slate-700 dark:text-slate-100">Rukuk</span>
                                    <h1 class="text-xl font-semibold dark:text-white">{{currentUser?.bacaanku?.rukuk}}</h1>
                                </div>
                            </div>

                            <button type="button" @click="onLanjutBacaan" class="mt-4 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                <span class="mr-2">Lanjut</span>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                        <Svg3 aria-hidden="true" class="absolute -right-32 bottom-[85px] sm:bottom-1.5 xl:bottom-20 rotate-90"/>
                    </div>
                    <div v-else class="mx-auto w-full my-6 with-transition">
                        <router-link to="/app/dashboard/surah">
                            <div class="transition-shadow z-0 relative h-32 duration-300 flex overflow-hidden flex-col bg-white rounded-md hover:card-shadow-md">
                                <div class="max-h-72 w-full overflow-hidden absolute inset-0 bg-gradient-to-tr from-pink-300/90 via-purple-400 to-indigo-400/90"></div>
                                <div class="h-16 z-10 sm:h-full max-h-72 w-full overflow-hidden py-2 px-3 md:p-5">
                                    <span class="font-semibold text-white">Upss... Ayo mulai progresmu</span> 
                                    <p class="text-xs text-gray-100">Kamu bisa memulai bacaan dari sini, click untuk mencari surah.</p>
                                </div>
                                <svg aria-hidden="true" class="h-8 w-8 text-sky-100 z-50 absolute right-5 bottom-5" viewBox="0 0 2048 2048">
                                    <path fill="currentColor" d="M384 1536h128v128H256V384H128v1408h384v128H0V256h256V128h384q88 0 169 27t151 81q69-54 150-81t170-27h384v128h256v819l-128-58V384h-128v575l-128-59V256h-256q-71 0-136 24t-120 71v608l-128 58V351q-54-46-119-70t-137-25H384v1280zm1408 255l-448 225l-448-225q0-36 1-76t8-81t20-77t36-67l-193-88v582H640v-640l704-320l704 320l-321 146l8 11q21 31 32 67t17 73t7 76t1 74zm-448-627l-395 180l395 180l395-180l-395-180zm0 709l320-161q-1-26-4-47t-11-41t-16-39t-23-42l-266 121l-266-121q-15 24-24 43t-16 38t-9 40t-4 49l319 160z" />
                                </svg>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div v-else class="mx-auto w-full my-6 with-transition">
                    <router-link to="/auth/login">
                        <div class="transition-shadow z-0 relative h-32 duration-300 flex overflow-hidden flex-col bg-white rounded-md hover:card-shadow-md">
                            <div class="max-h-72 w-full overflow-hidden absolute inset-0 bg-gradient-to-tr from-purple-400/90 via-indigo-400 to-blue-400/90"></div>
                            <div class="h-16 z-10 sm:h-full max-h-72 w-full overflow-hidden py-2 px-3 md:p-5">
                                <span class="font-semibold text-white">Fitur Non Aktif</span> 
                                <p class="text-xs text-gray-100">Fitur akan aktif setelah Login, click untuk login.</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8 text-sky-100 z-50 absolute right-5 bottom-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                       </div>
                    </router-link>
                </div>
            </div>
        </section>

        <!-- Section 2-->
        <section>
            <div class="w-full flex items-center justify-between border-b border-slate-700/20 dark:border-slate-700/75 pb-2 px-1">
                <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                    <WidgetIcon />
                    <span>Semua Menu</span> 
                </p>
                <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Semua fitur metadata</p>
            </div>

            <div class="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 pt-6 pb-2">
                <MainMenu 
                    v-for="menu in mainMenu" 
                    :key="menu.id"
                    :menu="menu"
                />
            </div>
        </section>
        <ModalSearch :open="isSearch" @close-modal="onSearch"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayGreeting } from '@/utils/helperFunction';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUser } from '@/services';
import ModalSearch from '@/components/shared/ModalSearch.vue';
import QuickMenu from '@/components/app/QuickMenu.vue';
import Svg3 from '@/components/svg/Svg3.vue';
import MainMenu from '@/components/app/MainMenu.vue';
import { mainMenu, quickMenu } from '@/assets/data/data-menu';
import ChartIcon from '@/components/svg/ChartIcon.vue';
import WidgetPlusIcon from '@/components/svg/WidgetPlusIcon.vue';
import WidgetIcon from '@/components/svg/WidgetIcon.vue';

const userService = useUser();
const router = useRouter();

const { currentUser, getSurahNameBacaan, getLoginAsInfo }  = storeToRefs(userService);
const isSearch = ref(false);
const isLogedIn = ref(localStorage.getItem('_uid'));

const onLanjutBacaan = ()=>{
    router.push({
        path: '/app/dashboard/alquran', 
        query:{ 
            sn: currentUser.value?.bacaanku?.sura_id, 
            an: currentUser.value?.bacaanku?.aya_number, 
            next_bacaan: 'true'}
        })
}

const onSearch = (flag: boolean)=>{
    isSearch.value = flag;
}

const getFirstName = (fullName: string) =>{
    return fullName ?  fullName.split(" ")[0] : 'Santri';
}
</script>