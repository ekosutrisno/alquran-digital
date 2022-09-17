import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_BASE_FIREBASE_APIKEY}`,
    authDomain: `${import.meta.env.VITE_BASE_FIREBASE_AUTHDOMAIN}`,
    projectId: `${import.meta.env.VITE_BASE_FIREBASE_PROJECTID}`,
    storageBucket: `${import.meta.env.VITE_BASE_FIREBASE_STORAGEBUCKET}`,
    messagingSenderId: `${import.meta.env.VITE_BASE_FIREBASE_MESSAGINGSENDERID}`,
    appId: `${import.meta.env.VITE_BASE_FIREBASE_APPID}`,
    measurementId: `${import.meta.env.VITE_BASE_FIREBASE_MEASUREMENTID}`,
};

const app = initializeApp(firebaseConfig);

/** Auth Instance */
const auth = getAuth(app)
auth.useDeviceLanguage();

const analytics = getAnalytics(app);
logEvent(analytics, 'notification_received');

const db = getFirestore(app);
const storage = getStorage(app);

/** Sign With Google Provider */
const gProvider = new GoogleAuthProvider();

export {
    auth,
    db,
    gProvider,
    storage
}

