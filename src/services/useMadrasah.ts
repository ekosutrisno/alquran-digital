import { CreateMadrasahRequest, MadrasahTypeOption } from './../types/madrasah.interface';
import { Madrasah } from "@/types/madrasah.interface";
import { defineStore } from "pinia";
import { generateFriendlyId } from '@/utils/friendlyId';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { TABLES } from '@/config/db.config';
import { db } from '@/config/firebase.config';
interface MadrasahState {
    madrasahList: Madrasah[];
    madrasah: Madrasah;
    createMadrasahReq: CreateMadrasahRequest,
    isLoading: boolean;
}

export const useMadrasah = defineStore('useMadrasah', {
    state: (): MadrasahState => ({
        madrasahList: [],
        madrasah: {} as Madrasah,
        createMadrasahReq: {
            name: 'Madrasah Unggul Jaya Lestari',
            email: 'unggul.jaya@email.com',
            description: 'Madrasah Unggul Jaya Lestari adalah Sekolah Madrasah dengan berbagai fasilitas unggul di Kecamatan Sungai Are'
        } as CreateMadrasahRequest,
        isLoading: false
    }),

    actions: {
        async getAllMadrasah() {
            let docData = collection(db, TABLES.MADRASAH_COLLECTION);

            onSnapshot(docData, (snapshot) => {
                const pageMetadata: Madrasah[] = [];
                snapshot.docs.forEach((page) => {
                    pageMetadata.push(page.data() as Madrasah);
                });

                this.madrasahList = pageMetadata;
            });
        },
        async getMadrasah(_madrasahId: String) { },
        async createMadrasah() {
            let type = this.route.query.type as MadrasahTypeOption;
            const code = generateFriendlyId();

            let madrasah: Madrasah = {
                code,
                createdDate: Date.now(),
                name: this.createMadrasahReq.name,
                headMaster: null,
                govermentCode: '',
                description: this.createMadrasahReq.description,
                postalCode: '',
                email: this.createMadrasahReq.email,
                phoneNumber: '',
                address: '',
                province: '',
                district: '',
                subDistrict: '',
                ward: '',
                public: false,
                type
            };

            let docData = doc(db, TABLES.MADRASAH_COLLECTION, code)
            await setDoc(docData, madrasah);
        },
        async updateMadrasah() { },
        async deleteMadrasah() { },
    }
})