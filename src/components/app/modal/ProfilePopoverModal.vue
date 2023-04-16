<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10 font-quicksand" @close="onCloseModal">
            <div class="fixed inset-0 bg-slate-900/75 backdrop-blur-sm" />
            <div class="fixed z-10 inset-0 overflow-y-auto">
                <div class="flex w-full items-start justify-center min-h-full p-4 sm:p-0">
                    <DialogPanel class="relative w-full bg-transparent rounded-2xl overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:max-w-screen-md sm:w-full">
                        <div class="bg-white p-5 flex flex-col rounded-2xl justify-between dark:bg-slate-800 border-2 border-transparent dark:border-slate-700/75">
                            <div class="inline-block text-sm text-slate-500 dark:text-slate-400 dark:bg-slate-800 dark:border-slate-600">
                                <div class="p-3 w-full">
                                    <div class="flex items-center justify-between mb-2">
                                        <img class="w-10 h-10 rounded-full" :src="member.photo_url" :alt="member.full_name">
                                        <div>
                                            <button type="button" class="text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-sky-600 dark:hover:bg-sky-700 focus:outline-none dark:focus:ring-sky-800">Follow</button>
                                        </div>
                                    </div>
                                    <p class="text-base font-semibold leading-none text-slate-900 dark:text-white">
                                        {{ member.full_name }}
                                    </p>
                                    <p class="mb-3 mt-1 text-sm font-normal">
                                        <span class="">{{ `${member.username}` }}</span> | 
                                        <span class="text-sky-600 dark:text-sky-500">{{ member.email }}</span>
                                    </p>
                                    <p class="mb-4 text-sm w-full">{{ member.about }}</p>
                                    <ul class="flex text-sm">
                                        <li class="mr-2">
                                            <RouterLink to="#" class="hover:text-sky-400 space-x-1">
                                                <span class="font-semibold text-slate-900 dark:text-white">{{ 0 }}</span>
                                                <span>Following</span>
                                            </RouterLink>
                                        </li>
                                        <li>
                                            <RouterLink to="#" class="hover:text-sky-400 space-x-1">
                                                <span class="font-semibold text-slate-900 dark:text-white">{{ 0 }}</span>
                                                <span>Followers</span>
                                            </RouterLink>
                                        </li>
                                    </ul>

                                    <div v-if="member.bacaanku" class="w-full prose max-w-none mt-5 text-slate-500 dark:text-slate-200">
                                        Bacaan Terakhir: 
                                        <p class="font-quran w-full text-right font-semibold mt-2">
                                            {{ member.bacaanku.aya_text }} <span class="font-mono">&minus; {{convertToArab(String(member.bacaanku.aya_number))}}</span>
                                        </p>
                                        Q.S. <span class="font-medium lining-nums">{{member.bacaanku.sura_id}}:{{member.bacaanku.aya_number}} </span> - <span class="text-sky-500 font-medium">Juz {{member.bacaanku.juz_id}}</span>
                                        
                                    </div>
                                    <button type="button" @click="onCloseModal" class="text-xs float-right bg-white hover:bg-slate-100 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-300 dark:bg-slate-700/30 dark:hover:bg-slate-700/75 w-max rounded px-3 py-1.5">Close</button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { User } from '@/types/user.interface';
import { convertToArab } from '@/utils/helperFunction';
import { Dialog, DialogPanel, TransitionRoot } from '@headlessui/vue'

defineProps<{ open: boolean, member: User }>();
const emit = defineEmits<{ (e: 'close-modal', open: boolean): void }>();

const onCloseModal = () => {
    emit('close-modal', false);
}
</script>