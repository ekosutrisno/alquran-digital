<template>
    <div ref="pageUp" class="absolute -top-20"></div>

    <div class="wrapper md:p-4 space-y-6">
        <!-- Section 0 -->
        <section class="flex flex-col gap-2 md:flex-row md:items-center justify-between">
            <div class="inline-flex space-x-3 items-start">
                <ClassRoomIcon class="w-10 h-10" />
                <div class="flex flex-col">
                    <h1 class="text-slate-800 inline-flex items-center dark:text-white text-xl font-semibold"> 
                        <span>Ruanganmu</span>
                    </h1>
                    <p class="text-slate-700 dark:text-slate-400 text-sm">Detail ruang kelas</p>
                </div>
            </div>
            <div class="pl-10 md:pl-0 space-x-2 hidden lg:flex lg:flex-none flex-wrap">
                <router-link :to="{name: 'ClassRoomPage'}" class="text-slate-800 dark:text-sky-50 bg-white hover:bg-slate-50 ring-1 ring-slate-700/20 hover:ring-slate-700/20 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-lg text-sm">
                    <span class="lg:hidden">Kelas Dashboard</span>
                    <span class="hidden lg:inline">Kelas Dashboard</span>
                </router-link>
                <router-link :to="{name: 'ClassRoomAdvancedPage'}" class="text-slate-800 dark:text-sky-50 bg-white hover:bg-slate-50 ring-1 ring-slate-700/20 hover:ring-slate-700/20 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-lg text-sm">
                    <span>Undang Teman</span>
                </router-link>
                <router-link :to="{name: 'ClassRoomCreatePage', query: {id: room?.id, a: 'edit'}}" class="text-slate-800 dark:text-sky-50 bg-white hover:bg-slate-50 ring-1 ring-slate-700/20 hover:ring-slate-700/20 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-lg text-sm">
                    <span class="inline">Buat Mata Pelajaran</span>
                </router-link>
                <router-link :to="{name: 'ClassRoomCreatePage', query: {id: room?.id, a: 'edit'}}" class="text-slate-800 dark:text-sky-50 bg-white hover:bg-slate-50 ring-1 ring-slate-700/20 hover:ring-slate-700/20 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-lg text-sm">
                    <span class="inline">Edit</span>
                </router-link>
            </div>
        </section>

        <!-- Section 1 -->
        <section class="grid lg:grid-cols-2 gap-4">
            <!-- Left -->
            <div class="bg-transparent min-h-[18rem] relative card-shadow-md dark:bg-dark-blue ring-1 dark:ring-slate-700 ring-slate-700/20 rounded-xl overflow-hidden flex flex-col">
                <img class="object-cover w-full h-full object-top absolute inset-0 z-0" :src="room?.heroImage ? room.heroImage : 'https://i.pinimg.com/564x/68/be/3b/68be3b967fa1ac30f7da5633fff3e9f0.jpg'" :alt="room?.name">
                <div class="absolute flex flex-col inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/10">
                    <div class="w-full p-4 space-y-4 text-white transition flex flex-col justify-between min-h-[150px] rounded">
                        <!-- Header -->
                        <div class="flex items-start justify-between">
                            <div class="flex flex-col items-start justify-between">
                                <p class="font-semibold inline-flex items-center"><span>Room</span><span class="text-xs font-normal mx-1.5">&bull;  Since {{ formatDateWithMonth(room?.createdDate)}}</span><span class="text-xs font-normal">&bull; {{ room?.isActive ? 'Active' : 'InActive'}}</span></p>
                                <p class="text-sm">{{ room?.scheduleDay }} {{ room?.scheduleTime }}</p>
                            </div>
                            <div>
                                {{ room?.members ?  room?.members.length : 0 }} members
                            </div>
                        </div>
                        <div>
                            <!-- Max 14 Char -->
                            <p class="text-3xl font-semibold truncate max-w-xs md:max-w-sm"> {{room?.name}} </p> 
                            <p class="text-sm mt-2 text-slate-200 font-light">{{ room?.description }}</p>
                        </div>   
                        <!-- Member preview Footer-->
                        <div class="flex items-center justify-between">
                            <p> {{ room?.organization }} </p>
                        </div>
                    </div>
                    <div class="p-4 flex items-center justify-between">
                        <button type="button" @click="$router.back()" class="inline-flex justify-center py-2 px-3 border-2 border-transparent hover:border-sky-500 shadow-sm text-sm font-medium rounded-md text-white transition focus:outline-none w-max">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            <span class="ml-2">Back</span>
                        </button>
                        <div class="flex cursor-default text-sm rounded-full">
                            <span class="sr-only">General user info</span>
                            <img class="h-12 w-12 object-cover object-top p-1 rounded-full" :src="mentor?.photo_url" :alt="mentor?.full_name" />
                        </div>
                                
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 2 -->
        <section>
            <div class="w-full flex items-center justify-between border-b border-slate-700/20 dark:border-slate-700/75 pb-2 px-1">
                <div class="flex items-center space-x-4">
                    <button @click="updateParams('tab', 'subject')" aria-label="Name" :class="[$route.query.tab == 'subject' ? 'bg-sky-500 py-2 px-4 rounded-lg text-white' : '']" class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </span>
                        <p>
                            <span class="hidden md:inline">Mata Pelajaran</span>
                            <span class="inline md:hidden">Mapel</span>
                        </p>
                    </button>
                    <button @click="updateParams('tab', 'member')" aria-label="Name" :class="[$route.query.tab == 'member' ? 'bg-sky-500 py-2 px-4 rounded-lg text-white' : '']" class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="6" r="4"/><path stroke-linecap="round" d="M15 9a3 3 0 1 0 0-6M5.89 20.584C6.825 20.85 7.882 21 9 21c3.866 0 7-1.79 7-4s-3.134-4-7-4s-7 1.79-7 4c0 .345.077.68.22 1M18 14c1.754.385 3 1.359 3 2.5c0 1.03-1.014 1.923-2.5 2.37"/></g></svg>
                        </span>
                        <span>Members</span>
                    </button>
                </div>
                <div class="md:inline-flex hidden items-center space-x-2">
                    <p class="text-sm text-slate-700 dark:text-slate-50">List semua anggota kelas.</p>
                </div>
            </div>

            <div v-if="$route.query.tab === 'subject'" class="with-transition w-full mx-auto grid md:grid-cols-3 gap-2 md:gap-4 pt-6 pb-2 dark:bg-transparent bg-white/40">
                <CardClassCourse v-for="subject in subjects" :key="subject.code" :subject="subject"/>
                <div v-if="isLoading" class="flex items-center justify-center">
                    <Loader />
                </div>
            </div>
            <div v-if="$route.query.tab === 'member'" class="with-transition w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 pt-6 pb-2 dark:bg-transparent bg-white/40">
                <CardClassRoomMember
                    v-for="member in members"
                    :key="member.user_id"
                    :member="member"
                    :roomId="($route.params.room_id as string)"
                />
            </div>
            <div v-if="isLoading" class="flex w-full items-center justify-center">
                <Loader />
            </div>

           <div v-if="!state.isLogin" class="mx-auto w-full max-w-xs">
                <router-link to="/auth/login">
                    <div class="transition-shadow relative h-20 duration-300 flex overflow-hidden flex-col bg-white rounded-md hover:card-shadow-md">
                        <div class="max-h-72 w-full overflow-hidden absolute inset-0 bg-gradient-to-tr from-sky-400/90 via-sky-500 to-sky-400/90"></div>
                        <div class="h-16 absolute z-10 sm:h-full max-h-72 w-full overflow-hidden py-2 px-3 md:p-5">
                            <span class="font-semibold text-white">Fitur Non Aktif</span> 
                            <p class="text-xs text-gray-100">Fitur akan aktif setelah Login, click untuk login.</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8 text-sky-100 z-10 absolute right-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        <div class="bg-gray-900 absolute inset-0 z-0 bg-opacity-30"></div>
                    </div>
                </router-link>
            </div>

            <div class="rounded-md border-r-4 px-4 border-sky-400 mx-auto max-w-md text-xs sm:text-sm text-center bg-white dark:bg-dark-blue dark:text-slate-100 mt-10 card-shadow-md ring-1 ring-slate-700/10 dark:ring-slate-700 h-full p-2">
                <p class="flex items-center flex-wrap space-x-2">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                    </span>
                    <span>Details kelas kamu disini.</span>
                </p>
            </div>
        </section>
        <ScrollToTop @on-back="scrollToPageUp" />
        <DialClass />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { onClickOutside } from '@vueuse/core';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { useClassRoom, useClassSubject } from '@/services';
import { storeToRefs } from 'pinia';
import Loader from '@/components/Loader.vue';
import { Room } from '@/types/room.interface';
import { formatDateWithMonth } from '@/utils/helperFunction';
import CardClassRoomMember from '@/components/app/card/CardClassRoomMember.vue';
import ClassRoomIcon from '@/components/svg/ClassRoomIcon.vue';
import CardClassCourse from '@/components/app/card/CardClassCourse.vue';
import DialClass from '@/components/app/DialClass.vue';

type TabParam = 'subject' | 'member';

const router = useRouter();
const route = useRoute();
const roomService = useClassRoom();

const { isLoading, room, members, mentor } = storeToRefs(roomService);

const { subjects } = useClassSubject();

const state = reactive({
    isLogin: computed(()=> localStorage.getItem('_uid')),
    option: false
});

onMounted(async () => { 
    updateParams('tab', String(route.query.tab) as TabParam);
    roomService.getRoom(route.params.room_id as Room['id']);
})

const pageUp = ref<HTMLDivElement | undefined>();
const scrollToPageUp = () => {
    if (pageUp)
        pageUp.value?.scrollIntoView({behavior: 'smooth'});
}

const target = ref(null)
onClickOutside(target, (__event) => hideMenuOption())

const hideMenuOption = () => {
    state.option = !state.option
}

function updateParams(paramName: string, paramValue: TabParam) {
  const query = { ...route.query };
  query[paramName] = paramValue;
  router.push({ query });
};
</script>