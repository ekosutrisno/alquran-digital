import { User } from "@/types/user.interface";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { db } from "./useFirebase";

const toast = useToast();

export const useNotfication = defineStore('notificationService', {
    state:()=>({
        
    }),

    actions:{
         /**
         * @param  {User} user
         * @description Update All Detail User Data Property
         */
          async addFcmsToken(payload: { userId: User['user_id'], token: string }, options: { isSilent: boolean }) {
            const docRef = doc(db, "user_collections", payload.userId);
            getDoc(docRef)
                .then((snapshot) => {
                    const user = snapshot.data() as User;
                    const fcmsExist = user.fcms?.includes(payload.token);

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