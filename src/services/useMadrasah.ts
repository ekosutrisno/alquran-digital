import { CreateMadrasahRequest, MadrasahTypeOption } from './../types/madrasah.interface';
import { Madrasah } from "@/types/madrasah.interface";
import { defineStore } from "pinia";
import { generateFriendlyId } from '@/utils/friendlyId';
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { TABLES } from '@/config/db.config';
import { db } from '@/config/firebase.config';
import { room_db } from '@/config/local.db';
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
            const local_db = await room_db.get('madrasah');
            const q = query(collection(db, TABLES.MADRASAH_COLLECTION), where('code', 'in', local_db?.madrasah));

            onSnapshot(q, (snapshot) => {
                const pageMetadata: Madrasah[] = [];
                snapshot.docs.forEach(async (page) => {
                    const data = page.data() as Madrasah;

                    pageMetadata.push(data);

                    await room_db.save({
                        idb_key: `rooms:${data.code}`,
                        rooms: data.rooms ?? []
                    }, true);

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
                type,
                rooms: []
            };

            let docData = doc(db, TABLES.MADRASAH_COLLECTION, code)
            await setDoc(docData, madrasah);
        },
        async updateMadrasah() { },
        async deleteMadrasah() { },
    }
})