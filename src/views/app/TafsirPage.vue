<template>
    <div ref="pageUp" class="absolute -top-20"></div>

    <div class="wrapper md:p-4 space-y-6">
        <!-- Section 1 -->
        <section class="grid lg:grid-cols-2">
            <div class="bg-white card-shadow-md dark:bg-dark-blue ring-1 dark:ring-slate-700 ring-slate-700/10 rounded-lg p-4 flex flex-col">
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <span v-if="ayahTafsirSelected"> {{surahTafsirSelected?.surat_name}} ({{surahTafsirSelected?.surat_english_name}})</span> 
                        <span v-else>Tafsir</span> 
                    </p>
                    <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Terdapat total <span v-if="ayahTafsirSelected" class="text-sky-500 font-semibold"> {{surahTafsirSelected?.count_ayat}} / {{convertToArab(`${surahTafsirSelected?.count_ayat}`)}} </span> <span v-else class="text-sky-500 font-semibold"> 0 / {{convertToArab(`${0}`)}} </span> Ayah</p>
                </div>
                <div class="pt-4">
                    <div v-if="ayahTafsirSelected">
                        <p class="text-white rounded bg-sky-500 w-max py-1 px-2 mb-2 text-sm"> {{ surahTafsirSelected?.surat_golongan }} ({{ surahTafsirSelected?.revelation_type }}) &bull; <span class="font-quran">{{surahTafsirSelected?.revelation_type == 'Meccan' ? `\u0645\u0643\u0629` : `\u0645\u062F\u064A\u0646\u0629`}}</span></p>
                        <p class="text-slate-700 font-quran text-2xl md:text-5xl text-right dark:text-slate-100">
                            <span class="text-base block md:inline md:text-xl font-quicksand">{{ surahTafsirSelected?.surat_terjemahan }}
                            <span class="text-xs md:text-sm">({{surahTafsirSelected?.surat_english_terjemahan}})</span>
                            </span>
                            <span class="text-2xl md:text-3xl font-light"> ({{surahTafsirSelected?.surat_text_full}})</span> {{surahTafsirSelected?.surat_text}}
                        </p>
                    </div>
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
                    <button @click="hideMenuOption" type="button" class="text-slate-700 relative group hover:bg-sky-500 rounded p-0.5 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <div v-if="option" ref="target" class="absolute overflow-hidden bottom-[-5rem] w-36 card-shadow-md rounded right-8 bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700">
                            <button type="button" @click="selectSize(size)" v-for="size in state.sizes" :key="size.id" class="py-1 px-3 grid grid-cols-4 w-full gap-1 relative hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white">
                                <div class="col-span-1">{{ size.size }}</div> <div class="text-sm col-span-3 text-left">({{ size.text}})</div>
                            </button>
                        </div>
                    </button>
                    <p class="text-sky-500 font-medium">{{ state.sizeSelected.size }}</p>
                    <p class="text-sm text-slate-700 dark:text-slate-50">Kamu dapat mencari semua metadata Ayah disini</p>
                </div>
            </div>
            
            <div class="mt-8 mx-auto select-none">
                <div v-if="ayahTafsirSelected" class="font-quran text-center mb-4 text-sm font-semibold dark:text-slate-400"><span class="text-sm font-normal">({{surahTafsirSelected?.surat_golongan}})</span> | {{surahTafsirSelected?.surat_text_full}} </div>
                <div class="font-quran text-center mb-2 text-xl font-semibold dark:text-slate-300">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
                <p class="text-center text-sm text-gray-600 dark:text-slate-300">Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.</p>
            </div>

            <div :class="[state.sizeSelected.class]" class="w-full mx-auto grid gap-4 pt-6 pb-2 dark:bg-transparent bg-white/40">
               <CardAyahMetadata
                    :is-tafsir="true"
                    v-if="ayahTafsirSelected"
                    :ayat="ayahTafsirSelected"
               />

               <div class="p-4 prose max-w-none rounded text-slate-800 dark:text-slate-200 ring-1 ring-slate-700/10 dark:ring-slate-700 select-none md:select-text">
                    <div class="flex flex-col">
                        <p class="text-white rounded inline-flex items-center bg-sky-500 w-max py-1 px-2 mb-4 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                             <span class="ml-1 font-medium">Tafsir Ringkas Kemenag (Wajiz)</span>
                        </p>
                        <span class="whitespace-pre-wrap leading-relaxed indent-8">{{ ayahTafsirSelected?.tafsir.id.short}}</span>
                    </div>
                    <div class="mt-4 flex flex-col border-t dark:border-slate-700/50 pt-4">
                        <p class="text-white rounded inline-flex items-center bg-sky-500 w-max py-1 px-2 mb-4 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                             <span class="ml-1 font-medium">Tafsir Kemenag (Tahlili)</span>
                        </p>
                        <span class="whitespace-pre-wrap leading-relaxed indent-8">{{ ayahTafsirSelected?.tafsir.id.long}}</span>
                    
                        <span class="mt-8 text-xs inline-flex items-center font-semibold text-right">
                            Tafsir Q.S {{ayahTafsirSelected?.sura_id}}:{{ayahTafsirSelected?.aya_number}} Sumber: QUR'AN KEMENAG 
                            <a class="ml-2 hover:text-sky-500" target="_blank" :href="`https://quran.kemenag.go.id/quran/per-ayat/surah/${ayahTafsirSelected?.sura_id}?from=${ayahTafsirSelected?.aya_number}&to=${ayahTafsirSelected?.aya_number}`">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                </svg>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
            <div class="rounded-md border-r-4 px-4 border-sky-400 mx-auto max-w-md text-xs sm:text-sm text-center bg-white dark:bg-dark-blue dark:text-slate-100 mt-10 card-shadow-md ring-1 ring-slate-700/10 dark:ring-slate-700 h-full p-2">
                <p class="flex items-center flex-wrap space-x-2">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                    </span>
                    <span>kamu dapat lebih memahami kandungan tafsir ayah.</span>
                </p>
            </div>
        </section>
        <ScrollToTop @on-back="scrollToPageUp"/>

    </div>
</template>

<script setup lang="ts">
import { useAyah, useUtil } from '@/services';
import { reactive, ref } from 'vue';
import { convertToArab } from '@/utils/helperFunction';
import CardAyahMetadata from '@/components/app/card/CardAyahMetadata.vue';
import { onClickOutside } from '@vueuse/core';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { storeToRefs } from 'pinia';
import { QuranLayoutSize } from '@/types/user.interface';

const utilService = useUtil();
const { ayahTafsirSelected, surahTafsirSelected } = storeToRefs(useAyah());

const option = ref(false);
const state = reactive({
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

const pageUp = ref<HTMLDivElement | undefined>();
const scrollToPageUp = () => {
    if (pageUp)
        pageUp.value?.scrollIntoView({ behavior: 'smooth' });
}


const target = ref(null)
onClickOutside(target, () => hideMenuOption())

const hideMenuOption = () => {
    option.value = !option.value
}

const selectSize = (size: QuranLayoutSize) => {
    utilService.setAlquranSize(size);
    state.sizeSelected = size;
}
</script>