<template>
    <div ref="pageUp" class="absolute -top-20"></div>

    <div class="wrapper md:p-4 space-y-6">
        <!-- Section 1 -->
        <section class="grid lg:grid-cols-2">
            <div class="bg-white card-shadow-md dark:bg-dark-blue ring-1 dark:ring-slate-700 ring-slate-700/10 rounded-lg p-4 flex flex-col">
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <WidgetPlusIcon/>
                        <span>Notifications</span> 
                    </p>
                    <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Terdapat total <span class="text-sky-500 font-semibold"> {{notifications.length}} / {{convertToArab(`${notifications.length}`)}} </span> Notifications</p>
                </div>
                <div class="pt-4">
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
                    <p>Notifications 
                        <span class="text-xs ml-5">Filter by 
                            <span class="text-white bg-sky-500 py-0.5 px-2 rounded-full ml-2"> {{ filter }} {{ filterAndReduced.length ?? 0 }} </span>
                        </span>
                    </p> 
                </p>
                <div class="md:inline-flex hidden items-center space-x-2">
                    <button @click="hideMenuOption" type="button" class="text-slate-700 relative group hover:bg-sky-500 rounded p-0.5 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <div v-if="option" ref="target" class="absolute z-10 overflow-hidden bottom-[-5rem] w-36 card-shadow-md rounded right-8 bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700">
                            <button type="button" @click="selectFilter(size.filter)" v-for="size in filters" :key="size.id" class="py-1 px-3 grid grid-cols-4 w-full gap-1 relative hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-white">
                                <div class="col-span-1">{{ size.filter }}</div>
                            </button>
                        </div>
                    </button>
                    <p class="text-sm text-slate-700 dark:text-slate-50">Semua notifikasi</p>
                </div>
            </div>

            <div class="grid h-full">
                <div class="w-full mx-auto px-4 grid pt-6 pb-2 dark:bg-transparent bg-white/40">
                    <div v-for="(item, idx) in notificationsList" :key="item.key">
                        <CardTimeline :item="item" :idx="idx"/>
                    </div>
                </div>
                <div v-if="!filterAndReduced.length" class="w-full py-5 h-auto flex flex-col items-center justify-center with-transition mt-5 dark:text-white max-w-lg mx-auto">
                    <NoNotificationIcon />
                    <p class="mx-auto text-sm py-5">Hasil Tidak Ditemukan!</p>
                </div>
            </div>

            <div class="rounded-md border-r-4 px-4 border-sky-400 mx-auto max-w-md text-xs sm:text-sm text-center bg-white dark:bg-dark-blue dark:text-slate-100 mt-10 card-shadow-md ring-1 ring-slate-700/10 dark:ring-slate-700 h-full p-2">
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
import { useNotification } from '@/services/useNotification';
import { computed, ref } from 'vue';
import { convertToArab } from '@/utils/helperFunction';
import { notificationMapper, filterNotification } from '@/utils/notificationFunction';
import { onClickOutside } from '@vueuse/core';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { UserNotification, NotificationFilter, NotifFilterOption } from '@/types/user.interface';
import { storeToRefs } from 'pinia';
import CardTimeline from '@/components/app/card/CardTimeline.vue';
import NoNotificationIcon from '@/components/svg/NoNotificationIcon.vue';
import WidgetIcon from '@/components/svg/WidgetIcon.vue';
import WidgetPlusIcon from '@/components/svg/WidgetPlusIcon.vue';

const notificationService = useNotification();
const { notifications } = storeToRefs(notificationService);

const filterAndReduced = computed<UserNotification[]>(() => filterNotification(notifications.value, filter.value));
const notificationsList = computed(() => notificationMapper(filterAndReduced.value));

const filter = ref<NotificationFilter>('All');
const filters = ref<NotifFilterOption[]>([
    { id: 1, filter: 'All' },
    { id: 2, filter: 'Unread' },
    { id: 3, filter: 'Read' }
]);
const option = ref(false);

const selectFilter = (opt: NotificationFilter) => {
    filter.value = opt;
}

const target = ref(null)
onClickOutside(target, () => hideMenuOption())

const hideMenuOption = () => {
    option.value = !option.value
}

const pageUp = ref<HTMLDivElement | undefined>();
const scrollToPageUp = () => {
    if (pageUp)
        pageUp.value?.scrollIntoView({ behavior: 'smooth' });
}
</script>