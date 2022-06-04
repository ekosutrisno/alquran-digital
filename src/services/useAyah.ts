import { AyahData } from "@/types/alquran.interface";
import { collection, deleteDoc, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { auth, db } from "./useFirebase";

const toast = useToast();

interface UseAyahState {
    isLoading: boolean;
    ayahFavorite: AyahData[];
    isPush: boolean;
}

export const useAyah = defineStore('useAyah', {
    state: (): UseAyahState => ({
        ayahFavorite: [],
        isLoading: false,
        isPush: false
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

        async onRemoveFavorit(payload: AyahData) {
            const user_id = localStorage.getItem('_uid');
            const userRef = doc(db, 'user_collections', `${user_id}`);
            const favoriteAyahRef = doc(userRef, 'favorits', `${payload.aya_id}`);

            deleteDoc(favoriteAyahRef)
                .then(() => {
                    toast.error(`Berhasil dihapus dari favorit.`);
                });
        },
    }
})