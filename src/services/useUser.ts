import { SurahData } from "@/types/alquran.interface";
import { Role, User } from "@/types/user.interface";
import { doc, DocumentReference, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { db, storage } from "./useFirebase";

const toast = useToast();
interface UserState {
    currentUser: User | null;
    currentMentor: User | null;
    currentUserMainRole: Role | null;
    surahBacaanUser: SurahData | null;
}

export const useUser = defineStore('useUser', {
    state: (): UserState => ({
        currentUser: null,
        currentMentor: null,
        currentUserMainRole: null,
        surahBacaanUser: null
    }),

    actions: {
        /**
        * @param  {userId: User['userId'], email: User['email']} newData
        * @description register user to Database Collection
        */
        async onRegisterUser(newData: { userId: User['user_id'], email: User['email'] }, googleNewData?: { user?: any, oauth?: boolean }) {
            const newUserData: User = {
                email: newData.email,
                user_id: newData.userId,
                is_mentor: false,
                main_role: doc(db, 'role_collections', '1'),
                join_at: Date.now(),
                telephone: "",
                username: `@${newData.email?.split('@')[0].replace('.', '_')}`,
                full_name: googleNewData?.oauth
                    ? googleNewData.user.displayName
                    : `${newData.email?.split('@')[0]}`,
                photo_url: googleNewData?.oauth
                    ? googleNewData.user.photoURL
                    : "https://res.cloudinary.com/ekosutrisno/image/upload/v1627464871/avatars/profile1_otttcz.png",
                gender: "",
                dob: "",
                pob: "",
                nationality:"Indonesia",
                hobby: "Reading Al-Quran and Learn something new.",
                religion: "Islam",
                about: `Hi, my name is ${newData.email}`,
                createdDate: Date.now(),
                lastModifiedDate: Date.now(),
                is_active: googleNewData?.oauth ? googleNewData.user.emailVerified : false,
            }


            // Check if user login with Google
            if (googleNewData?.oauth) {
                const user = await getDoc(doc(db, 'user_collections', newData.userId));
                if (user.exists())
                    return;
                else {
                    await setDoc(doc(db, 'user_collections', newData.userId), newUserData);
                }
            }

            // Default Action save user
            await setDoc(doc(db, 'user_collections', newData.userId), newUserData);
        },

        /**
         * @param  {User['user_id']} userId
         * @description Get Current User By userID Key
         */
        async fetchCurrentUser(userId: User['user_id']) {
            const docRef = doc(db, "user_collections", userId);

            onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const data: User = docSnap.data() as User;

                    // Get Surah name of bacaan User
                    this.setSurahBacaan(data.bacaanku?.sura_id as number);

                    // Set The Current User
                    this.currentUser = data;

                    // Parse all reference data
                    // this.parseFromReference(data);

                    if (data.mentor_id)
                        this.fetchCurrentMentor(data.mentor_id);
                    else
                        this.currentMentor = null;
                }
            })
        },

        /**
         * @param  {User['userId']} mentorId
         * @description Get Current Ero by EroId Key and if isEro = false
         */
        async fetchCurrentMentor(mentorId: DocumentReference) {
            const docSnap = await getDoc(mentorId);
            if (docSnap.exists()) {
                const data: User = docSnap.data() as User;
                this.currentMentor = data;
            }
        },

        /**
         * @param  {User} user
         * @description Update All Detail User Data Property
         */
        async updateCurrentUserData(user: User) {
            const docRef = doc(db, "user_collections", user.user_id);
            setDoc(docRef, user, { merge: true })
                .then(() => {
                    toast.info(`Profile data has been updated.`)
                });
        },

        /**
         * @param  {any} photo
         * @param  {User['userId']} userId
         * @description Update user profile avatar image
         */
        async updateFotoProfile(photo: any, userId: User['user_id']) {
            if (photo) {
                const storageRef = ref(storage, `profiles/${userId}`);
                const uploadTask = uploadBytesResumable(storageRef, photo);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    },
                    (error) => {
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;
                            case 'storage/canceled':
                                // User canceled the upload
                                break;
                            case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                        }
                    },
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            const docRef = doc(db, "user_collections", userId);
                            updateDoc(docRef, {
                                "photoUrl": downloadURL,
                                "lastModifiedDate": Date.now()
                            }).then(() => {
                                toast.info(`Your profile photo has been updated.`)
                            });
                        });
                    }
                );
            }
        },

        /**
         * @param  {User} ref
         * This method will parse all data reference from User
         */
        parseFromReference(ref: User) {
            getDoc(ref.main_role)
                .then(mainRole => {

                    if (mainRole.exists()) {
                        // Set User Role
                        localStorage.setItem('_role', mainRole.data().roleId.toString());

                        this.currentUserMainRole = mainRole.data() as Role
                    }
                });

            // Get Mentor Data
            if (ref.mentor_id)
                getDoc(ref.mentor_id)
                    .then(mentor => this.currentMentor = mentor.data() as User);
        },
        /**
         * @param  {SurahData['id']} surah_number
         * Get Surah Name of Bacaan User
         */
        async setSurahBacaan(surah_number: SurahData['id']) {

            if (surah_number != undefined) {
                const surahRef = doc(db, 'surah_collections', `${surah_number}`);

                getDoc(surahRef)
                    .then((doc) => {
                        if (doc.exists())
                            this.surahBacaanUser = doc.data() as SurahData;

                    });
            }
        },
    },
    getters: {
        /**
         * @param  {} state
         * @returns User.photoUrl
         */
        getPhotoUrl(state): User['photo_url'] {
            return state.currentUser
                ? state.currentUser.photo_url
                    ? state.currentUser.photo_url
                    : 'https://res.cloudinary.com/ekosutrisno/image/upload/v1627464871/avatars/profile1_otttcz.png'
                : 'https://res.cloudinary.com/ekosutrisno/image/upload/v1627464871/avatars/profile1_otttcz.png';
        },

        /**
         * @param  {} state
         * @param {User['username']} full_name
         * @param  {User['email']} email
         * @returns User
         */
        getLoginAsInfo(state): { fullName: User['full_name'], email: User['email'] } {
            const loginAs = {
                fullName: state.currentUser?.full_name as string,
                email: state.currentUser?.email as string
            }
            return loginAs;
        },

        /**
         * @param  {} state
         * @returns string
         * Get Surah Name of Bacaan User as String
         */
        getSurahNameBacaan(state): string {
            return state.surahBacaanUser
                ? state.surahBacaanUser?.surat_name
                : '';
        }
    }
})