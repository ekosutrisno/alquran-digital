import { useToast } from 'vue-toastification';
import { Chat, ChatGroup } from "@/types/chat.interface";
import { User } from "@/types/user.interface";
import { get, limitToLast, onChildAdded, onDisconnect, onValue, push, query, ref, serverTimestamp, set } from "firebase/database";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { database, db } from "./useFirebase";
import { formatToStringWithDash } from '@/utils/helperFunction';

const toast = useToast();

interface ChatState {
    chat: Chat | null;
    chats: Array<ChatGroup>;
    peerUser: User;
    currentChatBucket: string;
    onLoadChats: boolean;
}

type ChatPayload = {
    from: string;
    to: string;
    content: string;
}

export const useChats = defineStore('chatService', {
    state: (): ChatState => ({
        chat: null,
        chats: new Array<ChatGroup>(),
        peerUser: {} as User,
        currentChatBucket: '',
        onLoadChats: false
    }),

    actions: {
        /**
         * @param  {ChatPayload} paylaod
         * Sending and Saving Chat
         */
        async send(paylaod: ChatPayload) {

            // Prepare Chat Object
            const chat: Chat = {
                content: paylaod.content,
                from: `${paylaod.from}`,
                to: `${paylaod.to}`,
                isGroup: false,
                timestamps: Date.now()
            }

            const currentDay = formatToStringWithDash()

            // Send and Push Chat in to the Realtime Database
            await push(ref(database, `personal_chats/${this.currentChatBucket}/${currentDay}`), chat)
        },

        /**
         * @param  {string} peerPathCollection
         * Get Detail of Peer User
         */
        async fetchCurrentPeerUser(peerId: string) {
            await getDoc(doc(db, 'user_collections', peerId))
                .then((snapshot) => {
                    this.peerUser = snapshot.data() as User;
                })
        },

        /**
         * @param  {User['user_id']} userId
         * Handling User is Online or not, set last seen timestamp
         */
        chatUtilityInfo(userId: User['user_id']) {
            const myConnectionsRef = ref(database, `users_connections/${userId}/connections`);

            // stores the timestamp of my last disconnect (the last time I was seen online)
            const lastOnlineRef = ref(database, `users_connections/${userId}/lastOnline`);

            const userRef = doc(db, 'user_collections', userId);

            const connectedRef = ref(database, `.info/connected`);
            onValue(connectedRef, async (snap) => {
                if (snap.val() === true) {
                    // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
                    const con = push(myConnectionsRef);

                    // When I disconnect, remove this device
                    onDisconnect(con).remove();

                    // Add this device to my connections list
                    // this value could contain info about the device or a timestamp too
                    set(con, true);

                    // When I disconnect, update the last time I was seen online
                    onDisconnect(lastOnlineRef)
                        .set(serverTimestamp());
                } else {
                    updateDoc(userRef, { lastActive: Date.now() })
                }
            });
        },

        /**
         * @param  {string} chatGroupId
         * Get Realtime Chats Messages
         */
        async getChats(peerId: string) {
            // Get Me ID
            const meId = localStorage.getItem("_uid") as string;
            this.onLoadChats = true;

            // Get Detail Data Peer User
            await this.fetchCurrentPeerUser(peerId);

            const toMe = `${peerId}@${meId}`; // ID: peer:me
            const fromMe = `${meId}@${peerId}`; // ID: me:peer

            // By Default Check from Peer as Base, if not exist will create new bucket address
            let dbRef = ref(database, `personal_chats/${toMe}`);
            const reference = await get(dbRef);

            if (reference.exists()) {
                this.currentChatBucket = toMe;
            } else {
                this.currentChatBucket = fromMe;
                dbRef = ref(database, `personal_chats/${this.currentChatBucket}`);
            }

            const q = query(dbRef, limitToLast(10));
            onValue(q, (snapshot) => {
                const messages: ChatGroup[] = [];

                snapshot.forEach((childSnapshot) => {
                    const chats: Chat[] = [];
                    Object.keys(childSnapshot.val()).forEach((key) => {
                        chats.push(childSnapshot.val()[key])
                    });

                    messages.push({
                        key: childSnapshot.key as string,
                        chats: chats
                    });
                });

                this.chats = messages;
                this.onLoadChats = false;
            });
        }
    }

})