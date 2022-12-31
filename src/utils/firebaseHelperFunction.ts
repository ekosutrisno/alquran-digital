
import { database } from '@/services/useFirebase';
import { UserOnlineStatus } from '@/types/chat.interface';
import { onValue, ref as reference } from 'firebase/database';
import { ref } from 'vue';

export function getPresence(userId: string) {
    const status = ref<UserOnlineStatus>({} as UserOnlineStatus)

    const connectedRef = reference(database, `/users_connection/${userId}`);
    onValue(connectedRef, snap => {
        if (snap.exists())
            status.value = snap.val() as UserOnlineStatus;
        else
            status.value = { state: 'offline', last_changed: Date.now() }
    })

    return status;
}