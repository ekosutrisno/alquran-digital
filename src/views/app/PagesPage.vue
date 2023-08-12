<template>
    <div ref="pageUp" class="absolute -top-20"></div>
    <div class="wrapper md:p-4 space-y-6">
        <!-- Section 1 -->
        <section class="grid lg:grid-cols-2">
            <div class="bg-white card-shadow-md dark:bg-dark-blue ring-1 dark:ring-slate-700 ring-slate-700/10 rounded-lg p-4 flex flex-col">
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <WidgetPlusIcon />
                        <span>Halaman</span> 
                    </p>
                    <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Terdapat total <span class="text-sky-500 font-semibold">604</span> halaman</p>
                </div>
                <div class="pt-4">
                    <p class="text-white rounded bg-sky-500 w-max py-1 px-2 mb-2 text-sm">Info</p>
                    <p class="text-slate-700 dark:text-slate-100">Halaman ini berisi metadata semua page, dengan informasi nomor halaman, letak surah, dan nomor ayah.</p>
                    <button type="button" @click="$router.push({name: 'AppDashboard'})" class="mt-8 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 w-max">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        <span class="ml-2">Kembali</span>
                    </button>
                </div>
            </div>
        </section>

        <!-- Section 2 -->
        <section>
            <div class="w-full flex items-center justify-between border-b border-slate-700/20 dark:border-slate-700/75 pb-2 px-1">
                <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                    <WidgetIcon/>
                    <span>Semua Halaman</span> 
                </p>
                <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Kamu dapat mencari semua metadata halaman disini</p>
            </div>

            <div class="flex items-center justify-center mt-6 w-full mx-auto">
                <div class="w-full flex flex-col justify-center">
                    <input
                        type="text"
                        v-model="searchQuery"
                        placeholder="Type the page number"
                        class="bg-white dark:bg-slate-800 dark:text-white card-shadow-sm rounded-md w-full max-w-lg mx-auto appearance-none focus:ring-sky-500 border-slate-700/20 dark:border-slate-700/50"
                    >

                    <div v-if="isLoading" class="flex items-center justify-center">
                        <Loader />
                    </div>                    
                                
                    <div v-if="!filteredPage(searchQuery).length" class="w-full py-5 h-auto flex flex-col items-center justify-center with-transition mt-5 dark:text-white max-w-lg mx-auto">
                        <NoNotificationIcon />
                        <p class="mx-auto text-sm py-5">No Result data found!</p>
                    </div>
                </div>
            </div>
            <div class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4 pt-6 pb-2">
                <CardPageMetadata 
                    v-for="page in filteredPage(searchQuery)" 
                    :key="page.page"
                    :page="page"
                />
            </div>
            <div v-if="isPush" class="max-w-7xl text-center mx-auto">
                <Loader />
            </div>
             <div v-if="!isLast && !isLoading && !isPush && filteredPage(searchQuery).length" class="flex items-center my-4 justify-center">
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
import { usePage } from '@/services';
import { onMounted, ref } from 'vue';
import CardPageMetadata from '@/components/app/card/CardPageMetadata.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { storeToRefs } from 'pinia';
import Loader from '@/components/Loader.vue';
import NoNotificationIcon from '@/components/svg/NoNotificationIcon.vue';
import WidgetPlusIcon from '@/components/svg/WidgetPlusIcon.vue';
import WidgetIcon from '@/components/svg/WidgetIcon.vue';

const pageService = usePage();
const { pages, lastPageVisible, isLast, isLoading, isPush, filteredPage } = storeToRefs(pageService);

onMounted(()=> {
    if(!pages.value.length)
        pageService.getPageMetadata();
});

const searchQuery = ref('');

const pageUp = ref<HTMLDivElement | undefined>();
const scrollToPageUp = () => {
    if (pageUp)
        pageUp.value?.scrollIntoView({behavior: 'smooth'});
}

const nextPage = ()=>{
    pageService.nextPage({lastVisible: lastPageVisible.value as any});
}

</script>