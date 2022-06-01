import { AyahData, SurahData } from "@/types/alquran.interface";
import { collection, doc, DocumentData, getDoc, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "./useFirebase";


interface UseSurahState {
    isLoading: boolean;
    isPush: boolean;
    surahs: SurahData[];
    surah: SurahData | null;
    ayahs: AyahData[];
    lastAyahVisible: any | null;
}

export const useSurah = defineStore('useSurah', {
    state: (): UseSurahState => ({
        ayahs: [],
        isLoading: false,
        isPush: false,
        lastAyahVisible: null,
        surah: null,
        surahs: []
    }),

    actions: {
        async getSurahMetada() {
            this.isLoading = true;

            const surahMetdataRef = collection(db, 'surah_menu_collections');
            const q = query(surahMetdataRef, orderBy("id", "asc"));

            getDocs(q)
                .then(snapshot => {
                    const surahMetadata: SurahData[] = [];

                    snapshot.docs.forEach(surah => {
                        surahMetadata.push(surah.data() as SurahData);
                    })

                    this.surahs = surahMetadata;
                    this.isLoading = false;
                });
        },

        async setSurah(surah_number: SurahData['id']) {
            this.isLoading = true;

            const surah_no = surah_number ? surah_number : "1";

            const surahRef = doc(db, 'surah_collections', `${surah_no}`);

            getDoc(surahRef)
                .then((doc) => {
                    if (doc.exists()) {
                        this.surah = doc.data() as SurahData;
                        this.setAyahOfSurah(doc.data().id)
                        this.isLoading = false;
                    }
                });
        },

        async setAyahOfSurah(surah_id: SurahData['id']) {
            this.isLoading = true;

            const surahMetdataRef = doc(db, 'surah_collections', `${surah_id}`);
            const ayahOfSurahRef = collection(surahMetdataRef, 'ayahs');
            const q = query(ayahOfSurahRef, orderBy("aya_number", "asc"), limit(20));

            getDocs(q)
                .then((ayah) => {
                    const lastVisible = ayah.docs[ayah.docs.length - 1] as any;

                    this.lastAyahVisible = lastVisible;

                    const ayahOfSurah: AyahData[] = [];

                    ayah.forEach((doc) => {
                        ayahOfSurah.push(doc.data() as AyahData);
                    });

                    this.ayahs = ayahOfSurah;
                    this.isLoading = false;
                });
        },

        async nextPage(data: { lastVisible: any, surah_id: number }) {
            this.isPush = true;

            const surahRef = doc(db, 'surah_collections', `${data.surah_id}`);
            const ayahOfSurah = collection(surahRef, 'ayahs');
            const q = query(ayahOfSurah, orderBy("aya_number", "asc"), limit(20), startAfter(data.lastVisible));

            getDocs(q).then((doc) => {
                const lastVisible = doc.docs[doc.docs.length - 1] as any;

                this.lastAyahVisible = lastVisible;

                const tempDataAyahs: AyahData[] = [];

                doc.forEach((ayat) => {
                    tempDataAyahs.push(ayat.data() as AyahData);
                });

                this.ayahs.push(...tempDataAyahs);

                this.isPush = false;
            });
        },

        nextAyat() {
            this.isPush = true;

            const ayahColRefs = collection(db, 'ayah_collections');
            const q = query(ayahColRefs, orderBy("aya_id", "asc"), startAfter(this.lastAyahVisible), limit(20));
            
            getDocs(q)
                .then((doc) => {
                    const lastVisible = doc.docs[doc.docs.length - 1] as DocumentData;
                    this.lastAyahVisible = lastVisible;

                    console.log(lastVisible.data());

                    const tempData: AyahData[] = [];

                    doc.forEach((ayat) => {
                        tempData.push(ayat.data() as AyahData);
                    });

                    this.ayahs.push(...tempData);
                    this.isPush = false;
                });
        },
    }
})