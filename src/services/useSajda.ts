import { SajdaMetadata } from "@/types/alquran.interface";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "./useFirebase";

interface UseSajdaState {
    isLoading: boolean;
    sajdas: SajdaMetadata[];
}

export const useSajda = defineStore('useSajda', {
    state: (): UseSajdaState => ({
        isLoading: false,
        sajdas: []
    }),

    actions: {
        async getSajdaMetadata() {
            this.isLoading = true;

            const sajdaMetadataRef = collection(db, 'sajda_collections');
            const q = query(sajdaMetadataRef, orderBy('number', 'asc'));


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