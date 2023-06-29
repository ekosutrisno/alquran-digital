import { Metadata } from "@/types/alquran.interface";
import { getDocs, orderBy, query } from "firebase/firestore";
import { defineStore } from "pinia";
import { juzCollectionRefConfig } from "@/config/dbRef.config";

interface UseJuzState {
    isLoading: boolean;
    juz: Metadata[];
}

export const useJuz = defineStore('juzService', {
    state: (): UseJuzState => ({
        isLoading: false,
        juz: new Array<Metadata>()
    }),

    actions: {
        async getJuzMetadata() {
            this.isLoading = true;
            const q = query(juzCollectionRefConfig(), orderBy('number', 'asc'));

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