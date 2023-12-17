<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10 font-quicksand" @close="onCloseModal">
      <div class="fixed inset-0 bg-gray-900/75 backdrop-blur-sm" />
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex w-full items-start justify-center min-h-full p-4 sm:p-0">
            <DialogPanel class="relative w-full bg-transparent rounded-2xl overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:max-w-screen-md sm:w-full">
              <div class="bg-white max-h-[36rem] flex flex-col rounded-2xl justify-between dark:bg-slate-800 border-2 border-transparent dark:border-slate-700/75">
                <div class="w-full border-b px-4 inline-flex items-center border-slate-700/10 dark:border-slate-700/50 flex-shrink-0 h-max">
                  <svg width="24" height="24" fill="none" aria-hidden="true" class="flex-none text-slate-400">
                    <path d="m19 19-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                  </svg>
                  <input type="text" v-model="query" placeholder="Type something..." class="w-full dark:text-white focus:ring-0 active:outline-none rounded bg-transparent px-3 py-3 outline-none border-none">
                  <button type="button" @click="onCloseModal" class="text-xs bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 dark:text-slate-300 dark:bg-slate-700/30 dark:hover:bg-slate-700/75 w-max rounded p-1 px-1.5">Esc</button>
                </div>
                <div v-if="filteredData.length" class="overflow-auto w-full flex-1 flex flex-col light-scroll">
                  <button 
                    type="button"
                    @click="goToPage(search.item)" 
                    v-for="(search, idx) in filteredData"
                    :key="idx"
                    class="w-full flex items-center justify-between transition-colors py-3 px-5 border-b border-slate-700/10 dark:border-slate-700/50 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700"
                   >
                      <div class="flex flex-col items-start space-y-2">
                        <p class="text-xs inline-flex items-center font-semibold text-slate-600 dark:text-slate-300 dark:bg-slate-700/30 border dark:border-slate-500/50 w-max rounded-full px-2"> 
                          <span>{{search.item.info}} </span>
                        </p>
                        <p class="inline-flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-sky-500 mr-1" viewBox="0 0 36 36"><path id="clarityHashtagSolid0" fill="currentColor" d="M31.87 10h-5.55l1-4.83A1 1 0 0 0 26.35 4h-2a1 1 0 0 0-1 .78L22.33 10h-5.4l1-4.83A1 1 0 0 0 17 4h-2a1 1 0 0 0-1 .78L13 10H7a1 1 0 0 0-1 .8l-.41 2a1 1 0 0 0 1 1.2h5.55l-1.64 8h-6a1 1 0 0 0-1 .8l-.41 2a1 1 0 0 0 1 1.2h5.59l-1 4.83a1 1 0 0 0 1 1.17h2a1 1 0 0 0 .95-.78L13.67 26h5.4l-1 4.83A1 1 0 0 0 19 32h2a1 1 0 0 0 1-.78L23.05 26h6a1 1 0 0 0 1-.8l.4-2a1 1 0 0 0-1-1.2h-5.58l1.63-8h6a1 1 0 0 0 1-.8l.41-2a1 1 0 0 0-1.04-1.2Zm-12 12h-5.4l1.64-8h5.4Z"/></svg>
                          <span>{{ search.item.text }}</span>
                          <span class="text-sm text-slate-500 hidden md:inline italic">, {{ search.item.desc }}</span>
                        </p>
                      </div>
                      <div v-show="idx == 0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-sky-400">
                          <path fill-rule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 001.075.676L10 15.082l5.925 2.844A.75.75 0 0017 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0010 2z" clip-rule="evenodd" />
                        </svg>

                      </div>
                   </button>
                </div>
                <div v-else class="w-full flex-1 flex justify-center space-x-2 items-center p-5 text-sky-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><circle cx="19" cy="3" r="3" fill="currentColor"/><path fill="currentColor" d="M7 8c-.55 0-1-.45-1-1s.45-1 1-1h8.03a4.906 4.906 0 0 1-.92-4H4.01a2 2 0 0 0-2 2L2 19.58c0 .89 1.08 1.34 1.71.71L6 18h14c1.1 0 2-.9 2-2V6.97C21.16 7.61 20.13 8 19 8H7zm6 6H7c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1zm4-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z"/></svg>
                  <p class="text-sm text-slate-400">Empty Result</p>
                </div>
                <div class="h-10 text-xs float-right py-3 pr-4 border-t border-slate-700/10 dark:border-slate-700/50">
                    <div class="float-right text-slate-800 dark:text-white">Search by <span class="font-semibold text-sky-500">Al-Qur'an Digital</span></div>
                </div>
              </div>
            </DialogPanel>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, TransitionRoot } from '@headlessui/vue'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { doSearch, SearchOption } from '@/utils/searchFunction';
import { menuSearchList } from '@/assets/data/search-menu';
import { SearchItem } from '@/types/user.interface';

const router = useRouter();
const query = ref('')

const emit = defineEmits<{ (e: 'close-modal', open: boolean): void }>();
defineProps<{ open: boolean }>();

const goToPage = (item: SearchItem) => {
  onCloseModal();
  router.push({ name: item.to, query: item.query, params: item.params });
}

const onCloseModal = () => {
  emit('close-modal', false);
  query.value = '';
}

const options: SearchOption = {
  keys: ["info", "text"],
  minMatchCharLength: 2
};

const filteredData = computed(() => doSearch(menuSearchList, query.value, options));
</script>