<template>
  <Disclosure as="nav">
    <div :class="[wideMenu ? '' : 'max-w-7xl']" class="mx-auto sm:px-4 antialiased">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex-1 flex items-center sm:items-stretch sm:justify-start">
          <RouterLink to="/" class="flex-shrink-0 flex items-center text-2xl">
              <p class="font-semibold lg:font-bold text-gradien ml-1.5">Al-Qur'an<span class="hidden md:inline"> Digital</span><span class="align-super hidden ml-1.5 text-xs border py-0.5 px-2 font-medium rounded-full border-sky-500 text-sky-500">Beta</span></p>
          </RouterLink>
          <div class="hidden sm:block with-transition">
            <div class="flex space-x-4">
              <RouterLink 
                  v-for="item in navigation" 
                  :key="item.name" 
                  :to="item.href"
                  exact-active-class="hidden transition"
                  :class="[ route.name == item.name ? '' : 'text-sky-500', 'px-3 py-2 with-transition rounded-md text-sm font-medium']" 
              >
                <span class="sr-only">{{ item.name }}</span>
                <WidgetIcon/>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div class="bg-white dark:bg-slate-900 relative pointer-events-auto">
            <button type="button" @click="emit('search')" class="hidden w-full lg:flex items-center text-sm leading-6 text-slate-700 dark:text-slate-200 rounded-md ring-1 ring-slate-700/10 dark:ring-slate-700/75 py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700">
              <SearchIcon class="mr-3 flex-none h-4"/>
              Pencarian menu...<span class="ml-auto pl-3 flex-none text-xs font-semibold">Tekan "ctrl + /"</span>
            </button>
          </div>
          
          <!-- Notification dropdown -->
          <Menu as="div" class="ml-3 relative">
            <div v-if="isLogin">
              <MenuButton class="p-1 relative rounded-full cursor-default sm:cursor-pointer text-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-transparent focus:ring-sky-400">
                <span class="sr-only">View notifications</span>
                <BelIcon />
                <div v-if="unReadNotification.length" class="bg-sky-500 absolute top-0.5 right-[3px] rounded-full h-2 w-2 p-1"></div>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
              <MenuItems class="origin-top-right card-shadow-md absolute z-10 right-0 mt-2 w-64 lg:min-w-[20rem] lg:w-auto lg:max-w-md rounded-md overflow-hidden bg-white dark:bg-slate-800 ring-1 ring-slate-700/10 dark:ring-slate-700/75 focus:outline-none">
                <MenuItem v-for="notif in unReadNotification" :key="notif.id" v-slot="{ active }">
                  <div @click="readNotification(notif)" :class="[active ? 'bg-slate-50 dark:bg-slate-700' : '', 'md:cursor-pointer inline-flex items-start space-x-3 w-full px-4 py-3 text-slate-900 dark:text-white dark:bg-slate-800 with-transition']">
                    <NotificationType :type="notif.type" class="h-6 w-6" aria-hidden="true" />
                    <div class="flex flex-col">
                      <div class="text-sm w-auto font-semibold flex items-center space-x-2">
                          <div>{{ notif.title }}</div>
                          <div>                    
                             <NotifUnreadIcon v-if="!notif.read" class="w-4 h-4 text-sky-500 animate-bounce" aria-hidden="true"/>
                           </div>
                      </div>  
                      <span class="text-sm dark:text-slate-100 truncate max-w-[190px] lg:max-w-sm">{{ notif.body }}</span>
                      <span class="mt-1.5 text-xs">{{ formatDateFromNow(notif.timestamp) }}</span>
                    </div>
                  </div>
                </MenuItem>

                <div v-if="!unReadNotification.length" class="py-4 flex flex-col items-center space-y-2">
                  <NoNotificationIcon />
                  <p class="text-sm text-center">Tidak ada notifikasi. </p>
                </div>
                <MenuItem class="flex w-full border-t dark:border-slate-700/50 p-4 transition hover:bg-sky-50 dark:hover:bg-slate-700">
                  <button @click="router.push({name: 'NotificationPage'})" class="inline-flex items-center justify-end space-x-3 text-sm">
                    <span>Lihat semua pesan </span>
                    <span>
                      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>

          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3">
            <div v-if="isLogin">
              <MenuButton class="dark:bg-gray-800 bg-slate-100 z-0 flex cursor-default sm:cursor-pointer text-sm rounded-full focus:outline-none">
                <span class="sr-only">Open user menu</span>
                <div class="relative">
                    <img class="w-10 h-10 rounded-full" :src="getPhotoUrl" alt="Photo Profile">
                    <span :class="[online ? 'bg-green-400' : 'bg-red-600']" class="top-0 left-7 absolute  w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
              </MenuButton>
            </div>
            <div v-else>
              <RouterLink to="/auth/login" class="dark:bg-gray-800 p-1.5 dark:ring-slate-700 bg-slate-100 ring-1 ring-slate-700/10 z-0 flex cursor-default sm:cursor-pointer text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-sky-400">
                <span class="sr-only">Open user menu</span>
                <LoginIcon />
              </RouterLink>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
              <MenuItems class="origin-top-right z-10 absolute right-5 mt-2 w-64 rounded-lg card-shadow-md overflow-hidden bg-white dark:bg-slate-800 ring-1 ring-slate-700/10 dark:ring-slate-700/75 focus:outline-none">
                <MenuItem>
                  <div :class="['p-4 relative h-full flex flex-col space-y-2 items-center justify-center bg-white border-b border-slate-700/10 dark:border-slate-700/50 dark:bg-slate-800 text-slate-800 dark:text-white']">
                     <img class="w-14 h-14 object-cover object-top border border-slate-700/10 dark:border-slate-700/50 rounded-full" :src="getPhotoUrl" alt="avatar-drop-menu">
                     <div class="text-center">
                       <p class="font-medium"> {{ getLoginAsInfo.fullName }} </p>
                       <p class="text-sm"> {{ getLoginAsInfo.email }} </p>
                     </div>
                      <Svg2 aria-hidden="true" class="absolute -top-2"/>
                      <button type="button" class="absolute top-2 right-5">
                          <LightModeIcon class="h-6 w-6 text-sky-500" v-if="isDark" @click="togleDarkLightMode()"/>
                          <DarkModeIcon class="h-6 w-6 text-sky-500" v-else @click="togleDarkLightMode()"/>
                      </button>
                  </div>
                </MenuItem>

                <MenuItem v-slot="{ active }" class="pt-2">
                  <div class="px-3 py-px">
                    <button @click="router.push({name: 'SettingPage', query: {tab: 'profile'}})" :class="[active ? 'bg-slate-100 dark:bg-slate-700/75 transition' : '', 'group rounded-md inline-flex items-center space-x-2 w-full p-2 text-slate-600 font-medium dark:text-white']">
                      <ProfileIcon class="text-slate-400 group-hover:text-sky-500 transition-colors w-5 h-5"/>
                      <span>Profile</span>
                    </button>
                  </div>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <div class="px-3 py-px">
                    <button @click="router.push({name: 'SettingPage', query: {tab: 'account'}})" :class="[active ? 'bg-slate-100 dark:bg-slate-700/75 transition' : '', 'group rounded-md inline-flex items-center space-x-2 w-full p-2 text-slate-600 font-medium dark:text-white']">
                      <GearIcon class="text-slate-400 group-hover:text-sky-500 transition-colors w-5 h-5"/>
                      <span>Pengaturan</span>
                    </button>
                  </div>
                </MenuItem>
                <MenuItem v-slot="{ active }" class="pb-2">
                  <div class="px-3 py-px">
                    <button @click="onLogoutAction" :class="[active ? 'bg-slate-100 dark:bg-slate-700/75 transition' : '', 'group rounded-md inline-flex items-center space-x-2 w-full p-2 text-slate-600 font-medium dark:text-white']">
                      <LogoutIcon class="text-slate-400 group-hover:text-sky-500 transition-colors w-5 h-5"/>
                      <span>Keluar</span>
                    </button>
                  </div>
                </MenuItem>
                <div class="p-4 text-xs text-right border-t border-slate-700/10 dark:border-slate-700/50">
                  Versi {{ getAppVersion}}
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
import { computed, watch } from 'vue'
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useUser, useUtil } from '@/services';
import { useAuth } from '@/services/useAuth';
import { useNotification } from '@/services/useNotification';
import Svg2 from '../svg/Svg2.vue'
import NotificationType from '../shared/NotificationType.vue';
import { useDark, useMagicKeys, useToggle, useOnline } from '@vueuse/core';
import { formatDateFromNow } from '@/utils/helperFunction';
import { storeToRefs } from 'pinia';
import NoNotificationIcon from '../svg/NoNotificationIcon.vue';
import NotifUnreadIcon from '../svg/NotifUnreadIcon.vue';
import BelIcon from '../svg/BelIcon.vue';
import SearchIcon from '../svg/SearchIcon.vue';
import GearIcon from '../svg/GearIcon.vue';
import LogoutIcon from '../svg/LogoutIcon.vue';
import ProfileIcon from '../svg/ProfileIcon.vue';
import LoginIcon from '../svg/LoginIcon.vue';
import WidgetIcon from '../svg/WidgetIcon.vue';
import { decrypt } from '@/utils/cryp';
import LightModeIcon from '../svg/LightModeIcon.vue';
import DarkModeIcon from '../svg/DarkModeIcon.vue';

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard' }
]

const router = useRouter();
const route = useRoute();
const authService = useAuth();
const { getPhotoUrl, getLoginAsInfo } = storeToRefs(useUser());
const { wideMenu, getAppVersion } = storeToRefs(useUtil());
const notificationService = useNotification();
const { readNotification } = notificationService;
const { unReadNotification } = storeToRefs(notificationService);

const emit = defineEmits<{ (e: 'search'): void }>();

const isLogin = computed(() => decrypt(String(localStorage.getItem("_uid"))))

const isDark = useDark();
const togleDarkLightMode = useToggle(isDark);

const online = useOnline();

const onLogoutAction = () => {
  authService.onLogoutAction()
    .then(() => {
      localStorage.removeItem('_uid');
      router.replace('/auth/login');
    });
}

const keys = useMagicKeys();
const shiftCtrlA = keys['ctrl + /'];

watch(shiftCtrlA, (v) => {
  if (v)
    emit('search');
})
</script>