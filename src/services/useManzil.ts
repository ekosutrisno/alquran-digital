import { Metadata } from "@/types/alquran.interface";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "./useFirebase";

interface UseManzilState {
    isLoading: boolean
    manzil: Metadata[];
}

export const useManzil = defineStore('manzilService', {
    state: (): UseManzilState => ({
        isLoading: false,
        manzil: new Array<Metadata>()
    }),

    actions: {
        async getManzilMetadata() {
            this.isLoading = true;

            const manzilMetadataRef = collection(db, 'manzil_collections');
            const q = query(manzilMetadataRef, orderBy('number', 'asc'));

            getDocs(q)
                .then((snapshot) => {
                    const manzilMetadata: Metadata[] = [];

                    snapshot.docs.forEach((manzil) => {
                        manzilMetadata.push(manzil.data() as Metadata);
                    });

                    this.manzil = manzilMetadata;
                    this.isLoading = false;
                });
        },
    }
})