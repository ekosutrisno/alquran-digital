import { Room } from "@/types/room.interface";
import { User } from "@/types/user.interface";
import { collection, doc, DocumentData, DocumentReference, getDoc, getDocs, limit, onSnapshot, orderBy, query, QuerySnapshot, setDoc, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { db } from "./useFirebase";
import { useUser } from "./useUser";


const toast = useToast();

interface ClassRoomState {
    isLoading: boolean;
    isPush: boolean;
    isLast: boolean;
    lastVisible: DocumentData | null;
    room: Room | null;
    mentor: User | null;
    members: User[];
    memberRef: string[];
    rooms: Room[];
}

export const useClassRoom = defineStore('useClassRoom', {
    state: (): ClassRoomState => ({
        isLoading: false,
        isLast: false,
        isPush: false,
        lastVisible: null,
        room: {} as Room,
        mentor: {} as User,
        members: new Array<User>(),
        memberRef: new Array<string>(),
        rooms: new Array<Room>()
    }),

    actions: {
        async init() {
            const roomId = Date.now();
            const user_id = localStorage.getItem('_uid') as string;

            const roomUserRef = doc(db, 'room_collections', `${roomId}`);
            const room: Room = {
                id: `${roomId}`,
                scheduleDay: "Rabu-Kamis",
                scheduleTime: "09:00 - 14:00",
                totalMember: 8,
                organization: "MAN 1 Model Bandar Lampung",
                createdDate: Date.now(),
                description: "Merupakan kelas unggulan di MAN 1 Model Bandar Lampung dan telah terakreditasi A",
                name: "Gajah Mada",
                mentor: doc(db, 'user_collections', user_id),
                heroImage: '',
                ratings: 0,
                isActive: true,
                members: new Array<string>(user_id)
            }

            setDoc(roomUserRef, room)
                .then(() => toast.info('Room succesfully created.'));
        },

        async getRooms(roomId: Room['id'][]) {
            this.isLoading = true;

            const rommColl = collection(db, 'room_collections');
            const q = query(rommColl, where('id', 'in', roomId), limit(10));

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

            const roomRef = doc(db, 'room_collections', `${roomId}`);

            // Snapshot Event Listening
            onSnapshot(roomRef, async (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data() as Room;
                    this.memberRef = data.members;

                    // Load all Reference Data
                    this.loadMentor(data.mentor);

                    if (data.members.length > 0)
                        this.loadMember(data.members);

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
        },

        async loadMember(listMemberRef: string[]) {

            const userRef = collection(db, 'user_collections');
            const q = query(userRef, where('user_id', 'in', listMemberRef))

            onSnapshot(q,(snapshot) => {
                const membersTemp: User[] = [];

                snapshot.docs.forEach(user => {
                    membersTemp.push(user.data() as User)
                })

                this.members = membersTemp;
            })
        }

    }
})