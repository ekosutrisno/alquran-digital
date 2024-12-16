<template>
   <div :id="`surat_${ayat.sura_id}_ayat_${ayat.aya_number}`" class="w-full mx-auto">
      
      <div v-if="isBacaan">
         <CardSurahSeparateMetadata 
            :sura_id="ayat.sura_id"
         />
      </div>
      <div class="mt-4" v-else>
         <CardSurahSeparateMetadata 
            v-if="ayat.is_new_surat && isTafsir == false && isFavorite == false" 
            :sura_id="ayat.sura_id"
         />
      </div>
      
      <div class="w-full prose relative group with-transition text-slate-800 dark:text-slate-200 py-4 transition max-w-full mx-auto text-right px-4 text-xl sm:text-2xl rounded border-r-4 border-transparent sm:cursor-pointer hover:border-sky-400 hover:card-shadow-sm hover:bg-white dark:hover:bg-dark-blue hover:ring-1 ring-slate-700/10 dark:ring-slate-700 select-none md:select-auto">
         <p class="font-quran mb-4"> 
            <span class="leading-loose dark:font-normal">{{ayat.aya_text}}</span>   
            <span class="text-2xl font-mono"> &minus; {{convertToArab(`${ayat.aya_number}`)}}</span> 
         </p> 

         <p v-if="ayahConfig.showTransliteration" class="text-base font-normal text-left dark:text-slate-100"> 
            <span class="font-medium lining-nums">{{ayat.sura_id}}:{{ayat.aya_number}} </span> - <span class="text-sky-500 dark:text-sky-300 font-medium">Juz {{ayat.juz_id}}</span> | <span class="font-medium">{{ ayat.transliteration.en}}</span>
         </p>
         <p v-if="ayahConfig.showTranslation" class="text-base font-normal text-left mt-4 dark:text-slate-100"> 
            {{ayat.translation_aya_text}}
         </p>
         
         <div class="hidden group-hover:inline with-transition-fast">
            <svg v-if="state.playAudio" @click="togglePlay"  class="absolute top-2 left-2 w-5 text-gray-400 hover:text-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
               <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clip-rule="evenodd" />
            </svg>
            <svg v-else @click="togglePlay" class="absolute top-2 left-2 w-5 text-gray-400 hover:text-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
               <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
         </div>

         <div class="w-full mt-6">
            <audio v-if="state.playAudio" class="focus:outline-none mb-4 sm:mr-4 sm:mb-0 float-right nv-transition mt-2 h-8 w-full max-w-md bg-transparent" preload="auto" :src="ayat.audio" controls>
               <source v-for="(aud, idx) in ayat.audio_secondary" :key="idx" :src="aud" type = "audio/mp3" />
            </audio>
         </div>
         
         <div class="text-xs w-full font-medium dark:text-slate-400 inline-flex space-x-1 items-center mt-3 text-left"> 
            <span v-if="isMyFavorite(ayat.aya_id)" class="text-sky-600">
               <svg class="w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
               </svg>
            </span>
            <span v-if="myBacaanku?.aya_id == ayat.aya_id" class="text-green-500">
               <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checks inline" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M7 12l5 5l10 -10"></path>
                  <path d="M2 12l5 5m5 -5l5 -5"></path>
               </svg>
            </span>
            <span><span class="text-green-500 dark:text-green-300">(Page: {{ayat.page_number}})</span> <span class="text-red-500 dark:text-red-300">(Manzil: {{ayat.manzil}})</span> <span class="text-indigo-500 dark:text-indigo-300">(Rukuk: {{ayat.rukuk}})</span> </span>
            <span v-if="ayat.sajda" class="text-yellow-500">
            - Sajda 
               <svg class="w-4 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
               </svg>
            </span>
         </div>

         <!-- Menu Options -->
         <div class="absolute right-0 bottom-0 p-2">
            <div @click="hideMenuOption" class="relative">
               <svg class="sm:cursor-pointer w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
               </svg>

               <transition
                  enter-active-class="transition ease-out duration-100 transform"
                  enter-from-class="opacity-0 scale-95"
                  enter-to-class="opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75 transform"
                  leave-from-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-95"
               >
               
                  <div ref="target" v-if="state.option" class="p-2 w-40 font-normal absolute z-50 shadow-2xl shadow-sky-900/25 h-auto left-0 -bottom-6 -ml-36 mt-6 bg-white dark:bg-dark-blue rounded-md flex flex-col overflow-hidden ring-1 ring-slate-700/10 dark:ring-slate-700">
                        <button type="button" @click="checkTafsir(ayat)" class="w-full rounded text-sm group transition-colors cursor-default sm:cursor-pointer duration-300 text-slate-700 dark:text-slate-300 focus:outline-none p-2 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 inline-flex space-x-2">
                           <span>Buka tafsir ayah</span>
                        </button>
                        <button @click="onMarkBacaanku(ayat)" type="button" class="w-full rounded text-sm group transition-colors cursor-default sm:cursor-pointer duration-300 text-slate-700 dark:text-slate-300 focus:outline-none p-2 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 inline-flex space-x-2">
                           <span>Tandai bacaan</span>
                        </button>
                        <button v-if="isFavorite" @click="onRemoveFavorit(ayat.aya_id)" type="button" class="w-full rounded text-sm group transition-colors cursor-default sm:cursor-pointer duration-300 text-slate-700 dark:text-slate-300 focus:outline-none p-2 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 inline-flex space-x-2">
                           <span>Hapus favorit</span>
                        </button>
                        <button v-else @click="onMarkFavorit(ayat)" type="button" class="w-full rounded text-sm group transition-colors cursor-default sm:cursor-pointer duration-300 text-slate-700 dark:text-slate-300 focus:outline-none p-2 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 inline-flex space-x-2">
                           <span>Tandai favorit</span>
                        </button>
                  </div>
               </transition>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { useAyah, useUser, useUtil } from '@/services';
import { AyahData } from '@/types/alquran.interface';
import { reactive, ref } from 'vue';
import { convertToArab } from '@/utils/helperFunction';
import CardSurahSeparateMetadata from './CardSurahSeparateMetadata.vue';
import { onClickOutside } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

defineProps<{ ayat: AyahData, isBacaan?: boolean, isFavorite?: boolean, isTafsir?: boolean }>()

const ayahService = useAyah();
const { onCheckTafsir, onMarkFavorit, onRemoveFavorit, onMarkBacaanku } = ayahService;
const { isMyFavorite } = storeToRefs(ayahService);
const { ayahConfig } = storeToRefs(useUtil());


const { myBacaanku } = storeToRefs(useUser());
const router = useRouter();

const state = reactive({
   playAudio: false,
   option: false,
   showModal: false
});

const togglePlay = () => {
   state.playAudio = !state.playAudio;
}

const target = ref(null)
onClickOutside(target, () => hideMenuOption())

const hideMenuOption = () => {
   state.option = !state.option
}

const checkTafsir = (ayah: AyahData) => {
   onCheckTafsir(ayah)
      .then(() => {
         router.push({
            name: 'TafsirPageDetail',
            query: { an: ayah.aya_id, sn: ayah.sura_id }
         })
      })
}
</script>