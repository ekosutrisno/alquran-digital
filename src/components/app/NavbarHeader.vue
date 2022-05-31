<template>
  <Disclosure as="nav">
    <div :class="[state.wideMenu ? '' : 'max-w-7xl']" class="mx-auto sm:px-4 md:px-6 antialiased">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex-1 flex items-center sm:items-stretch sm:justify-start">
          <router-link to="/" class="flex-shrink-0 font-semibold text-slate-800 dark:text-white flex items-center text-2xl">
              <span>
                <img src="@/assets/v4.svg" alt="logo" class="h-7 w-7">
              </span>
              <span class="font-semibold ml-1.5">Al-Quran Digital</span>
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
            <button type="button" class="hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-700/10 dark:ring-slate-700/75 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700">
              <svg width="24" height="24" fill="none" aria-hidden="true" class="mr-3 flex-none">
                <path d="m19 19-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
              </svg>
              
              Quick search...<span class="ml-auto pl-3 flex-none text-xs font-semibold">Ctrl K</span>
              </button>
          </div>

          
          <!-- Notification dropdown -->
          <Menu as="div" class="ml-3 relative z-50">
            <div>
              <MenuButton class=" p-1 relative rounded-full cursor-default sm:cursor-pointer text-gray-400 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-transparent focus:ring-sky-400">
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
                <div 
                  v-if="state.haveNotification.length" 
                  class="bg-sky-500 text-white absolute -top-0.5 -right-2 rounded-full h-4 w-4 p-1 flex items-center justify-center text-xs">
                    {{state.haveNotification.length <= 3 ? state.haveNotification.length : `3+`}}
                </div>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
              <MenuItems class="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg overflow-hidden bg-white dark:bg-slate-800 ring-1 ring-slate-700/10 dark:ring-slate-700/75 focus:outline-none">
                <MenuItem v-for="notif in state.haveNotification" :key="notif.timestamp" v-slot="{ active }">
                  <router-link to="/" :class="[active ? 'bg-slate-50 dark:bg-slate-700' : '', 'inline-flex items-start space-x-2 w-full px-4 py-3 text-slate-900 dark:text-white  dark:bg-slate-800']">
                    <BellIcon class="h-6 w-6 text-sky-300" aria-hidden="true" />
                    <div class="flex flex-col">
                      <span class="text-xs font-semibold">{{ notif.text }}</span>
                      <span class="text-xs dark:text-slate-100">{{ notif.data }}</span>
                    </div>
                  </router-link>
                </MenuItem>

                <!-- TODO integrate with notification service-->

              </MenuItems>
            </transition>
          </Menu>

          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative z-50">
            <div>
              <MenuButton class="dark:bg-gray-800 dark:ring-slate-700/50 bg-slate-100 ring-1 ring-slate-700/10 z-0 flex cursor-default sm:cursor-pointer text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-sky-400">
                <span class="sr-only">Open user menu</span>
                <img class="h-10 w-10 p-1  rounded-full" :src="state.photoUrl" alt="profile-avatar" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
              <MenuItems class="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg overflow-hidden bg-white dark:bg-slate-800 ring-1 ring-slate-700/10 dark:ring-slate-700/75 focus:outline-none">
                <MenuItem>
                  <div :class="['p-4 relative h-full flex flex-col space-y-2 items-center justify-center bg-white border-b border-slate-700/10 dark:border-slate-700/50 dark:bg-slate-800 text-slate-800 dark:text-white']">
                     <img class="w-14 h-14 object-cover border border-slate-700/10 dark:border-slate-700/50 rounded-full" :src="state.photoUrl" alt="avatar-drop-menu">
                     <div class="text-center">
                       <p class="font-medium"> {{ state.loginAsInfo.fullName }} </p>
                       <p class="text-sm"> {{ state.loginAsInfo.email }} </p>
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
                    <span>User settings</span>
                  </router-link>
                </MenuItem>
                <MenuItem v-if="true" v-slot="{ active }">
                  <router-link to="/app/dashboard/admin" :class="[active ? 'bg-slate-100 dark:bg-slate-700/75 transition' : '', 'inline-flex items-center space-x-2 w-full px-4 py-3 text-slate-600 font-medium dark:text-white']">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="text-gray-400 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Admin Views</span>
                  </router-link>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <router-link to="/docs" :class="[active ? 'bg-slate-100 dark:bg-slate-700/75 transition' : '', 'inline-flex items-center space-x-2 w-full px-4 py-3 text-slate-600 font-medium dark:text-white']">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="text-gray-400 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Help</span>
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
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/outline'
import { useRouter } from 'vue-router'
import { useAuth, useUser, useUtil } from '@/services';
import Svg2 from '../svg/Svg2.vue'
import { useDark, useToggle } from '@vueuse/core';

const navigation = [
  { name: 'Dashboard', href: '/app/dashboard' }
]

const authService = useAuth();
const userService = useUser();
const router = useRouter();
const utilService = useUtil();

const state = reactive({
  wideMenu: computed(()=>utilService.wideMenu),
  open: false,
  navigation: navigation,
  theme: 'dark',
  photoUrl: computed(()=> userService.getPhotoUrl),
  loginAsInfo: computed(()=>userService.getLoginAsInfo),
  userRole: computed(() => localStorage.getItem('_role')),
  haveNotification:  [
    {
      timestamp:1,
      text: 'One Notfication',
      data: 'Chat from Bu Ina'
    },
    {
      timestamp:2,
      text: 'Two Notfication',
      data: 'Hi, semua tugas...'
    },
  ],
})

const isDark = useDark()
const togleDarkLightMode = useToggle(isDark)

const onLogoutAction = () => {
    localStorage.removeItem('_uid');
    authService.onLogoutAction();
    router.replace('/auth/login');
}


const notAdmin = computed(()=> {
  const exclude = ['6','7'];
  return exclude.includes(state.userRole as string);
})

</script>