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
                        <span>Surah Pilihan</span> 
                    </p>
                    <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Terdapat total <span class="text-sky-500 font-semibold">114</span> Surah</p>
                </div>
                <div class="pt-4">
                    <p class="text-white rounded bg-sky-500 w-max py-1 px-2 mb-2 text-sm">Info</p>
                    <p class="text-slate-600 dark:text-slate-100">Halaman ini berisi metadata semua surah <span class="font-semibold">pilihan</span>, dengan informasi nama surah, terjemahan Indonesia, jenis surah Makkiyyah atau Madaniyyah, dll.</p>
                </div>
                <button type="button" @click="$router.back()" class="inline-flex justify-center mt-8 py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 w-max">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <span class="ml-2">Back</span>
                </button>
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
                    <span>All Surah</span> 
                </p>
                <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Kamu dapat mencari semua metadata surah disini</p>
            </div>

             <div v-if="isLoading" class="flex my-4 items-center justify-center">
                <Loader />
            </div>

            <div class="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 pt-6 pb-2">
                <CardSurahMetadata 
                    v-for="surah in surahPilihan" 
                    :key="surah.id"
                    :surah="surah"
                />
            </div>
        </section>

        <CardNotLogin v-if="!isLogin"/>

        <div class="rounded-md border-r-4 px-4 border-sky-400 mx-auto max-w-md text-xs sm:text-sm text-center bg-white dark:bg-dark-blue dark:text-slate-100 mt-10 card-shadow-md ring-1 ring-slate-700/10 dark:ring-slate-700/50 max-h-16 h-full p-2">
            <p class="inline-flex items-center space-x-2">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                </span>
                <span>Kamu dapat menyimpan surah pilihan disini.</span>
            </p>
        </div>
        <ScrollToTop @on-back="scrollToPageUp"/>
    </div>
</template>

<script setup lang="ts">
import { useAyah } from '@/services';
import { onMounted, ref } from 'vue';
import CardSurahMetadata from '@/components/app/card/CardSurahMetadata.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { storeToRefs } from 'pinia';
import CardNotLogin from '../../components/app/card/CardNotLogin.vue';
import Loader from '@/components/Loader.vue';

const ayahService = useAyah();
const { surahPilihan, isLoading} = storeToRefs(ayahService);
const isLogin = ref(localStorage.getItem("_uid") as string);

onMounted(()=> {
    if(!surahPilihan.value.length)
        ayahService.onGetSurahPilihan();
    }
);

const pageUp = ref<any>(null)
const scrollToPageUp = () => {
    if(pageUp != null)
        pageUp.value.scrollIntoView({behavior: 'smooth'});
}
</script>