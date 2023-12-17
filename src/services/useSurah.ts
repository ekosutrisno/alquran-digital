import { AyahData, SurahData } from "@/types/alquran.interface";
import { DocumentData, getDoc, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { ayahCollectionRefConfig, queryOrderByRefConfig, surahAyahCollectionRefConfig, surahCollectionRefConfig, surahDataRefConfig } from "@/config/dbRef.config";

interface UseSurahState {
    isLoading: boolean;
    isPush: boolean;
    surahs: SurahData[];
    surah: SurahData | null;
    ayahs: AyahData[];
    lastAyahVisible: DocumentData | null;
}

export const useSurah = defineStore('surahService', {
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

            const surahMetdataRef = surahCollectionRefConfig();
            const q = queryOrderByRefConfig(surahMetdataRef, 'id', 'asc');

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

        async getSurah(surahId: SurahData['id'], isSilent?: boolean) {
            isSilent ? this.isLoading = false : this.isLoading = true;

            const surahMetdataRef = surahDataRefConfig(String(surahId));

            getDoc(surahMetdataRef)
                .then(snapshot => {
                    if (snapshot.exists()) {
                        this.surah = snapshot.data() as SurahData;
                        this.isLoading = false;
                    }
                })
                .finally(() => this.isLoading = false);
        },

        async setSurah(surah_number: SurahData['id'],
            options: {
                is_surah: boolean,
                meta: {
                    next_bacaan?: boolean,
                    sajda?: boolean,
                    sn: number,
                    an: number
                }
            }) {

            this.isLoading = true;

            const surah_no = surah_number ? surah_number : options.meta.sn;
            const surahRef = surahDataRefConfig(String(surah_no));

            getDoc(surahRef)
                .then((doc) => {
                    if (doc.exists()) {
                        this.surah = doc.data() as SurahData;

                        if (options.is_surah)
                            this.setAyahOfSurah(doc.data().id);
                        else
                            this.setAyahDetailGeneral({
                                surat: options.meta.sn,
                                ayat: options.meta.an
                            }, { next_bacaan: options.meta.next_bacaan });

                        this.isLoading = false;
                    }
                });
        },

        async setAyahOfSurah(surah_id: SurahData['id']) {
            this.isLoading = true;
            const ayahOfSurahRef = surahAyahCollectionRefConfig(String(surah_id));
            const q = queryOrderByRefConfig(ayahOfSurahRef, 'aya_number', 'asc', 20)

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

        async setAyahDetailGeneral(payload: { surat: number, ayat: number }, flagInfo?: { next_bacaan?: boolean, max_limit?: number }) {
            const ayahRefs = ayahCollectionRefConfig();
            const q0 = query(ayahRefs, where("sura_id", "==", payload.surat), where("aya_number", "==", payload.ayat));

            const limitData = flagInfo?.max_limit ? flagInfo.max_limit : 20;

            getDocs(q0)
                .then((aya) => {
                    if (!aya.empty) {
                        const initialAyat = aya.docs[0] as DocumentData;

                        const q1 = query(ayahRefs, orderBy("aya_id", "asc"), flagInfo?.next_bacaan ? startAfter(initialAyat) : startAt(initialAyat), limit(limitData));
                        getDocs(q1)
                            .then((snapshot) => {
                                const lastVisible = snapshot.docs[snapshot.docs.length - 1] as DocumentData;
                                this.lastAyahVisible = lastVisible;

                                const dataAyah: AyahData[] = [];

                                snapshot.forEach((ayat) => {
                                    dataAyah.push(ayat.data() as AyahData);
                                });

                                this.ayahs = dataAyah;
                                this.isLoading = false;
                            });
                    }
                });
        },

        async nextAyahSurahOfSurah(surah_id: SurahData['id']) {
            this.isPush = true;

            const ayahOfSurah = surahAyahCollectionRefConfig(String(surah_id));
            const q = query(ayahOfSurah, orderBy("aya_number", "asc"), limit(20), startAfter(this.lastAyahVisible));

            getDocs(q).then((doc) => {
                const lastVisible = doc.docs[doc.docs.length - 1] as DocumentData;

                this.lastAyahVisible = lastVisible;

                const tempDataAyahs: AyahData[] = [];

                doc.forEach((ayat) => {
                    tempDataAyahs.push(ayat.data() as AyahData);
                });

                this.ayahs.push(...tempDataAyahs);

                this.isPush = false;
            });
        },

        async nextAyahSurahOfSurahDetail() {
            this.isPush = true;

            const ayahColRefs = ayahCollectionRefConfig();
            const q = query(ayahColRefs, orderBy("aya_id", "asc"), startAfter(this.lastAyahVisible), limit(20));

            getDocs(q)
                .then((doc) => {
                    const lastVisible = doc.docs[doc.docs.length - 1] as DocumentData;
                    this.lastAyahVisible = lastVisible;

                    const tempData: AyahData[] = [];

                    doc.forEach((ayat) => {
                        tempData.push(ayat.data() as AyahData);
                    });

                    this.ayahs.push(...tempData);
                    this.isPush = false;
                });
        },
    },
    getters: {
        filteredSurah: (state: UseSurahState) => (q: string) => state.surahs.filter(s => s.surat_name.toLowerCase().includes(q.trim().toLowerCase())),
        isLast: (state: UseSurahState) => state.ayahs.length == state.surah?.count_ayat
    }
})