import { AyahData, SurahData } from "@/types/alquran.interface";
import { collection, deleteDoc, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { auth, db } from "./useFirebase";

const toast = useToast();

interface UseAyahState {
    isLoading: boolean;
    ayahFavorite: AyahData[];
    surahPilihan: SurahData[];
    isPush: boolean;
    ayahTafsirSelected: AyahData | null;
    surahTafsirSelected: SurahData | null;
}

export const useAyah = defineStore('useAyah', {
    state: (): UseAyahState => ({
        ayahFavorite: new Array<AyahData>(),
        surahPilihan: new Array<SurahData>(),
        isLoading: false,
        isPush: false,
        ayahTafsirSelected: null,
        surahTafsirSelected: null
    }),

    actions: {
        async onMarkBacaanku(nextBacaan: AyahData) {
            const user_id = auth.currentUser ? auth.currentUser.uid : null;
            if (user_id) {
                const userRef = doc(db, 'user_collections', `${user_id}`);

                getDoc(userRef)
                    .then((user) => {
                        if (user.exists() && user.data().bacaanku?.aya_id !== nextBacaan.aya_id) {
                            setDoc(userRef, { bacaanku: nextBacaan }, { merge: true })
                                .then(async () => {
                                    toast.info(`Ditandai sebagai Bacaanku.`);
                                });
                        }
                    })
            } else {
                toast.warning(`Fitur ini hanya aktif setelah Login!`);
            }
        },

        async onMarkFavorit(payload: AyahData) {
            const user_id = auth.currentUser ? auth.currentUser.uid : null;

            if (user_id) {

                const userRef = doc(db, 'user_collections', `${user_id}`);
                const favoriteAyahRef = doc(userRef, 'favorits', `${payload.aya_id}`);

                getDoc(favoriteAyahRef)
                    .then(async (doc) => {
                        if (!doc.exists()) {
                            setDoc(favoriteAyahRef, payload)
                                .then(() => {
                                    toast.info(`Ditambahkan ke favorit.`);
                                });
                        }
                    });
            } else {
                toast.warning(`Fitur ini hanya aktif setelah Login!`);
            }
        },

        onGetFavorit() {
            const user_id = localStorage.getItem('_uid');

            const userRef = doc(db, 'user_collections', `${user_id}`);
            const ayahFavoriteRef = collection(userRef, 'favorits');

            onSnapshot(ayahFavoriteRef, (snapshot) => {
                const ayahFavorite: AyahData[] = [];
                snapshot.docs.forEach((ayat) => {
                    ayahFavorite.push(ayat.data() as AyahData);
                });

                this.ayahFavorite = ayahFavorite;
            });
        },

        async onRemoveFavorit(ayahId: AyahData['aya_id']) {
            const user_id = localStorage.getItem('_uid');
            const userRef = doc(db, 'user_collections', `${user_id}`);
            const favoriteAyahRef = doc(userRef, 'favorits', `${ayahId}`);

            deleteDoc(favoriteAyahRef)
                .then(() => {
                    toast.error(`Dihapus dari Ayah Favorit.`);
                });
        },

        async onMarkPilihan(payload: SurahData) {
            const user_id = auth.currentUser ? auth.currentUser.uid : null;

            if (user_id) {
                const userRef = doc(db, 'user_collections', `${user_id}`);
                const surahPilihanRef = doc(userRef, 'surah_pilihan', `${payload.id}`);

                getDoc(surahPilihanRef)
                    .then(async (doc) => {
                        if (!doc.exists()) {
                            setDoc(surahPilihanRef, payload)
                                .then(() => {
                                    toast.info(`Ditambahkan ke Surah Pilihan.`);
                                });
                        }
                    });
            } else {
                toast.warning(`Fitur ini hanya aktif setelah Login!`);
            }
        },

        onGetSurahPilihan() {
            const user_id = localStorage.getItem('_uid');

            const userRef = doc(db, 'user_collections', `${user_id}`);
            const surahPilihanRef = collection(userRef, 'surah_pilihan');

            onSnapshot(surahPilihanRef, (snapshot) => {
                const surahPilihanTemp: SurahData[] = [];
                
                snapshot.docs.forEach((ayat) => {
                    surahPilihanTemp.push(ayat.data() as SurahData);
                });

                this.surahPilihan = surahPilihanTemp;
            });
        },

        async onRemoveSurahPilihan(surahId: SurahData['id']) {
            const user_id = localStorage.getItem('_uid');
            const userRef = doc(db, 'user_collections', `${user_id}`);
            const surahPilihanRef = doc(userRef, 'surah_pilihan', `${surahId}`);

            deleteDoc(surahPilihanRef)
                .then(() => {
                    toast.error(`Dihapus dari Surah Pilihan.`);
                });
        },

        async onCheckTafsir(payload: AyahData) {
            const surahRef = doc(db, 'surah_collections', `${payload.sura_id}`)
                getDoc(surahRef)
                    .then(snapshot=>{
                        if(snapshot.exists()){
                            this.surahTafsirSelected = snapshot.data() as SurahData
                            this.ayahTafsirSelected = payload;
                        }
                    })
        }
    }
})