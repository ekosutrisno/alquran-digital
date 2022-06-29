import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, logEvent } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDPbyYJrPIPPS2-hHs9EVHVRBWxeMKiL_Y",
    authDomain: "al-quran-digital-5cef2.firebaseapp.com",
    projectId: "al-quran-digital-5cef2",
    storageBucket: "al-quran-digital-5cef2.appspot.com",
    messagingSenderId: "746510129962",
    appId: "1:746510129962:web:6e44df61fbed725fac1c53",
    measurementId: "G-9XWNXME6YV"
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

