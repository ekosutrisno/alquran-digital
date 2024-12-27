import { MemberList } from "@/types/chat.interface";
import { Room } from "@/types/room.interface";
import { AppUser } from "@/types/user.interface";
import { doc, DocumentData, DocumentReference, getDoc, getDocs, limit, onSnapshot, query, QuerySnapshot, runTransaction, setDoc, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { db } from "../config/firebase.config";
import { roomCollectionRefConfig, roomDataRefConfig, userCollectionRefConfig, userDataRefConfig } from "@/config/dbRef.config";
import { generateFriendlyId } from "@/utils/friendlyId";
import { decrypt } from "@/utils/cryp";
import { madrasah_db } from "@/config/local.db";
import { TABLES } from "@/config/db.config";
import { Madrasah } from "@/types/madrasah.interface";

const toast = useToast();

interface ClassRoomState {
    isLoading: boolean;
    isPush: boolean;
    isLast: boolean;
    lastVisible: DocumentData;
    room: Room;
    mentor: AppUser;
    members: AppUser[];
    memberRef: string[];
    rooms: Array<Room>;
    asMentorInRoom: Array<Room>;
}

export const useClassRoom = defineStore('classRoomService', {
    state: (): ClassRoomState => ({
        isLoading: false,
        isLast: false,
        isPush: false,
        lastVisible: {} as DocumentData,
        room: {} as Room,
        mentor: {} as AppUser,
        members: [],
        memberRef: [],
        rooms: [],
        asMentorInRoom: []
    }),

    actions: {
        async addRoom(roomData: Room, madrasah_id: string) {
            console.log(madrasah_id);

            try {
                await runTransaction(db, async (transaction) => {
                    const roomId = generateFriendlyId();
                    const user_id = decrypt(String(localStorage.getItem("_uid")));

                    const room: Room = {
                        id: `${roomId}`,
                        scheduleDay: roomData.scheduleDay,
                        scheduleTime: roomData.scheduleTime,
                        organization: roomData.organization,
                        createdDate: Date.now(),
                        description: roomData.description,
                        name: roomData.name,
                        mentor: userDataRefConfig(user_id),
                        heroImage: '',
                        ratings: 0,
                        isActive: true,
                        members: [user_id],
                        madrasah_id
                    }

                    const madrasahRef = doc(db, TABLES.MADRASAH_COLLECTION, madrasah_id);
                    const currentMadrasahSnapshot = await transaction.get(madrasahRef);

                    if (!currentMadrasahSnapshot.exists()) {
                        throw new Error("Madrasah not found");
                    }

                    const currMadrasah = currentMadrasahSnapshot.data() as Madrasah;

                    transaction.set(roomDataRefConfig(String(roomId)), room);

                    const updatedRooms = [...(currMadrasah.rooms || []), roomId];
                    transaction.set(madrasahRef, { rooms: updatedRooms }, { merge: true });

                    const local_db = await madrasah_db.get('madrasah');
                    const madrasahs = local_db?.madrasah ?? [];
                    const curr_madrasah_idx = madrasahs.findIndex(m => m.madrasah == madrasah_id);
                    const curr_madrasah = madrasahs.find(m => m.madrasah == madrasah_id);

                    curr_madrasah?.rooms.push(roomId);
                    madrasahs[curr_madrasah_idx] = curr_madrasah!;

                    await madrasah_db.save({
                        idb_key: 'madrasah',
                        madrasah: madrasahs
                    }, true);

                    toast.info('Room succesfully created.');
                })

            } catch (err) {
                console.log(err);
                toast.info("Yahhhh, you failed to add new class room🥺");
            }

        },

        async editRoom(roomData: Room) {
            setDoc(roomDataRefConfig(roomData.id), roomData, { merge: true })
                .then(() => toast.info('Room succesfully updated.'))
        },

        async getRooms(madrasah_id: string) {
            this.isLoading = true;
            this.rooms = [];

            const local_db = await madrasah_db.get('madrasah');
            if (local_db?.madrasah.length! > 0) {
                const curr_rooms = local_db?.madrasah.find(m => m.madrasah == madrasah_id)?.rooms;

                if (curr_rooms?.length! > 0) {
                    const q = query(roomCollectionRefConfig(), where('id', 'in', curr_rooms), limit(10));

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
                } else {
                    this.isLoading = false;
                }
            } else {
                this.isLoading = false;
            }
        },

        async getRoom(roomId: string) {
            this.isLoading = true;

            // Snapshot Event Listening
            onSnapshot(roomDataRefConfig(roomId), async (snapshot) => {
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
                        this.mentor = snap.data() as AppUser
                })
        },

        async loadMember(listMemberRef: string[]) {
            const q = query(userCollectionRefConfig(), where('user_id', 'in', listMemberRef))

            onSnapshot(q, (snapshot) => {
                const membersTemp: AppUser[] = [];

                snapshot.docs.forEach(user => {
                    membersTemp.push(user.data() as AppUser)
                })

                this.members = membersTemp;
            })
        },

        async addRoomMember(roomId: string, userEmail: string) {
            const q = query(userCollectionRefConfig(), where('email', '==', userEmail.toLowerCase()));
            getDocs(q)
                .then(snapshot => {
                    if (!snapshot.empty) {
                        const userReadyToInvite = snapshot.docs[0].data() as AppUser;

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
            const me = decrypt(String(localStorage.getItem("_uid")));
            const q = query(roomCollectionRefConfig(), where('mentor', '==', doc(db, 'user_collections', `${me}`)));

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