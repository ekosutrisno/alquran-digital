import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import { User } from '@/types/user.interface';
import { useNotification } from '@/services';


const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_BASE_FIREBASE_APIKEY}`,
    authDomain: `${import.meta.env.VITE_BASE_FIREBASE_AUTHDOMAIN}`,
    projectId: `${import.meta.env.VITE_BASE_FIREBASE_PROJECTID}`,
    storageBucket: `${import.meta.env.VITE_BASE_FIREBASE_STORAGEBUCKET}`,
    databaseURL: `${import.meta.env.VITE_BASE_FIREBASE_DATABASE_URL}`,
    messagingSenderId: `${import.meta.env.VITE_BASE_FIREBASE_MESSAGINGSENDERID}`,
    appId: `${import.meta.env.VITE_BASE_FIREBASE_APPID}`,
    measurementId: `${import.meta.env.VITE_BASE_FIREBASE_MEASUREMENTID}`,
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

// Initialize Firebase Realtime Database for Chats
const database = getDatabase();

/** Auth Instance */
const auth = getAuth(app)
auth.useDeviceLanguage();

const analytics = getAnalytics(app);
logEvent(analytics, 'notification_received');

const db = getFirestore(app);
const storage = getStorage(app);

/** Sign With Google Provider */
const gProvider = new GoogleAuthProvider();


const requestPermission = () => {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') { } else { console.log('Notification permission denied.') }
    })
}

const getTokenFcm = (userId: User['user_id']): void => {
    const notificationService = useNotification();
    
    getToken(messaging, { vapidKey: import.meta.env.VITE_BASE_FIREBASE_VAPID })
        .then(async (currentToken) => {
            if (currentToken) {
                await notificationService.addFcmsToken({ userId: userId, token: currentToken }, { isSilent: true });
            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
        });
}

export {
    auth,
    db,
    database,
    gProvider,
    storage,
    messaging,
    onMessage,
    requestPermission,
    getTokenFcm
}

