import { PageMetadata } from "@/types/alquran.interface";
import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "./useFirebase";
interface UsePageState {
    isLoading: boolean,
    isPush: boolean,
    isLast: boolean,
    pages: PageMetadata[],
    lastPageVisible: any | null
}

export const usePage = defineStore('usePage', {
    state: (): UsePageState => ({
        isLast: false,
        isLoading: false,
        isPush: false,
        pages: [],
        lastPageVisible: null
    }),

    actions: {
        async getPageMetadata() {
            this.isLoading = true;

            const pageMetadataRef = collection(db, 'page_collections');
            const q = query(pageMetadataRef, orderBy("page", "asc"), limit(100));

            getDocs(q)
                .then(snapshot => {
                    const pageMetadata: PageMetadata[] = [];

                    const lastVisible = snapshot.docs[snapshot.docs.length - 1] as any;

                    this.lastPageVisible = lastVisible;

                    snapshot.docs.forEach((page) => {
                        pageMetadata.push(page.data() as PageMetadata);
                    });

                    this.pages = pageMetadata;
                    this.isLoading = false;
                })
        },

        nextPage(data: { lastVisible: any }) {
            this.isPush = true;

            const pageMetadataRef = collection(db, 'page_collections');
            const q = query(pageMetadataRef, orderBy("page", "asc"), limit(100), startAfter(data.lastVisible));

            getDocs(q).then((doc) => {
                const lastVisible = doc.docs[doc.docs.length - 1] as any;

                this.lastPageVisible = lastVisible;

                let checkIsLas = lastVisible.data();

                if (checkIsLas.page === 604) this.isLast = true;

                const tempData: PageMetadata[] = [];

                doc.forEach((ayat) => {
                    tempData.push(ayat.data() as PageMetadata);
                });

                this.pages.push(...tempData);
                this.isPush = false;
            });
        },
    }
})