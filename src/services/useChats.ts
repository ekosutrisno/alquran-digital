import { Chat, ChatGroup, UserOnlineStatus } from "@/types/chat.interface";
import { User } from "@/types/user.interface";
import { get, limitToLast, onDisconnect, onValue, push, query, ref, serverTimestamp, set } from "firebase/database";
import { getDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { database } from "../config/firebase.config";
import { formatToStringWithDash } from '@/utils/helperFunction';
import { userDataRefConfig } from "@/config/dbRef.config";
import { REALTIME_DB } from "@/config/db.config";
import { useToast } from "vue-toastification";
import { decrypt } from "@/utils/cryp";

const toast = useToast();

interface ChatState {
    chat: Chat | null;
    chats: Array<ChatGroup>;
    peerUser: User;
    peerUserStatus: UserOnlineStatus;
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
        onLoadChats: false,
        peerUserStatus: {} as UserOnlineStatus
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
            await push(ref(database, `${REALTIME_DB.personal_chats}/${this.currentChatBucket}/${currentDay}`), chat)
        },

        /**
         * @param  {string} peerPathCollection
         * Get Detail of Peer User
         */
        async fetchCurrentPeerUser(peerId: string) {
            await getDoc(userDataRefConfig(peerId))
                .then((snapshot) => {
                    this.peerUser = snapshot.data() as User;
                })
        },

        /**
         * @param  {User['user_id']} userId
         * Handling User is Online or not, set last seen timestamp
         */
        chatInfo(userId: User['user_id']) {
            const connectedRef = ref(database, `/${REALTIME_DB.users_connection}/${userId}`);

            var isOfflineForFirestore: UserOnlineStatus = {
                state: 'offline',
                last_changed: serverTimestamp(),
            };

            var isOnlineForFirestore: UserOnlineStatus = {
                state: 'online',
                last_changed: serverTimestamp(),
            };

            onValue(ref(database, REALTIME_DB.info), (snap) => {
                if (snap.val() == false) return;

                onDisconnect(connectedRef).set(isOfflineForFirestore)
                    .then(() => set(connectedRef, isOnlineForFirestore))
            });

        },

        /**
         * @param  {string} chatGroupId
         * Get Realtime Chats Messages
         */
        async getChats(peerId: string) {
            // Get Me ID
            const meId = decrypt(String(localStorage.getItem("_uid")));
            this.onLoadChats = true;

            // This Will get latest status online/offline from peer user
            this.getPeerOnlineStatus(peerId);

            // Get Detail Data Peer User
            await this.fetchCurrentPeerUser(peerId);

            const toMe = `${peerId}@${meId}`; // ID: peer:me
            const fromMe = `${meId}@${peerId}`; // ID: me:peer

            // By Default Check from Peer as Base, if not exist will create new bucket address
            const dbRef = ref(database, `${REALTIME_DB.personal_chats}/${toMe}`);
            const reference = await get(dbRef);

            this.currentChatBucket = reference.exists() ? toMe : fromMe;

            const q = query(ref(database, `${REALTIME_DB.personal_chats}/${this.currentChatBucket}`), limitToLast(10));
            onValue(q, (snapshot) => {
                const messages: ChatGroup[] = [];
                snapshot.forEach((childSnapshot) => {
                    messages.push({
                        key: childSnapshot.key as string,
                        chats: Object.values(childSnapshot.val())
                    });
                });

                this.chats = messages;
                this.onLoadChats = false;
            });
        },

        /**
         * @param  {User['user_id']} peerId
         * This will watching for User Online Status
         */
        getPeerOnlineStatus(peerId: User['user_id']) {
            const connectedRef = ref(database, `/${REALTIME_DB.users_connection}/${peerId}`);
            onValue(connectedRef, snap => {
                if (snap.exists())
                    this.peerUserStatus = snap.val() as UserOnlineStatus;
                else
                    this.peerUserStatus = { state: 'offline', last_changed: serverTimestamp() }

            })
        },

        async onNewMesage(chat: Chat) {
            const me = decrypt(String(localStorage.getItem("_uid")));
            if (!me.match(chat.from)) {
                var n = new Notification(chat.content);
                toast.info(chat.content);
                n.onshow;
            }
        }
    }

})