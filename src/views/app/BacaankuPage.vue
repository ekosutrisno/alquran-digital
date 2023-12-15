<template>
    <div ref="pageUp" class="absolute -top-20"></div>

    <div class="wrapper md:p-4 space-y-6">
        <!-- Section 1 -->
        <section class="grid lg:grid-cols-2">
            <div
                class="bg-white card-shadow-md dark:bg-dark-blue ring-1 dark:ring-slate-700 ring-slate-700/10 rounded-lg p-4 flex flex-col">
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <WidgetPlusIcon/>
                        <span v-if="ayah"> {{ currentSurah?.surat_name }}
                            ({{ currentSurah?.surat_english_name }})</span>
                        <span v-else>Bacaanku</span>
                    </p>
                    <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Terdapat total <span
                            v-if="ayah" class="text-sky-500 font-semibold"> {{ currentSurah?.count_ayat }} /
                            {{ convertToArab(`${currentSurah?.count_ayat}`) }} </span> <span v-else
                            class="text-sky-500 font-semibold"> 0 / {{ convertToArab(`${0}`) }} </span> Ayah</p>
                </div>
                <div class="pt-4">
                    <div v-if="ayah">
                        <p class="text-white rounded bg-sky-500 w-max py-1 px-2 mb-2 text-sm"> {{
                                currentSurah?.surat_golongan
                        }} ({{ currentSurah?.revelation_type }}) &bull;
                            <span class="font-quran">{{ currentSurah?.revelation_type == 'Meccan' ?
                                    `\u0645\u0643\u0629` : `\u0645\u062F\u064A\u0646\u0629`
                            }}</span></p>
                        <p class="text-slate-600 font-quran text-2xl md:text-5xl text-right dark:text-slate-100">
                            <span class="text-base block md:inline md:text-xl font-quicksand">{{
                                    currentSurah?.surat_terjemahan
                            }}
                                <span
                                    class="text-xs md:text-sm">({{ currentSurah?.surat_english_terjemahan }})</span>
                            </span>
                            <span class="text-2xl md:text-3xl font-light">
                                ({{ currentSurah?.surat_text_full }})</span> {{ currentSurah?.surat_text }}
                        </p>
                    </div>
                    <button type="button" @click="$router.push({name: 'AppDashboard'})" class="mt-8 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 w-max">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        <span class="ml-2">Kembali</span>
                    </button>
                </div>
            </div>
        </section>

        <!-- Section 2 -->
        <section>
            <div
                class="w-full flex items-center justify-between border-b border-slate-700/20 dark:border-slate-700/75 pb-2 px-1">
                <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                    <WidgetIcon/>
                    <span>Ayahs</span>
                </p>
                <div class="md:inline-flex hidden items-center space-x-2">
                    <button @click="hideMenuOption" type="button"
                        class="text-slate-700 relative group hover:bg-sky-500 rounded p-0.5 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-white " fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <div v-if="option" ref="target"
                            class="absolute overflow-hidden bottom-[-5rem] w-36 card-shadow-md rounded right-8 bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700">
                            <button type="button" @click="selectSize(size)" v-for="size in state.sizes" :key="size.id"
                                class="py-1 px-3 grid grid-cols-4 w-full gap-1 relative hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white">
                                <div class="col-span-1">{{ size.size }}</div>
                                <div class="text-sm col-span-3 text-left">({{ size.text }})</div>
                            </button>
                        </div>
                    </button>
                    <p class="text-sky-500 font-medium">{{ state.sizeSelected.size }}</p>
                    <p class="text-sm text-slate-700 dark:text-slate-50">Kamu dapat mencari semua metadata Ayah disini
                    </p>
                </div>
            </div>

            <div class="mt-8 mx-auto select-none">
                <div v-if="ayah" class="font-quran text-center mb-4 text-sm font-semibold dark:text-slate-400">
                    <span class="text-sm font-normal">({{ currentSurah?.surat_golongan }})</span> |
                    {{ currentSurah?.surat_text_full }} </div>
                <div class="font-quran text-center mb-2 text-xl font-semibold dark:text-slate-300">بِسْمِ ٱللَّهِ
                    ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
                <p class="text-center text-sm text-gray-600 dark:text-slate-300">Dengan nama Allah Yang Maha Pengasih,
                    Maha Penyayang.</p>
            </div>

            <div v-if="isLoading" class="flex items-center justify-center">
                <Loader />
            </div>

            <div :class="[state.sizeSelected.class]"
                class="w-full mx-auto grid gap-4 pt-6 pb-2 dark:bg-transparent bg-white/40">
                <CardAyahMetadata v-if="ayah" :ayat="ayah" />
            </div>

            <div v-if="$route.query.sajda != 'true' && !isLoading && isLogin && ayah"
                class="flex items-center my-4 justify-center">
                <button @click="onLanjutBacaan"
                    class="py-2 px-3 inline-flex items-center space-x-2 transition rounded-lg bg-sky-500 hover:bg-sky-600 text-white focus:outline-none"><span>Selanjutnya</span>
                    <span><svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg></span>
                </button>
            </div>

            <CardNotLogin v-if="!isLogin" />
            <router-link v-if="isLogin && !ayah" to="/app/dashboard/surah">
                <div class="transition-shadow sm:max-w-lg mx-auto z-0 relative h-32 duration-300 flex overflow-hidden flex-col bg-white rounded-md hover:card-shadow-md">
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

            <div class="rounded-md border-r-4 px-4 border-sky-400 mx-auto max-w-md text-xs sm:text-sm text-center bg-white dark:bg-dark-blue dark:text-slate-100 mt-10 card-shadow-md ring-1 ring-slate-700/10 dark:ring-slate-700 h-full p-2">
                <p class="flex items-center flex-wrap space-x-2">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-500" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                    </span>
                    <span>Lanjutkan bacaan terakhir Kamu dari sini.</span>
                </p>
            </div>
        </section>
        <ScrollToTop @on-back="scrollToPageUp" />

    </div>
</template>

<script setup lang="ts">
import { useSurah, useUser, useUtil } from '@/services';
import { computed, reactive, ref } from 'vue';
import Loader from '@/components/Loader.vue';
import { useRouter } from 'vue-router';
import { convertToArab } from '@/utils/helperFunction';
import CardAyahMetadata from '@/components/app/card/CardAyahMetadata.vue';
import { onClickOutside } from '@vueuse/core';
import ScrollToTop from '@/components/ScrollToTop.vue';
import CardNotLogin from '@/components/app/card/CardNotLogin.vue';
import WidgetPlusIcon from '@/components/svg/WidgetPlusIcon.vue';
import WidgetIcon from '@/components/svg/WidgetIcon.vue';
import { decrypt } from '@/utils/cryp';

const surahService = useSurah();
const userService = useUser();
const utilService = useUtil();
const router = useRouter();

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

const currentSurah = computed(() => userService.surahBacaanUser);
const isLoading = computed(() => surahService.isLoading);
const isLogin = computed(() => decrypt(String(localStorage.getItem("_uid"))));
const ayah = computed(() => userService.currentUser?.bacaanku);
const option = ref(false);

const pageUp = ref<HTMLDivElement | undefined>();
const scrollToPageUp = () => {
    if (pageUp != null)
        pageUp.value?.scrollIntoView({ behavior: 'smooth' });
}

const target = ref(null)
onClickOutside(target, (_event) => hideMenuOption())

const hideMenuOption = () => {
    option.value = !option.value
}

const selectSize = (size: any) => {
    utilService.setAlquranSize(size);
    state.sizeSelected = size;
}

const onLanjutBacaan = () => {
    router.push({
        name: 'AlquranPageDetail',
        query: {
            sn: Number(ayah.value?.sura_id),
            an: Number(ayah.value?.aya_number),
            next_bacaan: 'true'
        }
    })
}
</script>