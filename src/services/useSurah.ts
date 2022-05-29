import { AyahData, SurahData } from "@/types/alquran.interface";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "./useFirebase";


interface UseSurahState {
    isLoading: boolean,
    isPush: boolean,
    surahs: SurahData[],
    surah: SurahData | null,
    ayahs: AyahData[],
    lastAyahVisible: AyahData | null,
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
        getSurahMetada() {
            this.isLoading = true;

            const surahMetdataRef = collection(db, 'surah_menu_collections');
            const q = query(surahMetdataRef, orderBy("id", "desc"));

            getDocs(q)
                .then(snapshot => {
                    const surahMetadata: SurahData[] = [];

                    snapshot.docs.forEach(surah => {
                        surahMetadata.push(surah.data() as SurahData);
                    })

                    this.surahs = surahMetadata;
                    this.isLoading = false;
                });
        }
    }
})