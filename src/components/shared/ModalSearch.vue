<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10 font-quicksand" @close="onCloseModal">
      <div class="fixed inset-0 bg-gray-900/75 backdrop-blur" />
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex w-full items-start justify-center min-h-full p-4 sm:p-0">
            <DialogPanel class="relative w-full bg-transparent rounded-2xl overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:max-w-screen-md sm:w-full">
              <div class="bg-white max-h-[36rem] flex flex-col rounded-2xl justify-between dark:bg-slate-800 border-2 border-transparent dark:border-slate-700/75">
                <div class="w-full border-b px-4 inline-flex items-center border-slate-700/10 dark:border-slate-700/50 flex-shrink-0 h-max">
                  <svg width="24" height="24" fill="none" aria-hidden="true" class="flex-none text-slate-400">
                    <path d="m19 19-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    <circle cx="11" cy="11" r="6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
                  </svg>
                  <input type="text" v-model="state.query" class="w-full dark:text-white focus:ring-0 active:outline-none rounded bg-transparent px-3 py-3 outline-none border-none">
                  <button type="button" @click="onCloseModal" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-900 dark:text-slate-300 dark:bg-slate-700/30 dark:hover:bg-slate-700/75 w-max rounded p-1 px-1.5">Cancel</button>
                </div>
                <div class="overflow-auto w-full flex-1 flex flex-col custom-scroll">
                  <button 
                    type="button"
                    @click="goToPage(search.to)" 
                    v-for="search in filteredData"
                    :key="search.id"
                    class="w-full flex items-center justify-between transition-colors py-3 px-3 border-b border-slate-700/10 dark:border-slate-700/50 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700"
                   >
                      <div class="flex flex-col items-start space-y-2">
                        <span class="text-xs bg-slate-100 text-slate-700 dark:text-slate-300 dark:bg-slate-700/30 border dark:border-slate-500/50 w-max rounded-full px-2"> {{search.info}} </span>
                        <span class="font-medium">{{ search.text }}</span>
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                   </button>
                </div>
                <div class="h-10 text-xs float-right py-3 pr-4 border-t border-slate-700/10 dark:border-slate-700/50">
                    <div class="float-right text-slate-800 dark:text-white">Search by <span class="font-semibold text-sky-500">Al-Quran Digital 2.0</span></div>
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
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const emit  = defineEmits<{(e: 'close-modal', open:boolean): void}>();
defineProps<{open: boolean}>();

interface SearchItem{
  id: number;
  info: string;
  text: string;
  to: string;
}

const goToPage = (path: string) =>{
  onCloseModal();
  router.push(path);
}

const onCloseModal = ()=>{
  emit('close-modal', false);
  state.query= '';
}

const state = reactive({
  query: '',
  data: [
  {
    to:'/app/dashboard',
    id: 1,
    info: 'Dashboard',
    text: 'Dashboard'
  },
  {
    to:'/app/dashboard/bacaanku',
    id: 2,
    info: 'Bacaanku Page',
    text: 'Bacaanku'
  },
  {
    to:'/app/dashboard/favorite',
    id: 3,
    info: 'Favorite Page',
    text: 'Favorite'
  },
  {
    to:'/app/dashboard/settings',
    id: 4,
    info: 'User Settings Page',
    text: 'User Settings'
  },
  {
    to:'/app/dashboard/surah-pilihan',
    id: 5,
    info: 'Surah Pilihan Page',
    text: 'Surah Pilihan'
  },
  {
    to:'/app/dashboard/class-room',
    id: 6,
    info: 'Class Room Page',
    text: 'Class Room'
  },
  {
    to:'/app/dashboard/surah',
    id: 7,
    info: 'List of Surah Metadata',
    text: 'Surah'
  },
] as SearchItem[]
})


const filteredData = computed(()=> state.data
  .filter((data) => data.text.toLowerCase().includes(state.query.toLowerCase().trim()))
)
</script>