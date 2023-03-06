import { User, UserNotification, UserNotificationType } from "@/types/user.interface";
import { addDoc, collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { messaging, onMessage, db } from '@/services/useFirebase';
import { useUser } from '@/services';


const toast = useToast();

interface UseNotficationState {
    notifications: Array<UserNotification>,
    notification: UserNotification | null,
    userId: string;
}

export const useNotification = defineStore('notificationService', {
    state: (): UseNotficationState => ({
        notification: null,
        notifications: new Array<UserNotification>(),
        userId: String(localStorage.getItem('_uid'))
    }),

    actions: {
        /**
         * Load All Notification which bellong to the current user
         */
        async loadNotifications() {
            const docRef = collection(db, "notification_collections");
            const q = query(docRef, where('user_id', '==', this.userId), orderBy('timestamp', 'desc'), limit(25));

            onSnapshot(q, (snapshot) => {
                this.notifications = snapshot.docs.map((notif) => notif.data() as UserNotification);
            });
            
        },
        /**
         * @param  {string} notifId
         * Get single detail notification
         */
        async loadSingleNotification(notifId: string) {
            const docRef = doc(db, "notification_collections", notifId);

            getDoc(docRef)
                .then(snapshot => {
                    this.notification = snapshot.data() as UserNotification;
                })
        },

        /**
         * @param  {UserNotification} notif
         * Save the notification into Database
         */
        async saveNotification(notif: UserNotification) {
            const docRef = collection(db, "notification_collections");
            await addDoc(docRef, notif);
        },

        /**
         * @param  {UserNotification} notif
         * Save the notification into Database
         */
        async readNotification(notif: UserNotification) {
            const docRef = collection(db, "notification_collections");
            const q = query(docRef, where('id', '==', notif.id));

            getDocs(q)
                .then((snapshot) => {
                    if (!snapshot.empty) {
                        notif.read = true;

                        const currentDocRef = doc(db, 'notification_collections', String(snapshot.docs.at(0)?.id))
                        setDoc(currentDocRef, notif, { merge: true });
                    }
                })
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
                    body: `Hi ${userService.getLoginAsInfo.fullName}, ${notif.body}`,
                    image: notif.image || `https://res.cloudinary.com/ekosutrisno/image/upload/v1662785818/briix/notif_n0ogoj.jpg`,
                    icon: 'https://res.cloudinary.com/ekosutrisno/image/upload/v1662786263/briix/n_pyzbuz.png',
                };
                const notify: UserNotification = {
                    id: Date.now().toString(),
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
        * @param  {User} user
        * @description Added FCMS Token into the User Data (For Campaign and Newsletter)
        */
        async addFcmsToken(payload: { userId: User['user_id'], token: string }, options: { isSilent: boolean }) {
            const docRef = doc(db, "user_collections", payload.userId);
            getDoc(docRef)
                .then((snapshot) => {
                    const user = snapshot.data() as User;
                    const fcmsExist = user.fcms ? user.fcms?.includes(payload.token) : false;

                    if (!fcmsExist) {
                        user.lastModifiedDate = Date.now();
                        user.fcms?.push(payload.token) as User['fcms'];

                        setDoc(docRef, user, { merge: true })
                            .then(() => {
                                if (!options.isSilent)
                                    toast.info(`Public Profile has been updated.`)
                            });
                    }
                })
        },
    }
})