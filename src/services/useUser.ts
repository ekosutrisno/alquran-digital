import { SurahData } from "@/types/alquran.interface";
import { Room } from "@/types/room.interface";
import { Role, User } from "@/types/user.interface";
import { DocumentReference, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import { auth, storage } from "../config/firebase.config";
import randomColorCode from '@/utils/randomColors';
import { roleDataRefConfig, surahDataRefConfig, userDataRefConfig } from "@/config/dbRef.config";
import { checkUserExist } from "@/utils/firebaseHelperFunction";
import { updateProfile } from "firebase/auth";

const toast = useToast();
interface UserState {
    currentUser: User | null;
    currentMentor: User | null;
    currentUserMainRole: Role | null;
    surahBacaanUser: SurahData | null;
}

export const useUser = defineStore('userService', {
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
            // Check if email is Exist or not
            if (!googleNewData?.oauth) {
                if (!checkUserExist(newData.email)) {
                    toast.warning(`Email ${newData.email} telah digunakan!`)
                    return;
                }
            }

            const newUserData: User = {
                email: newData.email,
                user_id: newData.userId,
                is_mentor: false,
                main_role: roleDataRefConfig('1'),
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
                fcms: [],
                colorCode: randomColorCode(),
                nationality: "Indonesia",
                hobby: "Reading Al-Qur'an and Learn something new.",
                religion: "Islam",
                about: `Hi, my name is ${newData.email}`,
                createdDate: Date.now(),
                lastModifiedDate: Date.now(),
                is_active: googleNewData?.oauth ? googleNewData.user.emailVerified : false,
            }

            const userRef = userDataRefConfig(newData.userId);

            // 01. Check if user login with Google
            if (googleNewData?.oauth) {
                const user = await getDoc(userRef);
                if (user.exists())
                    return;
                else {
                    await setDoc(userRef, newUserData);
                }
            } else {
                // 02. Default Action save user
                await setDoc(userRef, newUserData);
            }
        },

        /**
         * @param  {User['user_id']} userId
         * @description Get Current User By userID Key
         */
        async fetchCurrentUser(userId: User['user_id']) {
            onSnapshot(userDataRefConfig(userId), (docSnap) => {
                if (docSnap.exists()) {
                    const data: User = docSnap.data() as User;

                    // Get Surah name of bacaan User
                    this.setSurahBacaan(data.bacaanku?.sura_id as number);

                    // Set The Current User
                    this.currentUser = data;

                    // Rooms
                    localStorage.setItem('_rooms', JSON.stringify(data.rooms))

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
        async updateCurrentUserData(user: User, options: { isSilent: boolean }) {
            user.lastModifiedDate = Date.now();

            setDoc(userDataRefConfig(user.user_id), user, { merge: true })
                .then(async () => {
                    if (!options.isSilent)
                        toast.info(`Public Profile has been updated.`);
                    
                    await updateProfile(auth.currentUser!, {
                        displayName: user.full_name,
                        photoURL: user.photo_url
                    });
                });
        },

        /**
         * @param  {any} photo
         * @param  {User['userId']} userId
         * @description Update user profile avatar image
         */
        async updateFotoProfile(photo: File, userId: User['user_id']) {
            if (photo) {
                const storageRef = ref(storage, `profiles/${userId}`);
                const uploadTask = uploadBytesResumable(storageRef, photo);

                uploadTask.on('state_changed',
                    (_snapshot) => {
                        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
                            updateDoc(userDataRefConfig(userId), {
                                photo_url: downloadURL,
                                lastModifiedDate: Date.now()
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
            if (surah_number) {
                getDoc(surahDataRefConfig(String(surah_number)))
                    .then((doc) => {
                        if (doc.exists())
                            this.surahBacaanUser = doc.data() as SurahData;
                    });
            }
        },

        /**
         * @param  {User} user
         * @description Update All Detail User Data Property
         */
        async updateUserClassRoom(userId: User['user_id'], roomId: Room['id'], options: { isSilent: boolean }) {
            this.currentUser?.rooms?.push(roomId);

            setDoc(userDataRefConfig(userId), this.currentUser, { merge: true })
                .then(() => {
                    if (!options.isSilent)
                        toast.info(`Public Profile has been updated.`)
                });
        }
    },
    getters: {
        /**
         * @param  {} state
         * @returns User.photoUrl
         */
        getPhotoUrl(state: UserState): User['photo_url'] {
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
        getLoginAsInfo(state: UserState): { fullName: User['full_name'], email: User['email'] } {
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
        getSurahNameBacaan(state: UserState): string {
            return state.surahBacaanUser
                ? state.surahBacaanUser?.surat_name
                : '';
        },
        myBacaanku: (state: UserState) => state.currentUser?.bacaanku
    }
})