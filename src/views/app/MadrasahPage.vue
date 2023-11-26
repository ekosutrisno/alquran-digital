<template>
    <div ref="pageUp" class="absolute -top-20"></div>

    <div class="wrapper md:p-4 space-y-6">
        <!-- Section 1 -->
        <section class="grid lg:grid-cols-2">
            <div class="bg-white card-shadow-md dark:bg-dark-blue ring-1 dark:ring-slate-700 ring-slate-700/10 rounded-lg p-4 flex flex-col">
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                       <WidgetPlusIcon/>
                       <span>E-Madrasah</span> 
                    </p>
                    <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Semua madrasah ada di sini</p>
                </div>
                <div class="pt-4">
                    <p class="text-white rounded bg-sky-500 w-max py-1 px-2 mb-2 text-sm">Info</p>
                    <p class="text-slate-600 dark:text-slate-100">Halaman ini berisi semua kelas yang kamu buat atau pun ikuti, kamu dapat menambahkan anggota baru yang sudah terdaftar sebagai User di Al-quran Digital</p>

                    <button type="button" @click="$router.push({name: 'AppDashboard'})" class="mt-8 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 w-max">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        <span class="ml-2">Kembali</span>
                    </button>
                </div>
            </div>
            <div class="flex items-start justify-end mt-8 lg:mt-0">
                <router-link :to="{name: 'MadrasahCreatePage', query: {a: 'create'}}" class="text-slate-800 inline-flex items-center space-x-2 dark:text-sky-50 bg-white hover:bg-slate-50 ring-1 ring-slate-700/20 hover:ring-slate-700/20 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-lg text-sm">
                    <AddAndEditIcon class="h-5 w-5"/>
                    <span>Buat Madrasah</span>
                </router-link>
            </div>
        </section>

        <!-- Section 2 -->
        <section>
            <div class="w-full flex items-center justify-between border-b border-slate-700/20 dark:border-slate-700/75 pb-2 px-1">
                <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                    <WidgetIcon />
                    <span>Semua Madrasah</span> 
                </p>
                <div class="md:inline-flex hidden items-center space-x-2">
                    <p class="text-sm text-slate-700 dark:text-slate-50">List semua madrasahmu ada disini.</p>
                </div>
            </div>

            <div class="with-transition w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 pt-6 pb-2 dark:bg-transparent bg-white/40">
                <CardMadrasah v-for="madrasah in madrasahList" :key="madrasah.code" :madrasah="madrasah"/>
                <div v-if="isLoading" class="flex items-center justify-center">
                    <Loader />
                </div>
            </div>

            <CardNotLogin v-if="!state.isLogin"/>

            <div class="rounded-md border-r-4 px-4 border-sky-400 mx-auto max-w-md text-xs sm:text-sm text-center bg-white dark:bg-dark-blue dark:text-slate-100 mt-10 card-shadow-md ring-1 ring-slate-700/10 dark:ring-slate-700 h-full p-2">
                <p class="flex items-center flex-wrap space-x-2">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                    </span>
                    <span>Tambahkan kelas kamu disini, dan mulai mengajar.</span>
                </p>
            </div>
        </section>
        <ScrollToTop @on-back="scrollToPageUp"/>

    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { useMadrasah } from '@/services';
import { storeToRefs } from 'pinia';
import Loader from '@/components/Loader.vue';
import CardNotLogin from '@/components/app/card/CardNotLogin.vue';
import WidgetIcon from '@/components/svg/WidgetIcon.vue';
import WidgetPlusIcon from '@/components/svg/WidgetPlusIcon.vue';
import CardMadrasah from '@/components/app/card/CardMadrasah.vue';
import { decrypt } from '@/utils/cryp';
import AddAndEditIcon from '@/components/svg/AddAndEditIcon.vue';

const madrasahService = useMadrasah();
const { isLoading, madrasahList } = storeToRefs(madrasahService);

const state = reactive({
    isLogin: computed(()=> decrypt(String(localStorage.getItem("_uid")))),
    option: false,
});

onMounted(()=>{ 
    // if(state.rooms.length > 0)
        // roomService.getRooms( state.rooms as string[])
})

const pageUp = ref<HTMLDivElement | undefined>();
const scrollToPageUp = () => {
    if (pageUp)
        pageUp.value?.scrollIntoView({behavior: 'smooth'});
}

const target = ref(null)
onClickOutside(target, () => hideMenuOption())

const hideMenuOption = () => {
    state.option = !state.option
}

</script>