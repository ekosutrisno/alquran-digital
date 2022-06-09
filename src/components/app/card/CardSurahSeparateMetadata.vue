<template>
   <div class="mx-auto with-transition card-shadow-sm mb-4 w-full max-w-sm text-sm text-center relative group nv-transition text-slate-800 dark:text-slate-300 bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700/50 p-2 font-semibold rounded-full select-none">
      <h3 class="text-sky-500 my-1">({{state.surat.surat_golongan}}) ({{state.surat.id}}) | <span class="font-quran"> {{state.surat.surat_text_full}}</span></h3>
      <p> {{state.surat.surat_name}} <span class="text-slate-600 dark:text-slate-400 font-thin"> ({{state.surat.surat_terjemahan}}) </span><span class="text-slate-600 dark:text-slate-400 font-thin"> | {{state.surat.count_ayat}} Ayat</span> </p>
   </div>
</template>

<script setup lang="ts">
import { db } from '@/services/useFirebase';
import { SurahData } from '@/types/alquran.interface';
import { doc, getDoc } from 'firebase/firestore';
import { onMounted, reactive} from 'vue'

const props = defineProps<{sura_id: number}>()

const state = reactive({
    surat_id: props.sura_id,
    surat: {
        surat_golongan:"",
        surat_text_full:"",
        surat_name:"",
        surat_terjemahan:"",
        count_ayat: 0,
        id:0
    } as SurahData
});

onMounted(()=> getSuratDetail());

const getSuratDetail =() => {
        const surahMetdataRef = doc(db, 'surah_collections', `${state.surat_id}`)  
         getDoc(surahMetdataRef)
            .then(doc =>{
                if (doc.exists()) {
                    state.surat = doc.data() as SurahData;
                }
            })
      }
</script>