import { Room } from "@/types/room.interface";
import { User } from "@/types/user.interface";
import { collection, doc, DocumentData, DocumentReference, getDoc, limit, onSnapshot, orderBy, query, QuerySnapshot, setDoc, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { db } from "./useFirebase";
import { useUser } from "./useUser";


const toast = useToast();

interface ClassRoomState {
    isLoading: boolean,
    isPush: boolean,
    isLast: boolean,
    lastVisible: DocumentData | null
    room: Room | null;
    rooms: Room[]
    mentor: User | null
}

export const useClassRoom = defineStore('useClassRoom', {
    state: (): ClassRoomState => ({
        isLoading: false,
        isLast: false,
        isPush: false,
        lastVisible: null,
        mentor: {} as User,
        room: {} as Room,
        rooms: new Array<Room>()
    }),

    actions: {
        async init() {
            const userService = useUser();
            const roomId = Date.now();

            const me = userService.currentUser as User;
            me.bacaanku = null;

            const roomUserRef = doc(db, 'room_collections', `${me?.user_id}`);
            const mentor = {
                user_id: me?.user_id,
                createdDate: Date.now(),
                isActive: true
            }

            const roomRef = doc(roomUserRef, 'rooms', `${roomId}`);
            const room: Room = {
                id: `${roomId}`,
                scheduleDay: "Rabu-Kamis",
                scheduleTime: "09:00 - 14:00",
                totalMember: 8,
                organization: "MAN 1 Model Bandar Lampung",
                createdDate: Date.now(),
                description: "Merupakan kelas unggulan di MAN 1 Model Bandar Lampung dan telah terakreditasi A",
                name: "Gajah Mada",
                mentor: doc(db, 'user_collections', me.user_id),
                heroImage: '',
                ratings: 0
            }

            setDoc(roomUserRef, mentor)
                .then(() => setDoc(roomRef, room)
                    .then(() => toast.info('Room succesfully created.'))
                );
        },

        async getRooms() {
            this.isLoading = true;

            const roomRef = doc(db, 'room_collections', `${localStorage.getItem('_uid')}`);
            const rommColl = collection(roomRef, 'rooms');
            const q = query(rommColl, orderBy("createdDate", "desc"), limit(10));

            onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
                const roomsTemp: Room[] = [];

                const lastVisible = snapshot.docs[snapshot.docs.length - 1] as DocumentData;

                this.lastVisible = lastVisible;

                snapshot.docs.forEach((page) => {
                    roomsTemp.push(page.data() as Room);
                });

                this.rooms = roomsTemp;
                this.isLoading = false;
            })
        },

        async getRoom(roomId: Room['id']) {
            this.isLoading = true;

            const roomRef = doc(db, 'room_collections', `${localStorage.getItem('_uid')}`);
            const roomData = doc(roomRef, 'rooms', roomId);

            onSnapshot(roomData, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data() as Room;
                    this.loadMentor(data.mentor);

                    this.room = data;

                    this.isLoading = false;
                }
            })
        },

        loadMentor(mentorRef: DocumentReference) {
            getDoc(mentorRef)
                .then((snap) => {
                    if (snap.exists())
                        this.mentor = snap.data() as User
                })
        }

    }
})