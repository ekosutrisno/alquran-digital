<template>
    <div ref="pageUp" class="absolute -top-20"></div>
    <div class="wrapper md:p-4 space-y-6">
        <!-- Section 1 -->
        <section class="grid max-w-screen-md mx-auto">
            <div class="bg-white card-shadow-md dark:bg-dark-blue ring-1 dark:ring-slate-700 ring-slate-700/10 rounded-lg p-4 flex flex-col">
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <WidgetPlusIcon/>
                        <span>Pencarian</span> 
                    </p>
                    <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Terdapat total <span class="text-sky-500 font-semibold">6236</span> Data Ayat</p>
                </div>
                <form id="form-search" @submit.prevent="onSearch">
                    <div class="pt-4 grid lg:grid-cols-2 gap-5 lg:gap-10">
                            <div>
                                <label for="surah-number" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Nomor Surah</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <input type="number" id="number-input-surah" autocomplete="off" v-model="search.surah" min="1" max="114" aria-describedby="Surah Number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="1-114" required>
                                </div>
                                <p class="text-xs mt-2 dark:text-slate-400">Ini akan menjadi parameter nomor surah yang Anda cari. Minimal 1 maksimal 114.</p>
                            </div>
                            <div>
                                <label for="ayah-number" class="block text-sm font-medium text-slate-700 dark:text-slate-300">Nomor Ayat</label>
                                <div class="mt-1 relative rounded-md shadow-sm">
                                    <input type="number" id="number-input-ayah" autocomplete="off" v-model="search.ayah" min="1" :disabled="(search.surah < 1 || search.surah > 114)" aria-describedby="Surah Number" class="bg-gray-50 border disabled:bg-slate-100 dark:disabled:bg-slate-600 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500" placeholder="Min 1" required>
                                </div>
                                <p class="text-xs mt-2 dark:text-slate-400">Ini akan menjadi parameter nomor ayat yang Anda cari.</p>
                            </div>
                    </div>
                </form>
                <div>
                    <button form="form-search" type="submit" class="w-full lg:w-56 mt-6 float-right inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                        <span>Cari</span>
                    </button>
                </div>
            </div>
        </section>

        <!-- Section 2 -->
        <section>
            <div class="w-full flex items-center justify-between border-b border-slate-700/20 dark:border-slate-700/75 pb-2 px-1">
                <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                    <WidgetIcon />
                    <span>Hasil pencarian</span> 
                </p>
                <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Hasil dari query pencarian</p>
            </div>
           
            <div v-if="isLoading" class="flex my-4 items-center justify-center">
                <Loader />
            </div>

            <div v-if="ayahs.length">
                <div class="mt-8 mx-auto select-none">
                    <div class="font-quran text-center mb-4 text-sm font-semibold dark:text-slate-400"><span class="text-sm font-normal">({{surah?.surat_golongan}})</span> | {{surah?.surat_text_full}} </div>
                    <div class="font-quran text-center mb-2 text-xl font-semibold dark:text-slate-300">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
                    <p class="text-center text-sm text-gray-600 dark:text-slate-300">Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.</p>
                </div>
                <div class="w-full grid pt-6 pb-2">
                    <CardAyahMetadata v-for="ayah in ayahs" :key="ayah.aya_id" :ayat="ayah" />
                </div>
            </div>

            <div v-else class="w-full py-5 h-auto flex flex-col items-center justify-center with-transition mt-5 dark:text-white max-w-lg mx-auto">
                <NoNotificationIcon />
                <p class="mx-auto text-sm py-5">Hasil Tidak Ditemukan!</p>
            </div>

        </section>
       <ScrollToTop @on-back="scrollToPageUp"/>
    </div>
</template>

<script setup lang="ts">
import { useSurah } from '@/services';
import { ref, reactive } from 'vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { storeToRefs } from 'pinia';
import Loader from '@/components/Loader.vue';
import CardAyahMetadata from '@/components/app/card/CardAyahMetadata.vue';
import NoNotificationIcon from '@/components/svg/NoNotificationIcon.vue';
import WidgetPlusIcon from '@/components/svg/WidgetPlusIcon.vue';
import WidgetIcon from '@/components/svg/WidgetIcon.vue';

const surahService = useSurah();
const { getSurah, setAyahDetailGeneral } = surahService;
const { ayahs, surah, isLoading } = storeToRefs(surahService);

const search = reactive({ surah: 1, ayah: 1 })

async function onSearch() {
    getSurah(search.surah).then(() => {
        setAyahDetailGeneral({ surat: search.surah, ayat: search.ayah }, { next_bacaan: false, max_limit: 1 })
    });
}

const pageUp = ref<HTMLDivElement | undefined>();
const scrollToPageUp = () => {
    if (pageUp)
        pageUp.value?.scrollIntoView({behavior: 'smooth'});
}
</script>