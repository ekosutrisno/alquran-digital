import { AppUser, UserNotification, UserNotificationType } from "@/types/user.interface";
import { getDoc, limit, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { messaging, onMessage } from '@/config/firebase.config';
import { useUser } from '@/services';
import { notificationCollectionRefConfig, notificationDataRefConfig, userDataRefConfig } from "@/config/dbRef.config";
import { generateFriendlyId } from "@/utils/friendlyId";
import { decrypt } from "@/utils/cryp";

const toast = useToast();

interface UseNotficationState {
    notifications: Array<UserNotification>,
    notification: UserNotification | null,
    userId: string;
}

export const useNotification = defineStore('notificationService', {
    state: (): UseNotficationState => ({
        notification: null,
        notifications: [],
        userId: decrypt(String(localStorage.getItem("_uid")))
    }),

    actions: {
        /**
         * Load All Notification which bellong to the current user
         */
        async loadNotifications() {
            const q = query(notificationCollectionRefConfig(), where('user_id', '==', this.userId), orderBy('timestamp', 'desc'), limit(25));

            onSnapshot(q, (snapshot) => {
                this.notifications = snapshot.docs.map((notif) => notif.data() as UserNotification);
            });
        },

        /**
         * @param  {string} notifId
         * Get single detail notification
         */
        async loadSingleNotification(notifId: string) {
            getDoc(notificationDataRefConfig(notifId))
                .then(snapshot => {
                    this.notification = snapshot.data() as UserNotification;
                })
        },

        /**
         * @param  {UserNotification} notif
         * Save the notification into Database
         */
        async saveNotification(notif: UserNotification) {
            await setDoc(notificationDataRefConfig(notif.id), notif);
        },

        /**
         * @param  {UserNotification} notif
         * Save the notification into Database
         */
        async readNotification(notif: UserNotification) {
            notif.read = true;
            setDoc(notificationDataRefConfig(notif.id), notif, { merge: true });
        },

        /**
         * This handle Notification when fire in the Foreground (App Opened)
         */
        onMessageForeground() {
            const userService = useUser();

            onMessage(messaging, async (payload) => {
                const notif = payload.notification as any;
                const options = {
                    title: `${notif?.title}`,
                    body: `Hi ${userService.getLoginAsInfo.fullName}✋, ${notif.body}`,
                    image: notif.image || `https://res.cloudinary.com/ekosutrisno/image/upload/v1662785818/briix/notif_n0ogoj.jpg`,
                    icon: 'https://res.cloudinary.com/ekosutrisno/image/upload/v1662786263/briix/n_pyzbuz.png',
                };
                const notify: UserNotification = {
                    id: generateFriendlyId(),
                    timestamp: Date.now(),
                    user_id: String(userService.currentUser?.user_id),
                    title: options.title,
                    image: options.image,
                    icon: options.icon,
                    body: options.body,
                    read: false,
                    type: UserNotificationType.NEWS
                }

                await this.saveNotification(notify);

                var n = new Notification(options.title, options);
                toast.info(options.title);
                n.onshow;


            });
        },

        /**
        * @description Added FCMS Token into the User Data (For Campaign and Newsletter)
        */
        async addFcmsToken(payload: { userId: string, token: string }, options: { isSilent: boolean }) {
            const docRef = userDataRefConfig(payload.userId);
            getDoc(docRef)
                .then((snapshot) => {
                    const user = snapshot.data() as AppUser;
                    const fcmsExist = user.fcms ? user.fcms?.includes(payload.token) : false;

                    if (!fcmsExist) {
                        user.lastModifiedDate = Date.now();
                        user.fcms?.push(payload.token);

                        setDoc(docRef, user, { merge: true })
                            .then(() => {
                                if (!options.isSilent)
                                    toast.info(`Public Profile has been updated.`)
                            });
                    }
                })
        },
    },

    getters: {
        unReadNotification(state: UseNotficationState): UserNotification[] {
            return state.notifications.filter(notif => !notif.read)
                .sort((a: UserNotification, b: UserNotification) => String(b.timestamp).localeCompare(String(a.timestamp)))
                .slice(0, 3);
        }
    }
})