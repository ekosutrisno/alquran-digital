<template>
    <div class="wrapper md:p-4 space-y-6">
        <!-- Section 1-->
        <section class="grid gap-y-4 xl:gap-4 grid-cols-1 xl:grid-cols-4">
            <div class="bg-white row-start-2 xl:row-start-1 dark:bg-dark-blue shadow-lg shadow-slate-200 dark:shadow-slate-900 ring-1 dark:ring-slate-700/50 ring-slate-700/10 rounded p-4 col-span-3 flex flex-col">
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <span>Quick Menu</span> 
                    </p>
                    <p class="text-sm hidden md:block text-slate-500 dark:text-slate-50">Menu yang sering digunakan</p>
                </div>
                <div class="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-6 px-2">
                    <QuickMenu 
                        v-for="menu in quickMenu" 
                        :key="menu.id"
                        :menu="menu"
                    />
                </div>
            </div>
            <div class="bg-white sm:max-w-md dark:bg-dark-blue overflow-hidden shadow-lg shadow-slate-200 dark:shadow-slate-900 ring-1 dark:ring-slate-700/50 ring-slate-700/10 rounded p-4 col-span-1">
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                        </span>
                        <span>My Progress</span> 
                    </p>
                </div>
                <div v-if="state.isLogedIn && state.bacaanku" class="grid grid-cols-2 relative w-auto">
                    <div class="p-2">
                        <div>
                            <span class="text-sm text-slate-400 dark:text-slate-100">Juz</span>
                            <h1 class="text-6xl font-semibold text-sky-500 dark:text-sky-400"> {{state.bacaanku?.juz_id}}</h1>
                        </div>
                        <div>
                            <span class="text-sm text-slate-400 dark:text-slate-100">Surah</span>
                            <h1 class="md:text-lg font-semibold dark:text-white">{{state.surahName}}</h1>
                        </div>
                    </div>
                    <div>
                        <div class="grid grid-cols-2">
                            <div>
                                <span class="text-sm text-slate-400 dark:text-slate-100">Manzil</span>
                                <h1 class="text-2xl font-semibold dark:text-white">{{state.bacaanku?.manzil}}</h1>
                            </div>
                            <div>
                                <span class="text-sm text-slate-400 dark:text-slate-100">Ayat</span>
                                <h1 class="text-2xl font-semibold dark:text-white">{{state.bacaanku?.aya_number}}</h1>
                            </div>
                        </div>
                        <div class="grid grid-cols-2">
                            <div>
                                <span class="text-sm text-slate-400 dark:text-slate-100">Halaman</span>
                                <h1 class="text-xl font-semibold dark:text-white">{{state.bacaanku?.page_number}}</h1>
                            </div>
                            <div>
                                <span class="text-sm text-slate-400 dark:text-slate-100">Rukuk</span>
                                <h1 class="text-xl font-semibold dark:text-white">{{state.bacaanku?.rukuk}}</h1>
                            </div>
                        </div>

                        <button type="button" @click="onLanjutBacaan" class="mt-4 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                            <span class="mr-2">Lanjut</span>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                    <Svg3 aria-hidden="true" class="absolute z-10 -right-32 bottom-[85px] sm:bottom-1.5 xl:bottom-20 rotate-90"/>
                </div>
                <div v-else class="mx-auto w-full my-6 with-transition">
                    <router-link to="/auth/login">
                        <div class="transition-shadow relative h-32 duration-300 flex overflow-hidden flex-col bg-white rounded-md hover:card-shadow-md">
                            <div class="max-h-72 w-full overflow-hidden absolute inset-0 bg-gradient-to-tr from-purple-200/90 via-indigo-400 to-purple-400/90"></div>
                            <div class="h-16 absolute z-30 sm:h-full max-h-72 w-full overflow-hidden py-2 px-3 md:p-5">
                                <span class="font-semibold text-white">Fitur Non Aktif</span> 
                                <p class="text-xs text-gray-100">Fitur akan aktif setelah Login, click untuk login.</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8 text-sky-100 z-50 absolute right-5 bottom-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                            <div class="bg-gray-900 absolute inset-0 z-20 bg-opacity-30"></div>
                        </div>
                    </router-link>
                </div>
            </div>
        </section>

        <!-- Section 2-->
        <section>
            <div class="w-full flex items-center justify-between border-b border-slate-700/20 dark:border-slate-700/75 pb-2 px-1">
                <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </span>
                    <span>All Menu</span> 
                </p>
                <p class="text-sm hidden md:block text-slate-500 dark:text-slate-50">Semua feature dan menu yang tersedia</p>
            </div>

            <div class="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-6 pb-2">
                <MainMenu 
                    v-for="menu in mainMenu" 
                    :key="menu.id"
                    :menu="menu"
                />
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import QuickMenu,{ QuickMenuType } from '@/components/app/QuickMenu.vue';
import Svg3 from '@/components/svg/Svg3.vue';
import MainMenu, { MainMenuType } from '@/components/app/MainMenu.vue';
import { useUser } from '@/services';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

const userService = useUser();
const router = useRouter();

const state = reactive({
    bacaanku: computed(()=> userService.currentUser?.bacaanku),
    surahName: computed(()=> userService.getSurahNameBacaan),
    isLogedIn: computed(()=> localStorage.getItem('_uid'))
})

const mainMenu: MainMenuType[] = [
    {
        id: '1',
        title: 'Surah',
        description: 'Mencari berdasarkan Surat yang disajikan secara terurut.',
        to: '/app/dashboard/surah',
        total: 114
    },
    {
        id: '2',
        title: 'Page',
        description: 'Mencari berdasarkan Page yang disajikan secara terurut.',
        to: '/app/dashboard/pages',
        total: 604
    },
    {
        id: '3',
        title: 'Manzil',
        description: 'Mencari berdasarkan Manzil yang disajikan secara terurut.',
        to: '/app/dashboard/manzil',
        total: 7
    },
    {
        id: '4',
        title: 'Rukuk',
        description: 'Mencari berdasarkan Rukuk yang disajikan secara terurut.',
        to: '/app/dashboard/rukuk',
        total: 556
    },
    {
        id: '5',
        title: 'Sajda',
        description: 'Mencari berdasarkan Sajda yang disajikan secara terurut.',
        to: '/app/dashboard/sajda',
        total: 15
    },
    {
        id: '6',
        title: 'Juz',
        description: 'Mencari berdasarkan Juz yang disajikan secara terurut.',
        to: '/app/dashboard/juz',
        total: 30
    },
]
const quickMenu: QuickMenuType[] = [
    {
        id: '1',
        title: 'Bacaanku',
        description: 'Menandai bacaan terakhir.',
        to: '/app/dashboard/bacaanku'
    },
    {
        id: '2',
        title: 'Favorit',
        description: 'Koleksi ayat-ayat favorit.',
        to: '/app/dashboard/favorite'
    },
    {
        id: '3',
        title: 'Surah Pilihan',
        description: 'Bacaan surah-surah pilihan.',
        to: '/app/dashboard/surah-pilihan'
    },
    {
        id: '4',
        title: 'Class Room',
        description: 'Ruang kelas hafalan Al-quran.',
        to: '/app/dashboard/about'
    },
]

const onLanjutBacaan = ()=>{
    router.push({
        path: '/app/dashboard/alquran', 
        query:{ 
            sn: state.bacaanku?.sura_id, 
            an: state.bacaanku?.aya_number, 
            next_bacaan: 'true'}
        })
}

</script>
