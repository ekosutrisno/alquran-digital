import { AyahData, SurahData } from "@/types/alquran.interface";
import { User } from "@/types/user.interface";
import { collection, deleteDoc, doc, DocumentData, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, startAfter, startAt, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { auth, db } from "./useFirebase";

const toast = useToast();

interface UseAyahState {
    isLoading: boolean;
    currentUser: User | null;
    meId: string | null;
    bacaanku: AyahData | null;
    ayahFavorite: AyahData[];
    isPush: boolean;
    ayats: AyahData[];
    surat: SurahData | null;
    last_ayat: DocumentData | null;
}

export const useAyah = defineStore('useAyah', {
    state: (): UseAyahState => ({
        ayahFavorite: [],
        bacaanku: null,
        currentUser: null,
        isLoading: false,
        meId: '',
        ayats: [],
        isPush: false,
        last_ayat: null,
        surat: null
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
                                    this.bacaanku = nextBacaan
                                    toast.info(`Ditandai sebagai Bacaanku.`);
                                });
                        }
                    })
            } else {
                toast.warning(`Fitur ini hanya aktif setelah Login!`);
            }
        },

        async onGetBacaanku() {
            const user_id = auth.currentUser?.uid;

            if (user_id) {
                const userRef = doc(db, 'user_collections', `${user_id}`);
                onSnapshot(userRef, (doc) => {
                    if (doc.exists()) {
                        this.bacaanku = doc.data().bacaanku as AyahData;
                    }
                });
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

        async onGetFavorit() {
            const user_id = auth.currentUser?.uid;

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

        async onRemoveFavorit(payload: AyahData) {
            const user_id = auth.currentUser?.uid;
            const userRef = doc(db, 'user_collections', `${user_id}`);
            const favoriteAyahRef = doc(userRef, 'favorits', `${payload.aya_id}`);

            deleteDoc(favoriteAyahRef)
                .then(() => {
                    toast.error(`Berhasil dihapus dari favorit.`);
                });
        },

        setAyatDetail(payload: { surat: number, ayat: number }) {
            const ayahRefs = collection(db, 'ayah_collections');
            const q0 = query(ayahRefs, where("sura_id", "==", payload.surat), where("aya_number", "==", payload.ayat));

            getDocs(q0)
                .then((aya) => {
                    if (!aya.empty) {
                        const initialAyat = aya.docs[0] as DocumentData;

                        const q1 = query(ayahRefs, orderBy("aya_id", "asc"), startAt(initialAyat), limit(20));
                        getDocs(q1)
                            .then((snapshot) => {
                                const lastVisible = snapshot.docs[snapshot.docs.length - 1] as DocumentData;
                                this.last_ayat = lastVisible;

                                const dataAyah: AyahData[] = [];

                                snapshot.forEach((ayat) => {
                                    dataAyah.push(ayat.data() as AyahData);
                                });

                                this.ayats = dataAyah;
                                this.isLoading = false;
                            });
                    }
                });
        },

        setAyatDetailBacaan(payload: { surat: number, ayat: number }) {

            const ayahRefs = collection(db, 'ayah_collections');
            const q0 = query(ayahRefs, where("sura_id", "==", payload.surat), where("aya_number", "==", payload.ayat));

            getDocs(q0)
                .then((aya) => {
                    if (aya.docs.length > 0) {
                        const initialAyat = aya.docs[0] as DocumentData;
                        const q1 = query(ayahRefs, orderBy("aya_id", "asc"), startAt(initialAyat), limit(20));

                        getDocs(q1).then((snapshot) => {
                            const lastVisible = snapshot.docs[snapshot.docs.length - 1] as DocumentData;
                            this.last_ayat = lastVisible;

                            const dataAyah: AyahData[] = [];

                            snapshot.forEach((ayat) => {
                                dataAyah.push(ayat.data() as AyahData);
                            });

                            this.ayats = dataAyah;
                            this.isLoading = false;
                        });
                    }
                });
        },

        setSuratDetail(payload: { surah: number, ayah: number, bacaan?: boolean }) {
            this.isLoading = true;

            const surahRefs = doc(db, 'surah_collections', `${payload.surah}`)
            getDoc(surahRefs)
                .then((doc) => {
                    if (doc.exists()) {
                        const surat_detail = doc.data() as SurahData;

                        this.surat = surat_detail;

                        if (payload.bacaan) {
                            this.setAyatDetailBacaan({ surat: payload.surah, ayat: payload.ayah });
                        } else {
                            this.setAyatDetail({ surat: payload.surah, ayat: payload.ayah });
                        }
                    }
                });
        },

        nextAyat() {
            this.isPush = true;

            const ayahColRefs = collection(db, 'ayah_collections');
            const q = query(ayahColRefs, orderBy("aya_id", "asc"), startAfter(this.last_ayat));

            getDocs(q)
                .then((doc) => {

                    const lastVisible = doc.docs[doc.docs.length - 1] as DocumentData;
                    this.last_ayat = lastVisible;

                    console.log(lastVisible.data());

                    const tempData: AyahData[] = [];

                    doc.forEach((ayat) => {
                        tempData.push(ayat.data() as AyahData);
                    });

                    this.ayats.push(...tempData);
                    this.isPush = false;
                });
        },
    }
})