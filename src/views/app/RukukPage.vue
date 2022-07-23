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
                        <span>Rukuk</span> 
                    </p>
                    <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Terdapat total <span class="text-sky-500 font-semibold">556</span> Rukuk</p>
                </div>
                <div class="pt-4">
                    <p class="text-white rounded bg-sky-500 w-min py-1 px-2 mb-2 text-sm">Info</p>
                    <p class="text-slate-700 dark:text-slate-100">Halaman ini berisi metadata semua rukuk, dengan informasi nomor halaman, letak surah, dan nomor ayah.</p>
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
                    <span>All Rukuk</span> 
                </p>
                <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Kamu dapat mencari semua metadata Rukuk disini</p>
            </div>

            <div class="flex items-center justify-center mt-6 w-full mx-auto">
                <div class="w-full flex flex-col justify-center">
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Type the rukuk number"
                        class="bg-white dark:bg-slate-800 dark:text-white card-shadow-sm rounded-md w-full max-w-lg mx-auto appearance-none focus:ring-sky-500 border-slate-700/20 dark:border-slate-700/50"
                    >

                     <div v-if="isLoading" class="flex items-center justify-center">
                        <Loader />
                    </div>

                    <div v-if="!filteredRukuk(searchQuery).length" class="w-full with-transition ring-1 ring-slate-700/10 rounded-md dark:ring-slate-700/50 dark:text-white max-w-xs mx-auto card-shadow-sm flex items-center justify-center h-20 bg-white dark:bg-slate-800">
                        <p class="mx-auto">No Result data found!</p>
                    </div>
                </div>
            </div>
            <div class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4 pt-6 pb-2">
                <CardRukukMetadata 
                    v-for="rukukData in filteredRukuk(searchQuery)" 
                    :key="rukukData.number"
                    :rukuk="rukukData"
                />
            </div>

            <div v-if="isPush" class="max-w-7xl text-center mx-auto">
                <Loader />
            </div>
            
             <div v-if="!isLast && !isLoading && !isPush" class="flex items-center my-4 justify-center">
                <button @click="nextPage" class="py-2 px-3 inline-flex items-center space-x-2 transition rounded-lg bg-sky-500 hover:bg-sky-600 text-white focus:outline-none"><span>Selanjutnya</span> <span><svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg></span> 
                </button>
            </div>
        </section>
        <ScrollToTop @on-back="scrollToPageUp"/>
    </div>
</template>

<script setup lang="ts">
import { useRukuk } from '@/services';
import { onMounted, ref } from 'vue';
import CardRukukMetadata from '@/components/app/card/CardRukukMetadata.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { storeToRefs } from 'pinia';
import Loader from '@/components/Loader.vue';

const rukukService = useRukuk();
const { rukuk, lastRukukVisible, isLast, isLoading, isPush, filteredRukuk } = storeToRefs(rukukService);

onMounted(()=> {
    if(!rukuk.value.length)
        rukukService.getRukukMetadata();
});

const searchQuery = ref('')

const pageUp = ref<any>(null)
const scrollToPageUp = () => {
    if(pageUp != null)
        pageUp.value.scrollIntoView({behavior: 'smooth'});
}

const nextPage = ()=>{
    rukukService.nextPage({lastVisible: lastRukukVisible.value as any});
}

</script>