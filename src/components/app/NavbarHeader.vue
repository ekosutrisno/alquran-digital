<template>
  <Disclosure as="nav">
    <div :class="[wideMenu ? '' : 'max-w-7xl']" class="mx-auto sm:px-4 md:px-6 antialiased">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex-1 flex items-center sm:items-stretch sm:justify-start">
          <router-link to="/" class="flex-shrink-0 flex items-center text-2xl">
              <span>
                <img src="@/assets/v4.svg" alt="logo" class="h-7 w-7">
              </span>
              <p class="font-semibold lg:font-bold text-gradien ml-1.5">Al-Quran<span class="hidden md:inline"> Digital</span><span class="align-super ml-1.5 text-xs border py-0.5 px-2 font-medium rounded-full border-sky-500 text-sky-500">Beta</span></p>
          </router-link>
          <div class="hidden sm:block sm:ml-6 with-transition">
            <div class="flex space-x-4">
              <router-link 
                  v-for="item in navigation" 
                  :key="item.name" 
                  :to="item.href"
                  exact-active-class="hidden transition"
                  :class="[ $route.name == item.name ? '' : 'text-white bg-sky-500 hover:bg-sky-400 dark:text-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:text-white', 'px-3 py-2 with-transition rounded-md text-sm font-medium']" 
              >
                <span class="sr-only">{{ item.name }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div class="bg-white dark:bg-slate-900 relative pointer-events-auto">
            <button type="button" @click="emit('search')" class="hidden w-full lg:flex items-center text-sm leading-6 text-slate-700 dark:text-slate-200 rounded-md ring-1 ring-slate-700/10 dark:ring-slate-700/75 py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700">
              <svg width="24" height="24" fill="none" aria-hidden="true" class="mr-3 flex-none">
                <path d="m19 19-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
              </svg>
              
              Menu search...<span class="ml-auto pl-3 flex-none text-xs font-semibold">Press "ctrl + /"</span>
              </button>
          </div>

          
          <!-- Notification dropdown -->
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton class=" p-1 relative rounded-full cursor-default sm:cursor-pointer text-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-transparent focus:ring-sky-400">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
                <div 
                  v-if="state.notifications.length" 
                  class="bg-sky-500 text-white absolute -top-0.5 -right-1 rounded-full h-4 w-4 p-1 flex items-center justify-center text-[11px]">
                    {{state.notifications.length <= 3 ? state.notifications.length : `3+`}}
                </div>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
              <MenuItems class="origin-top-right card-shadow-md absolute z-10 right-0 mt-2 w-64 lg:min-w-[20rem] lg:w-auto lg:max-w-md rounded-md overflow-hidden bg-white dark:bg-slate-800 ring-1 ring-slate-700/10 dark:ring-slate-700/75 focus:outline-none">
                <MenuItem v-for="notif in state.notifications" :key="notif.id" v-slot="{ active }">
                  <router-link @click="readNotif(notif)" to="/app/dashboard/notification" :class="[active ? 'bg-slate-50 dark:bg-slate-700' : '', 'inline-flex items-start space-x-3 w-full px-4 py-3 text-slate-900 dark:text-white dark:bg-slate-800 with-transition']">
                    <NotificationType :type="notif.type" class="h-6 w-6" aria-hidden="true" />
                    <div class="flex flex-col">
                      <div class="text-sm w-auto font-semibold flex items-center justify-between">
                          <div>{{ notif.title }}</div>
                          <div> <div v-if="!notif.read" class="w-1 h-1 rounded-full bg-red-600"></div> </div>
                      </div>  
                      <span class="text-sm dark:text-slate-100 truncate max-w-[190px] lg:max-w-sm">{{ notif.body }}</span>
                      <span class="mt-1.5 text-xs">{{ formatDateFromNow(notif.timestamp) }}</span>
                    </div>
                  </router-link>
                </MenuItem>

                <div v-if="!state.notifications.length" class="py-4 flex flex-col items-center space-y-2">
                  <NoNotificationIcon />
                  <p class="text-xs text-center">Saat ini belum ada notifikasi yang masuk. </p>
                </div>
                <div class="flex flex-col border-t dark:border-slate-700/50 p-4 transition hover:bg-sky-100 dark:hover:bg-slate-700">
                  <router-link to="/app/dashboard/notification" class="inline-flex items-center justify-end space-x-3 text-sm">
                    <span>See all notifications </span>
                    <span>
                      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </router-link>
                </div>
              </MenuItems>
            </transition>
          </Menu>

          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3">
            <div v-if="state.isLogin">
              <MenuButton class="dark:bg-gray-800 bg-slate-100 z-0 flex cursor-default sm:cursor-pointer text-sm rounded-full focus:outline-none">
                <span class="sr-only">Open user menu</span>
                <div class="relative">
                    <img class="w-10 h-10 rounded-full" :src="getPhotoUrl" alt="Photo Profile">
                    <span :class="[online ? 'bg-green-400' : 'bg-red-600']" class="top-0 left-7 absolute  w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
              </MenuButton>
            </div>
            <div v-else>
              <router-link to="/auth/login" class="dark:bg-gray-800 p-1.5 dark:ring-slate-700/50 bg-slate-100 ring-1 ring-slate-700/10 z-0 flex cursor-default sm:cursor-pointer text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-400">
                <span class="sr-only">Open user menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </router-link>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
              <MenuItems class="origin-top-right z-10 absolute right-5 mt-2 w-64 rounded-md card-shadow-md overflow-hidden bg-white dark:bg-slate-800 ring-1 ring-slate-700/10 dark:ring-slate-700/75 focus:outline-none">
                <MenuItem>
                  <div :class="['p-4 relative h-full flex flex-col space-y-2 items-center justify-center bg-white border-b border-slate-700/10 dark:border-slate-700/50 dark:bg-slate-800 text-slate-800 dark:text-white']">
                     <img class="w-14 h-14 object-cover object-top border border-slate-700/10 dark:border-slate-700/50 rounded-full" :src="getPhotoUrl" alt="avatar-drop-menu">
                     <div class="text-center">
                       <p class="font-medium"> {{ getLoginAsInfo.fullName }} </p>
                       <p class="text-sm"> {{ getLoginAsInfo.email }} </p>
                     </div>
                     <div>
                       
                     </div>
                     <Svg2 aria-hidden="true" class="absolute -top-2"/>
                      <button type="button" class="absolute top-2 right-5">
                          <svg v-if="isDark" @click="togleDarkLightMode()" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <svg v-else @click="togleDarkLightMode()" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </svg>
                      </button>
                  </div>
                </MenuItem>

                <MenuItem v-slot="{ active }">
                  <router-link to="/app/dashboard/settings" :class="[active ? 'bg-slate-100 dark:bg-slate-700/75 transition' : '', 'inline-flex items-center space-x-2 w-full px-4 py-3 text-slate-600 font-medium dark:text-white']">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="text-slate-400 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Account settings</span>
                  </router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <router-link to="/privacy-policy" :class="[active ? 'bg-slate-100 dark:bg-slate-700/75 transition' : '', 'inline-flex items-center space-x-2 w-full px-4 py-3 text-slate-600 font-medium dark:text-white']">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="text-gray-400 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Privacy policy</span>
                  </router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button @click="onLogoutAction" :class="[active ? 'bg-slate-100 dark:bg-slate-700/75 transition' : '', 'inline-flex items-center space-x-2 w-full px-4 py-3 text-slate-600 font-medium dark:text-white']">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="text-gray-400 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign out</span>
                  </button>
                </MenuItem>
                <div class="p-4 text-xs text-right border-t border-slate-700/10 dark:border-slate-700/50">
                  App Version {{ getAppVersion}}
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from 'vue'
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/outline'
import { useRouter } from 'vue-router'
import { useAuth, useNotification, useUser, useUtil } from '@/services';
import Svg2 from '../svg/Svg2.vue'
import NotificationType from '../shared/NotificationType.vue';
import { useDark, useMagicKeys, useToggle, useOnline } from '@vueuse/core';
import { formatDateFromNow } from '@/utils/helperFunction';
import { UserNotification } from '@/types/user.interface';
import { storeToRefs } from 'pinia';
import NoNotificationIcon from '../svg/NoNotificationIcon.vue';

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard' }
]

const authService = useAuth();
const { getPhotoUrl, getLoginAsInfo } = storeToRefs(useUser());
const router = useRouter();
const { wideMenu, getAppVersion } = storeToRefs(useUtil());
const notificationService = useNotification();

const emit = defineEmits<{ (e: 'search'): void }>();

const state = reactive({
  open: false,
  navigation: navigation,
  theme: 'dark',
  userRole: computed(() => localStorage.getItem('_role')),
  isLogin: computed(() => localStorage.getItem('_uid')),
  notifications: computed(()=> notificationService.notifications.filter(notif=> !notif.read)
        .sort((a: UserNotification, b: UserNotification) => (new Date(b.timestamp).valueOf()) - (new Date(a.timestamp).valueOf()))
  )
})

const readNotif = async (notif: UserNotification) =>{
  await notificationService.readNotification(notif);
}

const isDark = useDark();
const togleDarkLightMode = useToggle(isDark);

const online = useOnline();

const onLogoutAction = () => {
    localStorage.removeItem('_uid');
    authService.onLogoutAction();
    router.replace('/auth/login');
}

const keys = useMagicKeys()
const shiftCtrlA = keys['ctrl + /']

watch(shiftCtrlA, (v) => {
  if (v)
    emit('search');
})
</script>