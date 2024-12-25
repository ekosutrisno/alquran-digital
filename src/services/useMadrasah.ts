import { CreateMadrasahRequest, MadrasahTypeOption } from './../types/madrasah.interface';
import { Madrasah } from "@/types/madrasah.interface";
import { defineStore } from "pinia";
import { generateFriendlyId } from '@/utils/friendlyId';
import { collection, doc, onSnapshot, query, runTransaction, where } from 'firebase/firestore';
import { TABLES } from '@/config/db.config';
import { db } from '@/config/firebase.config';
import { room_db } from '@/config/local.db';
import { useToast } from 'vue-toastification';
import { decrypt } from '@/utils/cryp';
import { AppUser } from '@/types/user.interface';

const toast = useToast();
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
            const type = this.route.query.type as MadrasahTypeOption;
            const code = generateFriendlyId();
            const userId = decrypt(String(localStorage.getItem("_uid")));

            try {
                await runTransaction(db, async (transaction) => {
                    const madrasah: Madrasah = {
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
                        rooms: [],
                    };

                    const userRef = doc(db, TABLES.USER_COLLECTIONS, userId);
                    const currUserSnapshot = await transaction.get(userRef);

                    if (!currUserSnapshot.exists()) {
                        throw new Error("User not found");
                    }

                    const currUser = currUserSnapshot.data() as AppUser;

                    const madrasahRef = doc(db, TABLES.MADRASAH_COLLECTION, code);
                    transaction.set(madrasahRef, madrasah);

                    const updatedMadrasahs = [...(currUser.madrasah || []), code];
                    transaction.set(userRef, { madrasah: updatedMadrasahs }, { merge: true });

                    await room_db.save({
                        idb_key: `rooms:${code}`,
                        rooms: []
                    }, true);
                });

                toast.success("Madrasah created successfully!");
            } catch (error) {
                console.error("Failed to create Madrasah:", error);
                toast.info("Yahhhh, you failed to create new Madrasah🥺");
            }
        },
        async updateMadrasah() { },
        async deleteMadrasah() { },
    }
})