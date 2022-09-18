import { Metadata } from "@/types/alquran.interface";
import { collection, DocumentData, getDocs, limit, orderBy, query, QuerySnapshot, startAfter } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "./useFirebase";

interface UseRukukState {
    isLoading: boolean;
    isPush: boolean;
    isLast: boolean;
    rukuk: Metadata[];
    lastRukukVisible: DocumentData | null;
}

export const useRukuk = defineStore('rukukService', {
    state: (): UseRukukState => ({
        isLast: false,
        isLoading: false,
        isPush: false,
        lastRukukVisible: null,
        rukuk: new Array<Metadata>()
    }),

    actions: {
        async getRukukMetadata() {
            this.isLoading = true;

            const rukukMetadataRef = collection(db, 'rukuk_collections');
            const q = query(rukukMetadataRef, orderBy('number', 'asc'), limit(100));

            getDocs(q)
                .then((snapshot: QuerySnapshot<DocumentData>) => {
                    const rukukMetadata: Metadata[] = [];

                    const lastVisible = snapshot.docs[snapshot.docs.length - 1] as DocumentData;
                    this.lastRukukVisible = lastVisible;

                    snapshot.docs.forEach((surah) => {
                        rukukMetadata.push(surah.data() as Metadata);
                    });

                    this.rukuk = rukukMetadata;
                    this.isLoading = false;
                });
        },

        nextPage(data: { lastVisible: DocumentData }) {
            this.isPush = true;

            const rukukMetadataRef = collection(db, 'rukuk_collections');
            const q = query(rukukMetadataRef, orderBy('number', 'asc'), limit(100), startAfter(data.lastVisible));

            getDocs(q)
                .then((snapshot: QuerySnapshot<DocumentData>) => {
                    const lastVisible = snapshot.docs[snapshot.docs.length - 1] as DocumentData;
                    this.lastRukukVisible = lastVisible;

                    const checkIsLast = lastVisible.data();
                    if (checkIsLast.number === 556) this.isLast = true;

                    const tempData: Metadata[] = [];

                    snapshot.forEach((rukuk) => {
                        tempData.push(rukuk.data() as Metadata);
                    });

                    this.rukuk.push(...tempData);
                    this.isPush = false;

                });
        },
    },
    getters: {
        filteredRukuk(state: UseRukukState) {
            return (q: string) => state.rukuk.filter(s => s.number.toString().includes(q.trim().toLowerCase()));
        }
    }
})