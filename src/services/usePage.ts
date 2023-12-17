import { PageMetadata } from "@/types/alquran.interface";
import { DocumentData, getDocs, limit, orderBy, query, QuerySnapshot, startAfter } from "firebase/firestore";
import { defineStore } from "pinia";
import { pageCollectionRefConfig } from "@/config/dbRef.config";
interface UsePageState {
    isLoading: boolean,
    isPush: boolean,
    isLast: boolean,
    pages: PageMetadata[],
    lastPageVisible: DocumentData | null
}

export const usePage = defineStore('pageService', {
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
            const q = query(pageCollectionRefConfig(), orderBy("page", "asc"), limit(100));

            getDocs(q)
                .then((snapshot: QuerySnapshot<DocumentData>) => {
                    const pageMetadata: PageMetadata[] = [];

                    const lastVisible = snapshot.docs[snapshot.docs.length - 1] as DocumentData;

                    this.lastPageVisible = lastVisible;

                    snapshot.docs.forEach((page) => {
                        pageMetadata.push(page.data() as PageMetadata);
                    });

                    this.pages = pageMetadata;
                    this.isLoading = false;
                })
        },

        nextPage(data: { lastVisible: DocumentData }) {
            this.isPush = true;
            const q = query(pageCollectionRefConfig(), orderBy("page", "asc"), limit(100), startAfter(data.lastVisible));

            getDocs(q).then((doc: QuerySnapshot<DocumentData>) => {
                const lastVisible = doc.docs[doc.docs.length - 1] as DocumentData;

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
    },
    getters: {
        filteredPage(state: UsePageState) {
            return (q: string) => state.pages.filter(s => s.page.toString().includes(q.trim().toLowerCase()));
        }
    }
})