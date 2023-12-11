<template>
    <div class="wrapper md:p-4 space-y-6">
        <!-- Section 1-->
        <section class="grid gap-y-4 xl:gap-4 grid-cols-1 xl:grid-cols-4">
            <div class="bg-white row-start-2 xl:row-start-1 dark:bg-dark-blue shadow-lg shadow-slate-200 dark:shadow-slate-900/40 ring-1 dark:ring-slate-700 ring-slate-700/10 rounded-lg p-4 col-span-3 flex flex-col">
                <div class="flex items-center justify-between">
                    <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                        <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 lg:text-xl">
                            <WidgetPlusIcon />
                            <span>Hi <span class="text-gradien">{{ getFirstName(getLoginAsInfo.fullName as string) }}</span>, {{ dayGreeting() }}</span>
                        </p>
                        <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Menu yang sering digunakan</p>
                    </div>
                    <svg fill="none" aria-hidden="true" @click="onSearch(true)" class="flex-none sm:hidden dark:text-white w-8 h-8">
                        <path d="m19 19-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                    </svg>
                </div>
                <div class="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 pt-6 sm:px-2">
                    <QuickMenu 
                        v-for="menu in quickMenu" 
                        :key="menu.id"
                        :menu="menu"
                    />
                </div>
            </div>
            <div class="bg-white sm:max-w-md dark:bg-dark-blue overflow-hidden shadow-lg shadow-slate-200 dark:shadow-slate-900/40 ring-1 dark:ring-slate-700 ring-slate-700/10 rounded-lg p-4 col-span-1 h-min">
                <div class="w-full flex items-center justify-between border-b dark:border-slate-700/75 pb-2 px-1">
                    <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                        <ChartIcon />
                        <span>Statistik</span> 
                    </p>
                </div>

                <div v-if="isLogedIn">
                    <div v-if="currentUser?.bacaanku" class="grid grid-cols-2 relative w-auto">
                        <div class="p-2">
                            <div>
                                <span class="text-sm text-slate-700 dark:text-slate-100">Juz</span>
                                <h1 class="text-6xl font-semibold text-gradien"> {{currentUser?.bacaanku?.juz_id}}</h1>
                            </div>
                            <div>
                                <span class="text-sm text-slate-700 dark:text-slate-100">Surah</span>
                                <h1 class="md:text-lg font-semibold dark:text-white">{{getSurahNameBacaan}}</h1>
                            </div>
                        </div>
                        <div>
                            <div class="grid grid-cols-2">
                                <div>
                                    <span class="text-sm text-slate-700 dark:text-slate-100">Manzil</span>
                                    <h1 class="text-2xl font-semibold dark:text-white">{{currentUser?.bacaanku?.manzil}}</h1>
                                </div>
                                <div>
                                    <span class="text-sm text-slate-700 dark:text-slate-100">Ayat</span>
                                    <h1 class="text-2xl font-semibold dark:text-white">{{currentUser?.bacaanku?.aya_number}}</h1>
                                </div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div>
                                    <span class="text-sm text-slate-700 dark:text-slate-100">Halaman</span>
                                    <h1 class="text-xl font-semibold dark:text-white">{{currentUser?.bacaanku?.page_number}}</h1>
                                </div>
                                <div>
                                    <span class="text-sm text-slate-700 dark:text-slate-100">Rukuk</span>
                                    <h1 class="text-xl font-semibold dark:text-white">{{currentUser?.bacaanku?.rukuk}}</h1>
                                </div>
                            </div>

                            <button type="button" @click="onLanjutBacaan" class="mt-4 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                                <span class="mr-2">Lanjut</span>
                                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                        <Svg3 aria-hidden="true" class="absolute -right-32 bottom-[85px] sm:bottom-1.5 xl:bottom-20 rotate-90"/>
                    </div>
                    <div v-else class="mx-auto w-full my-6 with-transition">
                        <router-link to="/app/dashboard/surah">
                            <div class="transition-shadow z-0 relative h-32 duration-300 flex overflow-hidden flex-col bg-white rounded-md hover:card-shadow-md">
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
                    </div>
                </div>
                <div v-else class="mx-auto w-full my-6 with-transition">
                    <router-link to="/auth/login">
                        <div class="transition-shadow z-0 relative h-32 duration-300 flex overflow-hidden flex-col bg-white rounded-md hover:card-shadow-md">
                            <div class="max-h-72 w-full overflow-hidden absolute inset-0 bg-gradient-to-tr from-purple-400/90 via-indigo-400 to-blue-400/90"></div>
                            <div class="h-16 z-10 sm:h-full max-h-72 w-full overflow-hidden py-2 px-3 md:p-5">
                                <span class="font-semibold text-white">Fitur Non Aktif</span> 
                                <p class="text-xs text-gray-100">Fitur akan aktif setelah Login, click untuk login.</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-8 w-8 text-sky-100 z-50 absolute right-5 bottom-5" viewBox="0 0 24 24"><g fill="currentColor"><path d="m15.99 4.95l.53-.53l-.53.53ZM8.737 19.43l-.53.53l.53-.53Zm-4.116-4.12l.53-.53l-.53.53Zm12.945-.315l-.264-.702l.264.702Zm-1.917.72l.264.703l-.264-.702ZM8.332 8.383l-.704-.258l.704.258Zm.695-1.896l.704.258l-.704-.258Zm-3.182 4.188l.2.723l-.2-.723Zm1.457-.539l-.438-.609l.438.61Zm.374-.345l.57.487l-.57-.487Zm6.575 6.59l.491.568l-.49-.567Zm-.87 1.821l-.723-.199l.723.2Zm.536-1.454l-.61-.438l.61.438ZM2.719 12.755l-.75.005l.75-.005Zm.212-.803l-.65-.374l.65.374Zm8.374 9.391l.001-.75v.75Zm.788-.208l-.371-.652l.371.652Zm9.872-8.83l.733.158l-.733-.158ZM11.697 2.036l.162.732l-.162-.732Zm10.658 8.594a.75.75 0 1 0-1.305.74l1.305-.74Zm-4.349-2.6a.75.75 0 0 0 1.061-1.06l-1.061 1.06ZM9.269 18.9l-4.117-4.12l-1.06 1.06l4.116 4.12l1.061-1.06Zm8.034-4.607l-1.917.72l.528 1.405l1.917-.72l-.528-1.405ZM9.036 8.64l.695-1.896l-1.408-.516l-.695 1.896l1.408.516Zm-2.992 2.756c.712-.196 1.253-.334 1.696-.652l-.876-1.218c-.173.125-.398.198-1.218.424l.398 1.447Zm1.584-3.272c-.293.8-.385 1.018-.523 1.18l1.142.973c.353-.415.535-.944.79-1.637l-1.409-.516Zm.112 2.62c.187-.135.357-.292.507-.467l-1.142-.973a1.366 1.366 0 0 1-.241.222l.876 1.218Zm7.646 4.268c-.689.26-1.214.445-1.626.801l.982 1.135c.16-.14.377-.233 1.172-.531l-.528-1.405ZM14.104 18.4c.225-.819.298-1.043.422-1.216l-1.218-.875c-.318.443-.455.983-.65 1.693l1.446.398Zm-.344-2.586c-.17.146-.322.313-.452.495l1.218.875c.063-.087.135-.167.216-.236l-.982-1.135Zm-8.608-1.036c-.646-.647-1.084-1.087-1.368-1.444c-.286-.359-.315-.514-.315-.583l-1.5.009c.003.582.292 1.07.641 1.508c.35.44.861.95 1.481 1.57l1.061-1.06Zm.494-4.828c-.845.234-1.542.424-2.063.634c-.52.208-1.012.49-1.302.994l1.3.748c.034-.06.136-.18.56-.35c.424-.17 1.022-.337 1.903-.58L5.646 9.95Zm-2.177 2.8a.84.84 0 0 1 .111-.424l-1.3-.748a2.34 2.34 0 0 0-.311 1.182l1.5-.01Zm4.739 7.21c.624.624 1.137 1.139 1.579 1.49c.44.352.931.642 1.517.643l.002-1.5c-.069 0-.224-.029-.585-.316c-.36-.286-.802-.727-1.452-1.378l-1.061 1.06Zm4.45-1.958c-.245.888-.412 1.49-.583 1.917c-.172.428-.293.53-.353.564l.743 1.303c.51-.29.792-.786 1.002-1.309c.21-.524.402-1.225.637-2.077l-1.446-.398Zm-1.354 4.091c.407 0 .807-.105 1.161-.307l-.743-1.303a.835.835 0 0 1-.416.11l-.002 1.5Zm6.527-6.397c1.361-.511 2.463-.923 3.246-1.358c.795-.44 1.431-.996 1.621-1.875l-1.466-.317c-.054.25-.232.52-.883.88c-.663.369-1.638.737-3.046 1.266l.528 1.404ZM16.52 4.42c-1.036-1.037-1.872-1.876-2.595-2.414c-.734-.544-1.508-.897-2.39-.702l.324 1.464c.25-.055.569-.005 1.171.443c.613.455 1.358 1.197 2.429 2.27l1.061-1.06ZM9.731 6.744c.522-1.423.885-2.41 1.25-3.08c.36-.66.628-.84.878-.896l-.323-1.464c-.882.194-1.435.84-1.872 1.642c-.431.792-.837 1.906-1.341 3.282l1.408.516Zm11.32 4.626c.2.355.224.58.181.776l1.466.317c.142-.657-.018-1.26-.343-1.833l-1.305.74Zm-5.592-5.89l2.547 2.55l1.061-1.06l-2.547-2.55l-1.061 1.06Z"/><path d="M1.47 21.47a.75.75 0 0 0 1.06 1.06l-1.06-1.06Zm5.714-3.598a.75.75 0 0 0-1.061-1.06l1.06 1.06ZM2.53 22.53l4.653-4.658l-1.061-1.06l-4.654 4.658l1.062 1.06Z"/></g></svg>
                       </div>
                    </router-link>
                </div>
            </div>
        </section>

        <!-- Section 2-->
        <section>
            <div class="w-full flex items-center justify-between border-b border-slate-700/20 dark:border-slate-700/75 pb-2 px-1">
                <p class="font-semibold text-slate-800 dark:text-white inline-flex items-center space-x-2 text-xl">
                    <WidgetIcon />
                    <span>Semua Menu</span> 
                </p>
                <p class="text-sm hidden md:block text-slate-700 dark:text-slate-50">Semua fitur metadata</p>
            </div>

            <div class="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 pt-6 pb-2">
                <MainMenu 
                    v-for="menu in mainMenu" 
                    :key="menu.id"
                    :menu="menu"
                />
            </div>
        </section>
        <ModalSearch :open="isSearch" @close-modal="onSearch"/>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { dayGreeting } from '@/utils/helperFunction';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUser } from '@/services';
import ModalSearch from '@/components/shared/ModalSearch.vue';
import QuickMenu from '@/components/app/QuickMenu.vue';
import Svg3 from '@/components/svg/Svg3.vue';
import MainMenu from '@/components/app/MainMenu.vue';
import { mainMenu, quickMenu } from '@/assets/data/data-menu';
import ChartIcon from '@/components/svg/ChartIcon.vue';
import WidgetPlusIcon from '@/components/svg/WidgetPlusIcon.vue';
import WidgetIcon from '@/components/svg/WidgetIcon.vue';

const userService = useUser();
const router = useRouter();

const { currentUser, getSurahNameBacaan, getLoginAsInfo } = storeToRefs(userService);
const isSearch = ref(false);
const isLogedIn = ref(localStorage.getItem('_uid'));

const onLanjutBacaan = () => {
    router.push({
        name: 'AlquranPageDetail',
        query: {
            sn: currentUser.value?.bacaanku?.sura_id,
            an: currentUser.value?.bacaanku?.aya_number,
            next_bacaan: 'true'
        }
    })
}

const onSearch = (flag: boolean) => {
    isSearch.value = flag;
}

const getFirstName = (fullName: string) => {
    return fullName ? fullName.split(" ")[0] : 'Santri';
}
</script>