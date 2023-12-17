import { SajdaMetadata } from "@/types/alquran.interface";
import { getDocs, orderBy, query } from "firebase/firestore";
import { defineStore } from "pinia";
import { sajdaCollectionRefConfig } from "@/config/dbRef.config";

interface UseSajdaState {
    isLoading: boolean;
    sajdas: SajdaMetadata[];
}

export const useSajda = defineStore('sajdaService', {
    state: (): UseSajdaState => ({
        isLoading: false,
        sajdas: []
    }),

    actions: {
        async getSajdaMetadata() {
            this.isLoading = true;
            const q = query(sajdaCollectionRefConfig(), orderBy('number', 'asc'));

            getDocs(q).then((snapshot) => {
                const sajdaMetadata: SajdaMetadata[] = [];

                snapshot.docs.forEach((sajda) => {
                    sajdaMetadata.push(sajda.data() as SajdaMetadata);
                });

                this.sajdas = sajdaMetadata;
                this.isLoading = false;

            });
        },
    }
})