<template>
    <div ref="pageUp" class="absolute -top-20"></div>

    <div class="wrapper md:p-4 space-y-6 relative">
        <!-- Section 1 -->
        <section class="grid lg:grid-cols-2">
            <div class="bg-white card-shadow-md dark:bg-dark-blue ring-1 dark:ring-slate-700 ring-slate-700/10 rounded-lg p-4 flex flex-col">
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <WidgetPlusIcon/>
                        <span> {{surah?.surat_name}} ({{surah?.surat_english_name}})</span> 
                    </p>
                    <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Terdapat total <span class="text-sky-500 font-semibold"> {{surah?.count_ayat}} / {{convertToArab(`${surah?.count_ayat}`)}} </span> Ayah</p>
                </div>
                <div class="pt-4">
                    <p class="text-white rounded bg-sky-500 w-max py-1 px-2 mb-2 text-sm"> {{ surah?.surat_golongan }} ({{ surah?.revelation_type }}) &bull; <span class="font-quran">{{surah?.revelation_type == 'Meccan' ? `\u0645\u0643\u0629` : `\u0645\u062F\u064A\u0646\u0629`}}</span> </p>
                    <p class="text-slate-700 font-quran text-2xl md:text-5xl text-right dark:text-slate-100"> 
                        <span class="text-sm block md:inline md:text-xl font-quicksand">{{ surah?.surat_terjemahan }} 
                            <span class="text-xs md:text-sm">({{surah?.surat_english_terjemahan}})</span>
                        </span>
                        <span class="text-lg md:text-3xl font-light"> ({{surah?.surat_text_full}})</span> {{surah?.surat_text}}
                    </p>
                    <div class="mt-8 flex justify-between">
                        <button type="button" @click="router.push({name: 'AppDashboard'})" class="inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 w-max">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            <span class="ml-2">Kembali</span>
                        </button>
                        <button type="button" @click="addToSurahPilihan" class="font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" :class="[isIncludeMyPilihan ? 'text-sky-600' : 'text-slate-400 hover:text-sky-600']" class="w-5 inline" viewBox="0 0 24 24"><path fill="currentColor" d="m20.975 12.185l-.739-.128l.74.128Zm-.705 4.08l-.74-.128l.74.128ZM6.938 20.477l-.747.065l.747-.065Zm-.812-9.393l.747-.064l-.747.064Zm7.869-5.863l.74.122l-.74-.122Zm-.663 4.045l.74.121l-.74-.121Zm-6.634.411l-.49-.568l.49.568Zm1.439-1.24l.49.569l-.49-.568Zm2.381-3.653l-.726-.189l.726.189Zm.476-1.834l.726.188l-.726-.188Zm1.674-.886l-.23.714l.23-.714Zm.145.047l.229-.714l-.23.714ZM9.862 6.463l.662.353l-.662-.353Zm4.043-3.215l-.726.188l.726-.188Zm-2.23-1.116l-.326-.675l.325.675ZM3.971 21.471l-.748.064l.748-.064ZM3 10.234l.747-.064a.75.75 0 0 0-1.497.064H3Zm17.236 1.823l-.705 4.08l1.478.256l.705-4.08l-1.478-.256Zm-6.991 9.193H8.596v1.5h4.649v-1.5Zm-5.56-.837l-.812-9.393l-1.495.129l.813 9.393l1.494-.13Zm11.846-4.276c-.507 2.93-3.15 5.113-6.286 5.113v1.5c3.826 0 7.126-2.669 7.764-6.357l-1.478-.256ZM13.255 5.1l-.663 4.045l1.48.242l.663-4.044l-1.48-.243Zm-6.067 5.146l1.438-1.24l-.979-1.136L6.21 9.11l.979 1.136Zm4.056-5.274l.476-1.834l-1.452-.376l-.476 1.833l1.452.377Zm1.194-2.194l.145.047l.459-1.428l-.145-.047l-.459 1.428Zm-1.915 4.038a8.378 8.378 0 0 0 .721-1.844l-1.452-.377A6.878 6.878 0 0 1 9.2 6.11l1.324.707Zm2.06-3.991a.885.885 0 0 1 .596.61l1.452-.376a2.385 2.385 0 0 0-1.589-1.662l-.459 1.428Zm-.863.313a.515.515 0 0 1 .28-.33l-.651-1.351c-.532.256-.932.73-1.081 1.305l1.452.376Zm.28-.33a.596.596 0 0 1 .438-.03l.459-1.428a2.096 2.096 0 0 0-1.548.107l.65 1.351Zm2.154 8.176h5.18v-1.5h-5.18v1.5ZM4.719 21.406L3.747 10.17l-1.494.129l.971 11.236l1.495-.129Zm-.969.107V10.234h-1.5v11.279h1.5Zm-.526.022a.263.263 0 0 1 .263-.285v1.5c.726 0 1.294-.622 1.232-1.344l-1.495.13ZM14.735 5.343a5.533 5.533 0 0 0-.104-2.284l-1.452.377a4.03 4.03 0 0 1 .076 1.664l1.48.243ZM8.596 21.25a.916.916 0 0 1-.911-.837l-1.494.129a2.416 2.416 0 0 0 2.405 2.208v-1.5Zm.03-12.244c.68-.586 1.413-1.283 1.898-2.19L9.2 6.109c-.346.649-.897 1.196-1.553 1.76l.98 1.137Zm13.088 3.307a2.416 2.416 0 0 0-2.38-2.829v1.5c.567 0 1 .512.902 1.073l1.478.256ZM3.487 21.25c.146 0 .263.118.263.263h-1.5c0 .682.553 1.237 1.237 1.237v-1.5Zm9.105-12.105a1.583 1.583 0 0 0 1.562 1.84v-1.5a.083.083 0 0 1-.082-.098l-1.48-.242Zm-5.72 1.875a.918.918 0 0 1 .316-.774l-.98-1.137a2.418 2.418 0 0 0-.83 2.04l1.495-.13Z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 2 -->
        <section>
            <div class="w-full flex items-center justify-between border-b border-slate-700/20 dark:border-slate-700/75 pb-2 px-1">
                <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                    <WidgetIcon/>
                    <span>Ayahs</span> 
                </p>
                <div class="md:inline-flex hidden items-center space-x-2">
                    <button @click="hideMenuOption" type="button" class="text-slate-700 dark:text-slate-300 relative group hover:bg-sky-500 rounded p-0.5 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <div v-if="state.option" ref="target" class="p-2 absolute overflow-hidden bottom-[-5rem] w-max card-shadow-md rounded-md right-8 bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700">
                            <button type="button" @click="selectSize(size)" v-for="size in state.sizes" :key="size.id" class="rounded p-1.5 grid grid-cols-4 w-full gap-1 relative hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white">
                                <div class="col-span-1">{{ size.size }}</div> <div class="text-sm col-span-3 text-left">({{ size.text}})</div>
                            </button>
                        </div>
                    </button>
                    <p class="text-white font-medium py-0.5 px-2 rounded bg-sky-500">{{ state.sizeSelected.size }}</p>
                    <p class="text-sm text-slate-700 dark:text-slate-50">Halaman bacaan Al-Quran</p>
                </div>
            </div>
            
            <div class="mt-8 mx-auto select-none">
                <div class="font-quran text-center mb-4 text-sm font-medium dark:text-slate-400"><span class="text-sm font-normal">({{surah?.surat_golongan}})</span> | {{surah?.surat_text_full}} </div>
                <div class="font-quran text-center mb-2 text-xl dark:text-slate-300">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
                <p class="text-center text-sm text-gray-600 dark:text-slate-300">Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.</p>
            </div>

            <div v-if="isLoading" class="flex items-center justify-center">
                <Loader />
            </div>

            <div :class="[state.sizeSelected.class]" class="w-full mx-auto grid gap-4 pt-6 pb-2">
               <CardAyahMetadata
                    v-for="ayah in ayahs"
                    :key="ayah.aya_id"
                    :ayat="ayah"
               />
            </div>

            <div v-if="isPush" class="max-w-7xl text-center mx-auto">
                <Loader />
            </div>

            <div v-if="route.query.sajda != 'true' && !isLoading && !isPush && !isLast" class="flex items-center my-4 justify-center">
                <button @click="loadNextAyah()" class="py-2 px-3 inline-flex items-center space-x-2 transition rounded-lg bg-sky-500 hover:bg-sky-600 text-white focus:outline-none"><span>Selanjutnya</span> <span><svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg></span> 
                </button>
            </div>
        </section>
        <ScrollToTop @on-back="scrollToPageUp"/>

        <Player v-if="isPlayingAyah"/>
    </div>
</template>

<script setup lang="ts">
import { useAyah, useSurah, useUtil } from '@/services';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { SurahData } from '@/types/alquran.interface';
import { convertToArab } from '@/utils/helperFunction';
import CardAyahMetadata from '@/components/app/card/CardAyahMetadata.vue';
import Loader from '@/components/Loader.vue';
import { onClickOutside, useTitle } from '@vueuse/core';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { storeToRefs } from 'pinia';
import Player from '@/components/app/Player.vue';
import WidgetPlusIcon from '@/components/svg/WidgetPlusIcon.vue';
import WidgetIcon from '@/components/svg/WidgetIcon.vue';
import { decrypt } from '@/utils/cryp';

const surahService = useSurah();
const ayahService = useAyah();
const utilService = useUtil();
const route = useRoute();
const router = useRouter();
const title = useTitle();

const { onGetSurahPilihan, onGetFavorit, onRemoveSurahPilihan, onMarkPilihan } = ayahService;
const { nextAyahSurahOfSurah, nextAyahSurahOfSurahDetail, setSurah } = surahService;

interface RouteQuery {
    is_surah: boolean;
    sn: number;
    an: number;
    next_bacaan: boolean;
    sajda: boolean;
}

const routeQuery: RouteQuery = {
    is_surah: route.query.is_surah === 'true' ? true : false,
    sn: Number(route.query.sn),
    an: Number(route.query.an),
    next_bacaan: route.query.next_bacaan === 'true' ? true : false,
    sajda: route.query.sajda === 'true' ? true : false
};

const { surah, isLoading, isPush, ayahs, isLast } = storeToRefs(surahService)
const { surahPilihan, isPlayingAyah } = storeToRefs(ayahService);

const state = reactive({
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

onMounted(() => loadData());

const isIncludeMyPilihan = computed(() => surahPilihan.value.some(surat => surat.id === surah.value?.id));

function setTitle() {
    title.value = `${title.value} (Surah Ke-${routeQuery.sn})`;
}

function loadData() {
    setSurah(routeQuery.sn, {
            is_surah: routeQuery.is_surah,
            meta: {
                next_bacaan: routeQuery.next_bacaan,
                sajda: routeQuery.sajda,
                sn: routeQuery.sn,
                an: routeQuery.an
            }
        })
        .then(() => {
            if (decrypt(String(localStorage.getItem("_uid")))) {
                onGetFavorit();
                onGetSurahPilihan();
            }
            setTitle();
        });
}

function loadNextAyah() {
    routeQuery?.is_surah
        ? nextAyahSurahOfSurah(routeQuery.sn)
        : nextAyahSurahOfSurahDetail()
}

const pageUp = ref<HTMLDivElement | undefined>();
function scrollToPageUp() {
    if (pageUp)
        pageUp.value?.scrollIntoView({ behavior: 'smooth' });
}

const target = ref(null)
onClickOutside(target, () => hideMenuOption())

const hideMenuOption = () => {
    state.option = !state.option
}

const selectSize = (size: any) => {
    utilService.setAlquranSize(size);
    state.sizeSelected = size;
}

async function addToSurahPilihan() {
    if (isIncludeMyPilihan.value)
        onRemoveSurahPilihan(Number(surah.value?.id));
    else
        onMarkPilihan(surah.value as SurahData);
}
</script>