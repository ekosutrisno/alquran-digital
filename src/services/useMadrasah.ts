import { CreateMadrasahRequest, MadrasahTypeOption } from './../types/madrasah.interface';
import { Madrasah } from "@/types/madrasah.interface";
import { defineStore } from "pinia";
import { generateFriendlyId } from '@/utils/friendlyId';
import { collection, doc, onSnapshot, query, runTransaction, where } from 'firebase/firestore';
import { TABLES } from '@/config/db.config';
import { db } from '@/config/firebase.config';
import { madrasah_db } from '@/config/local.db';
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

            const local_db = await madrasah_db.get('madrasah');

            if (local_db?.madrasah.length! > 0) {
                const m_code = local_db?.madrasah.map(m => m.madrasah);
                const q = query(collection(db, TABLES.MADRASAH_COLLECTION), where('code', 'in', m_code));

                onSnapshot(q, async (snapshot) => {
                    const tempMadrasah: Madrasah[] = [];
                    snapshot.docs.forEach(async (page) => {
                        const data = page.data() as Madrasah;
                        tempMadrasah.push(data);
                    });
                    this.madrasahList = tempMadrasah;
                });
            } else {
                this.madrasahList = [];
            }
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
                        lastModifiedDate: Date.now(),
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
                        logo: 'https://res.cloudinary.com/ekosutrisno/image/upload/v1724405198/assets/oqecerh65qfy4gy5nrgl.webp'
                    };

                    const userRef = doc(db, TABLES.USER_COLLECTIONS, userId);
                    const currUserSnapshot = await transaction.get(userRef);

                    if (!currUserSnapshot.exists()) {
                        throw new Error("User not found");
                    }

                    const madrasahRef = doc(db, TABLES.MADRASAH_COLLECTION, code);
                    transaction.set(madrasahRef, madrasah);

                    const currUser = currUserSnapshot.data() as AppUser;
                    const updatedMadrasahs = [...(currUser.madrasah || []), code];
                    transaction.set(userRef, { madrasah: updatedMadrasahs }, { merge: true });

                    const userOwnedMadrasahRef = doc(db, `${TABLES.USER_COLLECTIONS}/${userId}/${TABLES.USER_MADRASAH_COLLECTION}`, code);
                    transaction.set(userOwnedMadrasahRef, { madrasah: code, rooms: [] });
                });

                toast.success("Madrasah created successfully!");
            } catch (error) {
                toast.info("Yahhhh, you failed to create new Madrasah🥺");
            }
        },
        async updateMadrasah() { },
        async deleteMadrasah() { },
    }
})