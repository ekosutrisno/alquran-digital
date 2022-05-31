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
                    <p class="text-sm hidden md:block text-slate-500 dark:text-slate-50">Terdapat total <span class="text-sky-500 font-semibold">556</span> Rukuk</p>
                </div>
                <div class="pt-4">
                    <p class="text-white rounded bg-sky-500 w-min px-2 mb-2 text-sm">Info</p>
                    <p class="text-slate-600 dark:text-slate-100">Halaman ini berisi metadata semua rukuk, dengan informasi nomor halaman, letak surah, dan nomor ayah.</p>
                    <button type="button" @click="$router.back()" class="mt-8 inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 w-max">
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
                <p class="text-sm hidden md:block text-slate-500 dark:text-slate-50">Kamu dapat mencari semua metadata Rukuk disini</p>
            </div>

            <div class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pt-6 pb-2">
                <CardRukukMetadata 
                    v-for="rukuk in state.pageMetadata" 
                    :key="rukuk.number"
                    :rukuk="rukuk"
                />
            </div>
             <div v-if="!state.isLast" class="flex items-center my-4 justify-center">
                <button @click="nextPage" class="py-2 px-3 inline-flex items-center space-x-2 transition rounded-lg bg-sky-500 hover:bg-sky-600 text-white focus:outline-none"><span>Selanjutnya</span> <span><svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg></span> 
                </button>
            </div>
        </section>
        <div class="fixed group bottom-10 right-5 float-right hover:bg-slate-100 dark:hover:bg-slate-800 transition hover:ring-sky-400 dark:hover:ring-sky-400  bg-slate-50 dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700/50 shadow-xl p-2 rounded-full">
            <div class="inline-flex space-x-4">
                <button @click="scrollToPageUp" class="p-2 cursor-default md:cursor-pointer rounded-full focus:outline-none">
                    <svg class="w-5 text-slate-600 dark:text-sky-400 group-hover:animate-bounce group-hover:text-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRukuk } from '@/services';
import { computed, onMounted, reactive, ref } from 'vue';
import CardRukukMetadata from '@/components/app/card/CardRukukMetadata.vue';

const rukukService = useRukuk();
const state = reactive({
    pageMetadata: computed(() => rukukService.rukuk),
    lastVisible: computed(() => rukukService.lastRukukVisible),
    isLast: computed(()=> rukukService.isLast)
});

onMounted(()=> rukukService.getRukukMetadata());

const pageUp = ref<any>(null)
const scrollToPageUp = () => {
    if(pageUp != null)
        pageUp.value.scrollIntoView({behavior: 'smooth'});
}

const nextPage = ()=>{
    rukukService.nextPage({lastVisible: state.lastVisible});
}

</script>