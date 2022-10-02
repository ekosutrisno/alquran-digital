import { useToast } from 'vue-toastification';
import { Chat, ChatGroup } from "@/types/chat.interface";
import { User } from "@/types/user.interface";
import { onDisconnect, onValue, push, ref, serverTimestamp, set } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { database, db } from "./useFirebase";
import { formatToStringWithDash } from '@/utils/helperFunction';

const toast = useToast();

interface ChatState {
    chat: Chat | null;
    chats: Array<ChatGroup>;
    peerUser: User | null;
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
        peerUser: null
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
                from: `user_collections/${paylaod.from}`,
                to: `user_collections/${paylaod.to}`,
                isGroup: false,
                timestamps: Date.now()
            }

            // Generate Chat Group ID combinations from sender ID and receiver ID
            const chatGroupId = `${paylaod.from}@${paylaod.to}`;

            const currentDay = formatToStringWithDash()

            // Send and Push Chat in to the Realtime Database
            await push(ref(database, `personal_chats/${chatGroupId}/${currentDay}`), chat)
        },

        /**
         * @param  {string} peerPathCollection
         * Get Detail of Peer User
         */
        async fetchCurrentPeerUser(peerPathCollection: string) {
            await getDoc(doc(db, peerPathCollection))
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

            const connectedRef = ref(database, `.info/connected`);
            onValue(connectedRef, (snap) => {
                if (snap.val() === true) {
                    // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
                    const con = push(myConnectionsRef);

                    // When I disconnect, remove this device
                    onDisconnect(con).remove();

                    // Add this device to my connections list
                    // this value could contain info about the device or a timestamp too
                    set(con, true);

                    // When I disconnect, update the last time I was seen online
                    onDisconnect(lastOnlineRef).set(serverTimestamp());
                }
            });
        },

        /**
         * @param  {string} chatGroupId
         * Get Realtime Chats Messages
         */
        getChats(chatGroupId: string) {
            const dbRef = ref(database, `personal_chats/${chatGroupId}`);

            onValue(dbRef, (snapshot) => {
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
            });
        }

    }

})