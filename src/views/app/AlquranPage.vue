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
                        <span> {{state.currentSurah?.surat_name}} ({{state.currentSurah?.surat_english_name}})</span> 
                    </p>
                    <p class="text-sm hidden md:block text-slate-500 dark:text-slate-50">Terdapat total <span class="text-sky-500 font-semibold"> {{state.currentSurah?.count_ayat}} / {{convertToArab(`${state.currentSurah?.count_ayat}`)}} </span> Ayah</p>
                </div>
                <div class="pt-4">
                    <p class="text-white rounded bg-sky-500 w-max py-1 px-2 mb-2 text-sm"> {{ state.currentSurah?.surat_golongan }} ({{ state.currentSurah?.revelation_type }}) </p>
                    <p class="text-slate-600 font-quran text-2xl md:text-5xl text-right dark:text-slate-100"> 
                        <span class="text-sm block md:inline md:text-xl font-quicksand">{{ state.currentSurah?.surat_terjemahan }} 
                            <span class="text-xs md:text-sm">({{state.currentSurah?.surat_english_terjemahan}})</span>
                        </span>
                        <span class="text-lg md:text-3xl font-light"> ({{state.currentSurah?.surat_text_full}})</span> {{state.currentSurah?.surat_text}}
                    </p>
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
                    <span>Ayahs</span> 
                </p>
                <div class="md:inline-flex hidden items-center space-x-2">
                    <button @click="hideMenuOption" type="button" class="text-slate-500 relative group hover:bg-sky-500 rounded p-0.5 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <div v-if="state.option" ref="target" class="absolute overflow-hidden bottom-[-5rem] w-36 card-shadow-md rounded right-8 bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700/50">
                            <button type="button" @click="selectSize(size)" v-for="size in state.sizes" :key="size.id" class="py-1 px-3 grid grid-cols-4 w-full gap-1 relative hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white">
                                <div class="col-span-1">{{ size.size }}</div> <div class="text-sm col-span-3 text-left">({{ size.text}})</div>
                            </button>
                        </div>
                    </button>
                    <p class="text-white font-medium py-0.5 px-2 rounded bg-sky-500">{{ state.sizeSelected.size }}</p>
                    <p class="text-sm text-slate-500 dark:text-slate-50">Kamu dapat mencari semua metadata Ayah disini</p>
                </div>
            </div>
            
            <div class="mt-8 mx-auto select-none">
                <div class="font-quran text-center mb-4 text-sm font-semibold dark:text-slate-400"><span class="text-sm font-normal">({{state.currentSurah?.surat_golongan}})</span> | {{state.currentSurah?.surat_text_full}} </div>
                <div class="font-quran text-center mb-2 text-xl font-semibold dark:text-slate-300">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
                <p class="text-center text-sm text-gray-600 dark:text-slate-300">Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.</p>
            </div>

            <div v-if="state.isLoading" class="flex items-center justify-center">
                <Spinner />
            </div>

            <div :class="[state.sizeSelected.class]" class="w-full mx-auto grid gap-4 pt-6 pb-2 dark:bg-slate-900/50 bg-white/30">
               <CardAyahMetadata
                    v-for="ayah in state.ayahs"
                    :key="ayah.aya_id"
                    :ayat="ayah"
               />
            </div>

            <div v-if="state.isPush" class="max-w-7xl text-center mx-auto">
                <Loader />
            </div>

            <div v-if="$route.query.sajda != 'true' && !state.isLoading && !state.isPush && !isLast" class="flex items-center my-4 justify-center">
                <button @click="loadNextAyah" class="py-2 px-3 inline-flex items-center space-x-2 transition rounded-lg bg-sky-500 hover:bg-sky-600 text-white focus:outline-none"><span>Selanjutnya</span> <span><svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg></span> 
                </button>
            </div>
        </section>
        <ScrollToTop @on-back="scrollToPageUp"/>

    </div>
</template>

<script setup lang="ts">
import { useAyah, useSurah, useUtil } from '@/services';
import { computed, onMounted, reactive, ref } from 'vue';
import Spinner from '@/components/Spinner.vue';
import { useRoute } from 'vue-router';
import { SurahData } from '@/types/alquran.interface';
import { convertToArab } from '@/utils/helperFunction';
import CardAyahMetadata from '@/components/app/card/CardAyahMetadata.vue';
import Loader from '@/components/Loader.vue';
import { onClickOutside } from '@vueuse/core';
import ScrollToTop from '@/components/ScrollToTop.vue';

const surahService = useSurah();
const ayahService = useAyah();
const utilService = useUtil();
const route = useRoute();

interface RouteQuery {
    surah_number: any;
    is_surah: boolean;
    sn: any;
    an: any;
    next_bacaan: boolean;
    sajda: boolean;
}

const routeQuery: RouteQuery = {
   surah_number: route.query.surah_number,
   is_surah: route.query.is_surah === 'true' ? true : false,
   sn: route.query.sn,
   an: route.query.an,
   next_bacaan: route.query.next_bacaan === 'true' ? true : false,
   sajda: route.query.sajda === 'true' ? true : false
};

const state = reactive({
    currentSurah: computed(() => surahService.surah),
    isLoading: computed(() => surahService.isLoading),
    ayahs: computed(() => surahService.ayahs),
    isPush: computed(() => surahService.isPush),
    surah: computed(() => surahService.surah),
    option: false,
    sizeSelected: localStorage.getItem('_a_size') != null
        ? JSON.parse(localStorage.getItem('_a_size') as string)
        : {
            id: 1,
            size: 'MD',
            text: 'Medium',
            class: 'max-w-screen-lg'
        },
    sizes: [
        {
            id: 1,
            size: 'MD',
            text: 'Medium',
            class: 'max-w-screen-lg'
        },
        {
            id: 2,
            size: 'LG',
            text: 'Large',
            class: 'max-w-screen-xl'
        },
        {
            id: 3,
            size: 'XL',
            text: 'Extra Large',
            class: 'w-full'
        }
    ]
});

onMounted(()=> loadData());

const loadData = ()=>{
    surahService
        .setSurah(routeQuery.surah_number  as SurahData['id'],
            { 
                is_surah: routeQuery.is_surah, 
                meta: {
                    next_bacaan: routeQuery.next_bacaan,
                    sajda: routeQuery.sajda,
                    sn: routeQuery.sn,
                    an: routeQuery.an
                }
            })
        .then(()=> ayahService.onGetFavorit());
}


const loadNextAyah  = () => {
    routeQuery?.is_surah 
        ? surahService.nextAyahSurahOfSurah(routeQuery.surah_number as SurahData['id'] ) 
        : surahService.nextAyahSurahOfSurahDetail()
}

const pageUp = ref<any>(null)
const scrollToPageUp = () => {
    if(pageUp != null)
        pageUp.value.scrollIntoView({behavior: 'smooth'});
}

const isLast = computed(()=>{
    const ayatsSize = computed(()=> state.ayahs.length);

    return ayatsSize.value === state.surah?.count_ayat ? true : false;
})

const target = ref(null)
onClickOutside(target, (event) => hideMenuOption())

const hideMenuOption = () => {
    state.option = !state.option
}

const selectSize = (size: any)=> {
    utilService.setAlquranSize(size); 
    state.sizeSelected  = size;
}

</script>