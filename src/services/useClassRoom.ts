import { MemberList } from "@/types/chat.interface";
import { Room } from "@/types/room.interface";
import { User } from "@/types/user.interface";
import { collection, doc, DocumentData, DocumentReference, getDoc, getDocs, limit, onSnapshot, query, QuerySnapshot, setDoc, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { auth, db } from "./useFirebase";
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
    rooms: Array<Room>;
    asMentorInRoom: Array<Room>;
}

export const useClassRoom = defineStore('classRoomService', {
    state: (): ClassRoomState => ({
        isLoading: false,
        isLast: false,
        isPush: false,
        lastVisible: null,
        room: {} as Room,
        mentor: {} as User,
        members: new Array<User>(),
        memberRef: new Array<string>(),
        rooms: new Array<Room>(),
        asMentorInRoom: new Array<Room>()
    }),

    actions: {
        async addRoom(roomData: Room) {

            const userService = useUser();

            const roomId = Date.now();
            const user_id = localStorage.getItem('_uid') as string;

            const roomUserRef = doc(db, 'room_collections', `${roomId}`);
            const room: Room = {
                id: `${roomId}`,
                scheduleDay: roomData.scheduleDay,
                scheduleTime: roomData.scheduleTime,
                organization: roomData.organization,
                createdDate: Date.now(),
                description: roomData.description,
                name: roomData.name,
                mentor: doc(db, 'user_collections', user_id),
                heroImage: '',
                ratings: 0,
                isActive: true,
                members: new Array<string>(user_id)
            }

            setDoc(roomUserRef, room)
                .then(() =>
                    userService.updateUserClassRoom(user_id, `${roomId}`, { isSilent: true })
                        .then(() => toast.info('Room succesfully created.'))
                );
        },

        async editRoom(roomData: Room) {
            const roomUserRef = doc(db, 'room_collections', `${roomData.id}`);
            setDoc(roomUserRef, roomData, { merge: true })
                .then(() => toast.info('Room succesfully updated.'))
        },

        async getRooms(roomId: Room['id'][]) {
            this.isLoading = true;

            const rommColl = collection(db, 'room_collections');
            const q = query(rommColl, where('id', 'in', roomId), limit(10));

            onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
                if (snapshot.empty)
                    this.isLoading = false;

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

            onSnapshot(q, (snapshot) => {
                const membersTemp: User[] = [];

                snapshot.docs.forEach(user => {
                    membersTemp.push(user.data() as User)
                })

                this.members = membersTemp;
            })
        },

        async addRoomMember(roomId: string, userEmail: string) {

            const userRef = collection(db, 'user_collections');
            const q = query(userRef, where('email', '==', userEmail));

            getDocs(q)
                .then(snapshot => {
                    if (!snapshot.empty) {
                        const userReadyToInvite = snapshot.docs[0].data() as User;

                        const roomRef = doc(db, 'room_collections', `${roomId}`);

                        getDoc(roomRef)
                            .then((room) => {
                                const roomData = room.data() as Room;

                                if (!roomData.members.includes(userReadyToInvite.user_id)) {
                                    // Add New Member ID
                                    roomData.members.push(userReadyToInvite.user_id);

                                    // Save Updated The Room
                                    setDoc(roomRef, roomData, { merge: true })
                                        .then(() => toast.info("New Member Added"))
                                } else {
                                    toast.info("The User already member!")
                                }

                            });
                    } else {
                        toast.info("The Email Member not registered!")
                    };
                })
        },

        haveClassRoom() {
            const me = localStorage.getItem('_uid') as string;

            const rommColl = collection(db, 'room_collections');
            const q = query(rommColl, where('mentor', '==', doc(db, 'user_collections', `${me}`)));

            getDocs(q)
                .then((snapshot) => {
                    if (!snapshot.empty) {
                        const temporaryRoom: Room[] = [];

                        snapshot.forEach(room => temporaryRoom.push(room.data() as Room));

                        this.asMentorInRoom = temporaryRoom;
                    }
                })
        }

    },
    getters: {
        getMembers(state: ClassRoomState): MemberList[] {
            return state.members.map(member => {
                return {
                    name: member.full_name,
                    id: member.user_id,
                    color: member.colorCode || '#a8071a',
                    avatar: member.photo_url
                } as MemberList
            })
        }
    }
})