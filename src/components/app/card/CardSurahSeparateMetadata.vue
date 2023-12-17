<template>
   <div class="mx-auto with-transition card-shadow-sm mb-4 w-full max-w-sm text-sm text-center relative group nv-transition text-slate-800 dark:text-slate-300 bg-white dark:bg-dark-blue ring-1 ring-slate-700/10 dark:ring-slate-700 p-2 pb-4 font-semibold rounded-full select-none">
      <h3 class="text-sky-500 my-1">({{surat.surat_golongan}}) ({{surat.id}}) | <span class="font-quran"> {{surat.surat_text_full}}</span></h3>
      <p> {{surat.surat_name}} <span class="text-slate-600 dark:text-slate-400 font-thin"> ({{surat.surat_terjemahan}}) </span><span class="text-slate-600 dark:text-slate-400 font-thin"> | {{surat.count_ayat}} Ayat</span> </p>
   </div>
</template>

<script setup lang="ts">
import { surahDataRefConfig } from '@/config/dbRef.config';
import { SurahData } from '@/types/alquran.interface';
import { getDoc } from 'firebase/firestore';
import { onMounted, ref } from 'vue'

const props = defineProps<{ sura_id: number }>()
const surat = ref<SurahData>({
    surat_golongan: "",
    surat_text_full: "",
    surat_name: "",
    surat_terjemahan: "",
    count_ayat: 0,
    id: 0
} as SurahData);

onMounted(() => getSuratDetail());

function getSuratDetail() {
    getDoc(surahDataRefConfig(String(props.sura_id)))
        .then(doc => {
            if (doc.exists()) {
                surat.value = doc.data() as SurahData;
            }
        })
}
</script>