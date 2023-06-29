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
                        <span>Notifications</span> 
                    </p>
                    <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Terdapat total <span class="text-sky-500 font-semibold"> {{notifications.length}} / {{convertToArab(`${notifications.length}`)}} </span> Notifications</p>
                </div>
                <div class="pt-4">
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
                    <p>Notifications 
                        <span class="text-xs ml-5">Filter by 
                            <span class="text-white bg-sky-500 py-0.5 px-2 rounded-full ml-2"> {{ state.filter }} {{ state.notificationsList.length ?? 0 }} </span>
                        </span>
                    </p> 
                </p>
                <div class="md:inline-flex hidden items-center space-x-2">
                    <button @click="hideMenuOption" type="button" class="text-slate-700 relative group hover:bg-sky-500 rounded p-0.5 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <div v-if="state.option" ref="target" class="absolute z-10 overflow-hidden bottom-[-5rem] w-36 card-shadow-md rounded right-8 bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700/50">
                            <button type="button" @click="selectFilter(size.size)" v-for="size in state.sizes" :key="size.id" class="py-1 px-3 grid grid-cols-4 w-full gap-1 relative hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white">
                                <div class="col-span-1">{{ size.size }}</div>
                            </button>
                        </div>
                    </button>
                    <p class="text-sm text-slate-700 dark:text-slate-50">Semua notifikasi</p>
                </div>
            </div>

            <div class="grid h-full">
                <div class="w-full mx-auto px-4 grid pt-6 pb-2 dark:bg-slate-900/50 bg-white/30">
                    <div v-for="(item, idx) in state.notificationsList" :key="item.key">
                        <CardTimeline :item="item" :idx="idx"/>
                    </div>
                </div>
            </div>

           <div v-if="!state.isLogin" class="mx-auto w-full max-w-xs">
                <router-link to="/auth/login">
                    <div class="transition-shadow relative h-20 duration-300 flex overflow-hidden flex-col bg-white rounded-md hover:card-shadow-md">
                        <div class="max-h-72 w-full overflow-hidden absolute inset-0 bg-gradient-to-tr from-sky-400/90 via-sky-500 to-sky-400/90"></div>
                        <div class="h-16 absolute z-30 sm:h-full max-h-72 w-full overflow-hidden py-2 px-3 md:p-5">
                            <span class="font-semibold text-white">Fitur Non Aktif</span> 
                            <p class="text-xs text-gray-100">Fitur akan aktif setelah Login, click untuk login.</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8 text-sky-100 z-50 absolute right-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        <div class="bg-gray-900 absolute inset-0 z-20 bg-opacity-30"></div>
                    </div>
                </router-link>
            </div>

            <div class="rounded-md border-r-4 px-4 border-sky-400 mx-auto max-w-md text-xs sm:text-sm text-center bg-white dark:bg-dark-blue dark:text-slate-100 mt-10 card-shadow-md ring-1 ring-slate-700/10 dark:ring-slate-700/50 h-full p-2">
                <p class="flex items-center flex-wrap space-x-2">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                    </span>
                    <span>kamu dapat melihat semua notifikasi disini.</span>
                </p>
            </div>
        </section>
        <ScrollToTop @on-back="scrollToPageUp"/>

    </div>
</template>

<script setup lang="ts">
import {  useNotification, useUtil } from '@/services';
import { computed, onBeforeUpdate, onMounted, reactive, ref } from 'vue';
import { convertToArab, formatToString, yesterday} from '@/utils/helperFunction';
import { onClickOutside } from '@vueuse/core';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { UserNotification, NotificationMapper } from '@/types/user.interface';
import { storeToRefs } from 'pinia';
import CardTimeline from '@/components/app/card/CardTimeline.vue';

const notificationService = useNotification();

const { notifications } =  storeToRefs(notificationService);

const state = reactive({
    isLogin: computed(()=>localStorage.getItem('_uid')),
    option: false,
    sizes: [
        {
            id: 1,
            size: 'All'
        },
        {
            id: 2,
            size: 'Unread'
        },
        {
            id: 3,
            size: 'Read'
        }
    ],
    notif: {} as UserNotification,
    filteredNotif: computed(()=> notificationService.notifications || []),
    notificationsList: [] as NotificationMapper[],
    filter: 'All',
    today: computed(()=> formatToString(new Date())),
    yesterday: computed(()=> yesterday())
});

onBeforeUpdate(()=>{
  notificationMapper()
});

onMounted(()=>{
  notificationMapper()
});

const pageUp = ref<HTMLDivElement | undefined>();
const scrollToPageUp = () => {
    if (pageUp)
        pageUp.value?.scrollIntoView({behavior: 'smooth'});
}


const selectFilter = (opt: string) =>{
    state.filter = opt;
    notificationMapper();
}


const target = ref(null)
onClickOutside(target, () => hideMenuOption())

const hideMenuOption = () => {
    state.option = !state.option
}



const filterAndReduced = computed(()=>{
    if(state.filter == 'Read')
        return state.filteredNotif.filter(notif => notif.read);
    else if( state.filter == 'Unread')
        return state.filteredNotif.filter(notif => !notif.read);
    else
        return state.filteredNotif;
})

const notificationMapper = ()=>{
    const dataReduced =  filterAndReduced.value.reduce((group: any, notifs) => {
        const { timestamp } = notifs;
        const d = formatToString(timestamp);
        group[d] = group[d] ?? [];
        group[d].push(notifs);
        group[d].sort((a: UserNotification, b: UserNotification) => (new Date(b.timestamp).valueOf()) - (new Date(a.timestamp).valueOf()));
        return group;
    }, {});

    const tempData:NotificationMapper[] = [];
    Object.keys(dataReduced).forEach((d)=> {
        const indexedData:UserNotification[] = dataReduced[d];
        const dataMapper:NotificationMapper = {
            key: d,
            data: indexedData,
            actualDate: new Date(indexedData[0].timestamp) 
        }
        tempData.push(dataMapper)
    })

    state.notificationsList = tempData.sort((a: NotificationMapper, b: NotificationMapper)=> (new Date(b.actualDate).valueOf()) - (new Date(a.actualDate).valueOf()));;

}


</script>