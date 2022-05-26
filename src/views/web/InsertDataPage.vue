<template>
    <div class="flex flex-wrap items-center p-6">
        <button disabled
            class="bg-slate-900 disabled:bg-red-500 dark:disabled:bg-red-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 dark:ring-0 dark:focus:ring-offset-0"
            @click="insertSuratAndAyat">
            Insert Surah and Ayah
        </button>

        <button disabled
            class="bg-slate-900 disabled:bg-red-500 dark:disabled:bg-red-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 dark:ring-0 dark:focus:ring-offset-0"
            @click="insertSuratMetadata">
            Insert Surah Menu Metadata
        </button>

        <button disabled
            class="bg-slate-900 disabled:bg-red-500 dark:disabled:bg-red-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 dark:ring-0 dark:focus:ring-offset-0"
            @click="insertRukukMetadata">
            Insert Rukuk Metadata
        </button>

        <button disabled
            class="bg-slate-900 disabled:bg-red-500 dark:disabled:bg-red-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 dark:ring-0 dark:focus:ring-offset-0"
            @click="insertJuzMetadata">
            Insert Juz Metadata
        </button>

        <button disabled
            class="bg-slate-900 disabled:bg-red-500 dark:disabled:bg-red-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 dark:ring-0 dark:focus:ring-offset-0"
            @click="insertManzilMetadata">
            Insert Manzil Metadata
        </button>

        <button disabled
            class="bg-slate-900 disabled:bg-red-500 dark:disabled:bg-red-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 dark:ring-0 dark:focus:ring-offset-0"
            @click="insertSajdaMetadata">
            Insert Sajda Metadata
        </button>

        <button disabled
            class="bg-slate-900 disabled:bg-red-500 dark:disabled:bg-red-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 dark:ring-0 dark:focus:ring-offset-0"
            @click="insertPageMetadata">
            Insert Page Metadata
        </button>

        <button
            disabled
            class="bg-slate-900 disabled:bg-red-500 dark:disabled:bg-red-500 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 dark:ring-0 dark:focus:ring-offset-0"
            @click="insertAyahMetadata">
            Insert Ayah Metadata
        </button>

    </div>
</template>

<script setup lang="ts">

import {
    suratAndAyat,
    pageMetadata,
    ayahMetadata,
    juzMetadata,
    manzilMetadata,
    rukukMetadata,
    sajdaMetadata,
    surahMetadata
} from '@/data';
import { db } from '@/services/useFirebase';
import { SurahAndAyah, AyahData, PageMetadata, SurahData, Metadata, SajdaMetadata } from '@/types/alquran.interface';
import { doc, setDoc } from '@firebase/firestore';

const insertSuratAndAyat = () => {

    suratAndAyat.forEach((surah: SurahAndAyah) => {
        const surah_collections_ref = doc(db, 'surah_collections', `${surah.surah_data.id}`);

        setDoc(surah_collections_ref, surah.surah_data)
            .then(() => {
                surah.ayah_data.forEach((ayah: AyahData) => {
                    const ayah_collections_ref = doc(surah_collections_ref, 'ayahs', `${ayah.aya_number}`);

                    setDoc(ayah_collections_ref, ayah)
                        .then(() => console.log(`Finis Insert Surah ke${surah.surah_data.id} 👍`));
                });
            });
    });
}

const insertSuratMetadata = () => {
    surahMetadata.forEach((surah: SurahData) => {
        const surah_meta_ref = doc(db, 'surah_menu_collections', `${surah.id}`);

        setDoc(surah_meta_ref, surah)
            .then(() => console.log(`Finis Insert Surah ke${surah.id} 👍`));
    });
}

const insertRukukMetadata = () => {
    let number = 1;
    rukukMetadata.forEach((rukuk: Metadata) => {
        const meta_ref = doc(db, 'rukuk_collections', `${number}`);

        rukuk.number = number;

        setDoc(meta_ref, rukuk)
            .then(() => console.log(`Finis Insert Count 👍`));

        number++;
    });
}

const insertJuzMetadata = () => {
    let number = 1;
    juzMetadata.forEach((juz: Metadata) => {
        const meta_ref = doc(db, 'juz_collections', `${number}`);

        juz.number = number;

        setDoc(meta_ref, juz)
            .then(() => console.log(`Finis Insert Count 👍`));

        number++;
    });
}

const insertManzilMetadata = () => {
    let number = 1;
    manzilMetadata.forEach((manzil: Metadata) => {
        const meta_ref = doc(db, 'manzil_collections', `${number}`);

        manzil.number = number;

        setDoc(meta_ref, manzil)
            .then(() => console.log(`Finis Insert Count 👍`));

        number++;
    });
}

const insertSajdaMetadata = () => {
    let number = 1;
    sajdaMetadata.forEach((sajda: SajdaMetadata) => {
        const meta_ref = doc(db, 'sajda_collections', `${number}`);

        sajda.number = number;

        setDoc(meta_ref, sajda)
            .then(() => console.log(`Finis Insert Count 👍`));

        number++;
    });
}

const insertPageMetadata = () => {
    pageMetadata.forEach((page: PageMetadata) => {
        const meta_ref = doc(db, 'page_collections', `${page.page}`);

        setDoc(meta_ref, page)
            .then(() => console.log(`Finis Insert Count 👍`));
    });
}

const insertAyahMetadata = () => {
    ayahMetadata.forEach((ayah: AyahData) => {
        const meta_ref = doc(db, 'ayah_collections', `${ayah.aya_id}`);

        setDoc(meta_ref, ayah)
            .then(() => console.log(`Finis Insert Count 👍`));
    });
}

</script>