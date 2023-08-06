
import { userCollectionRefConfig } from '@/config/dbRef.config';
import { database } from '@/config/firebase.config';
import { UserOnlineStatus } from '@/types/chat.interface';
import { onValue, ref as reference, serverTimestamp } from 'firebase/database';
import { getDocs, query, where } from 'firebase/firestore';
import { Ref, ref } from 'vue';

export function getPresence(userId: string): Ref<UserOnlineStatus> {
    const status = ref<UserOnlineStatus>({} as UserOnlineStatus)

    const connectedRef = reference(database, `/users_connection/${userId}`);
    onValue(connectedRef, snap => {
        if (snap.exists())
            status.value = snap.val() as UserOnlineStatus;
        else
            status.value = { state: 'offline', last_changed: serverTimestamp() }
    })

    return status;
}

export function checkUserExist(email: string): Ref<boolean> {
    const isExist = ref(false);
    const checkQuery = query(userCollectionRefConfig(), where('email', '==', email));

    getDocs(checkQuery)
        .then((snapshot) => isExist.value = snapshot.empty);

    return isExist
}

export function mapFirebaseAuthError(error: any): string {
    switch (error.code) {
        case 'auth/app-deleted':
            return 'Backend autentikasi tidak tersedia.';
        case 'auth/app-not-authorized':
            return 'Backend autentikasi tidak diotorisasi.';
        case 'auth/argument-error':
            return 'Argumen yang diberikan tidak valid.';
        case 'auth/invalid-api-key':
            return 'API key tidak valid.';
        case 'auth/invalid-user-token':
            return 'Token pengguna tidak valid.';
        case 'auth/network-request-failed':
            return 'Terjadi kesalahan jaringan.';
        case 'auth/operation-not-allowed':
            return 'Operasi autentikasi yang diminta tidak diizinkan.';
        case 'auth/requires-recent-login':
            return 'Operasi ini membutuhkan proses autentikasi ulang.';
        case 'auth/too-many-requests':
            return 'Terlalu banyak permintaan. Silakan coba lagi nanti.';
        case 'auth/unauthorized-domain':
            return 'Domain autentikasi tidak diotorisasi.';
        case 'auth/user-disabled':
            return 'Akun pengguna dinonaktifkan.';
        case 'auth/user-not-found':
            return 'Pengguna tidak ditemukan.';
        case 'auth/wrong-password':
            return 'Kata sandi salah.';
        case 'auth/invalid-email':
            return 'Alamat email tidak valid.';
        case 'auth/email-already-in-use':
            return 'Alamat email sudah digunakan.';
        case 'auth/weak-password':
            return 'Password minimal 6 karakter hurup, angka, atau kombinasi keduanya.';
        default:
            return 'Terjadi kesalahan yang tidak diketahui.';
    }
}  