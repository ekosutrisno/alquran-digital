import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, initializeFirestore, memoryLocalCache } from 'firebase/firestore';
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';
import { getAnalytics, logEvent } from 'firebase/analytics';

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

// Initialize Firebase Realtime Database for Chats
const database = getDatabase();

/** Auth Instance */
const auth = getAuth(app)
auth.useDeviceLanguage();

const analytics = getAnalytics(app);
logEvent(analytics, 'notification_received');

// Config to enable Offline Data Persistance
initializeFirestore(app, { localCache: memoryLocalCache() });

const db = getFirestore(app);
const storage = getStorage(app);

/** Sign With Google Provider */
const gProvider = new GoogleAuthProvider();

export {
    auth,
    db,
    database,
    gProvider,
    storage
}

