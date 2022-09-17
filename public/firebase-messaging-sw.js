
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const fireBaseConf = {
    apiKey: "AIzaSyDPbyYJrPIPPS2-hHs9EVHVRBWxeMKiL_Y",
    authDomain: "al-quran-digital-5cef2.firebaseapp.com",
    projectId: "al-quran-digital-5cef2",
    storageBucket: "al-quran-digital-5cef2.appspot.com",
    messagingSenderId: "746510129962",
    appId: "1:746510129962:web:6e44df61fbed725fac1c53",
    measurementId: "G-9XWNXME6YV"
};

firebase.initializeApp(fireBaseConf);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notif = payload.notification;
    const notificationOptions = {
        title: `${notif?.title}`,
        body: notif.body,
        image: notif.image || `https://res.cloudinary.com/ekosutrisno/image/upload/v1662785818/briix/notif_n0ogoj.jpg`,
        icon: 'https://res.cloudinary.com/ekosutrisno/image/upload/v1662786263/briix/n_pyzbuz.png',
    };

    self.registration.showNotification(notificationOptions.title, notificationOptions);
});