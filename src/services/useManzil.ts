import { Metadata } from "@/types/alquran.interface";
import { getDocs, orderBy, query } from "firebase/firestore";
import { defineStore } from "pinia";
import { manzilCollectionRefConfig } from "@/config/dbRef.config";
interface UseManzilState {
    isLoading: boolean
    manzil: Metadata[];
}

export const useManzil = defineStore('manzilService', {
    state: (): UseManzilState => ({
        isLoading: false,
        manzil: []
    }),

    actions: {
        async getManzilMetadata() {
            this.isLoading = true;
            const q = query(manzilCollectionRefConfig(), orderBy('number', 'asc'));

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