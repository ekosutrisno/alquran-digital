import { Metadata } from "@/types/alquran.interface";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "./useFirebase";

interface UseJuzState {
    isLoading: boolean;
    juz: Metadata[];
}

export const useJuz = defineStore('useJuz', {
    state: (): UseJuzState => ({
        isLoading: false,
        juz: []
    }),

    actions: {
        async getJuzMetadata() {
            this.isLoading = true;

            const jusMetadataRef = collection(db, 'juz_collections');
            const q = query(jusMetadataRef, orderBy('number', 'asc'));

            getDocs(q).then((snapshot) => {
                const juzMetadata: Metadata[] = [];

                snapshot.docs.forEach((juz) => {
                    juzMetadata.push(juz.data() as Metadata);
                });

                this.juz = juzMetadata;
                this.isLoading = false;
            });
        },
    }
})