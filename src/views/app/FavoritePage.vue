<template>
    <div ref="pageUp" class="absolute -top-20"></div>

    <div class="wrapper md:p-4 space-y-6">
        <!-- Section 1 -->
        <section class="grid lg:grid-cols-2">
            <div class="bg-white card-shadow-md dark:bg-dark-blue ring-1 dark:ring-slate-700 ring-slate-700/10 rounded-lg p-4 flex flex-col">
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                       <WidgetPlusIcon/>
                        <span>Favorit</span> 
                    </p>
                    <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Terdapat total <span class="text-sky-500 font-semibold"> {{favorites.length}} / {{convertToArab(`${favorites.length}`)}} </span> Ayah</p>
                </div>
                <div class="pt-4">
                    <p class="text-white rounded bg-sky-500 w-max py-1 px-2 mb-2 text-sm">Info</p>
                    <p class="text-slate-600 dark:text-slate-100">Halaman ini berisi metadata semua ayah-ayah favorit ayng sudah kamu tandai, sehingga kamu akan lebih mudah menemukannya.</p>
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
                <div v-if="ayah" class="font-quran text-center mb-4 text-sm font-semibold dark:text-slate-400"><span class="text-sm font-normal">({{currentSurah?.surat_golongan}})</span> | {{currentSurah?.surat_text_full}} </div>
                <div class="font-quran text-center mb-2 text-xl font-semibold dark:text-slate-300">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
                <p class="text-center text-sm text-gray-600 dark:text-slate-300">Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.</p>
            </div>

            <div v-if="isLoading" class="flex items-center justify-center">
                <Loader />
            </div>

            <div :class="[state.sizeSelected.class]" class="w-full mx-auto grid gap-4 pt-6 pb-2 dark:bg-transparent bg-white/40">
               <CardAyahMetadata
                    v-for="ayah in favorites"
                    :ayat="ayah"
                    isFavorite
               />
            </div>

            <CardNotLogin v-if="!isLogin"/>

            <div class="rounded-md border-r-4 px-4 border-sky-400 mx-auto max-w-md text-xs sm:text-sm text-center bg-white dark:bg-dark-blue dark:text-slate-100 mt-10 card-shadow-md ring-1 ring-slate-700/10 dark:ring-slate-700 max-h-16 h-full p-2">
                <p class="inline-flex items-center space-x-2">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                    </span>
                    <span>Kamu dapat menyimpan ayat-ayat favorit disini.</span>
                </p>
            </div>
        </section>
        <ScrollToTop @on-back="scrollToPageUp"/>

    </div>
</template>

<script setup lang="ts">
import { useAyah, useSurah, useUser, useUtil } from '@/services';
import { computed, onMounted, reactive, ref } from 'vue';
import { convertToArab } from '@/utils/helperFunction';
import CardAyahMetadata from '@/components/app/card/CardAyahMetadata.vue';
import { onClickOutside } from '@vueuse/core';
import ScrollToTop from '@/components/ScrollToTop.vue';
import CardNotLogin from '@/components/app/card/CardNotLogin.vue';
import Loader from '@/components/Loader.vue';
import WidgetPlusIcon from '@/components/svg/WidgetPlusIcon.vue';
import WidgetIcon from '@/components/svg/WidgetIcon.vue';
import { decrypt } from '@/utils/cryp';
import { QuranLayoutSize } from '@/types/user.interface';

const surahService = useSurah();
const userService = useUser();
const ayahService = useAyah();
const utilService = useUtil();

const currentSurah = computed(() => userService.surahBacaanUser);
const isLoading = computed(() => surahService.isLoading);
const isLogin = computed(() => decrypt(String(localStorage.getItem("_uid"))));
const ayah = computed(() => userService.currentUser?.bacaanku);
const favorites = computed(() => ayahService.ayahFavorite);

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

onMounted(() => {
    if (isLogin.value.length)
        ayahService.onGetFavorit()
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