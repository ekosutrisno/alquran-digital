import { User } from '@/types/user.interface';
import { confirmPasswordReset, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signOut, updateEmail, updatePassword } from 'firebase/auth';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { defineStore, storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import { useClassRoom } from './useClassRoom';
import { auth, db } from './useFirebase';
import { useUser } from './useUser';

const toast = useToast();

export interface AuthState {
    isLoggedIn: boolean
    isRegisterProcess: boolean
    currentUserSession: CurrentUserSession | null
    error: {
        errorCode: string | null
        errorMessage: string | null
    }
    emailNotRegiter: boolean
}

type CurrentUserSession = {
    displayName: string
    phoneNumber: string
    photoUrl: string
    email: string
    emailVerified: boolean
    providedId: string[]
}

export const useAuth = defineStore('authService', {
    state: (): AuthState => ({
        currentUserSession: null,
        emailNotRegiter: false,
        error: {
            errorCode: '',
            errorMessage: ''
        },
        isRegisterProcess: false,
        isLoggedIn: false
    }),

    actions: {
        /**
         * @param  {any} user?
         * This method will automaticly set when authState method is fire
         * This method set the info to current user session data
         */
        onLoginAction(user?: any) {
            var currentUser = {
                displayName: user?.displayName,
                phoneNumber: user?.phoneNumber,
                photoUrl: user?.photoURL,
                email: user?.email,
                emailVerified: user?.emailVerified,
                providedId: user?.providerData.map((prov: any) => prov.providerId)
            } as CurrentUserSession

            this.currentUserSession = currentUser;
        },

        /**
         * @returns Promise
         * logout action method
         */
        async onLogoutAction(): Promise<void> {
            signOut(auth).then(() => {
                localStorage.removeItem('_uid');
            }).catch((error) => {
                this.setErrorData(error);
            });
        },

        /**
         * This method will allways automaticly fire when you hard refresh your page
         * to check and identify current user session is available or not
         */
        authState() {

            const userService = useUser();

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;

                    this.isLoggedIn = true;
                    localStorage.setItem('_uid', uid);

                    // Set Detail Information such as profiderId
                    this.onLoginAction(user);

                    userService.fetchCurrentUser(uid);
                } else {
                    localStorage.removeItem('_uid');
                    this.isLoggedIn = false;
                }
            });
        },

        /**
       * Update email with prom credential before confirm action
       * @param  {IUser['email']} newEmail
       * @param  {string} currentUserPassword
       * @returns Promise
       */
        async updateCurrentUserEmail(newEmail: string, currentUserPassword: string): Promise<void> {

            const currentUser = auth.currentUser as any

            if (currentUser.email.toLowerCase() == newEmail.toLowerCase())
                toast.success("Your email is the same as the current one.")

            const user_collections = collection(db, 'user_collections');
            const q = query(user_collections, where('email', '==', newEmail));

            getDocs(q)
                .then((snapshot) => {
                    if (snapshot.empty) {

                        const credential = EmailAuthProvider.credential(
                            currentUser.email as string,
                            currentUserPassword
                        );

                        reauthenticateWithCredential(currentUser, credential).then(() => {
                            updateEmail(currentUser, newEmail)
                                .then(async () => {
                                    const userRef = doc(db, 'user_collections', currentUser.uid);
                                    await updateDoc(userRef, {
                                        lastModifiedDate: Date.now(),
                                        email: newEmail
                                    });

                                    toast.success("Your Email has been update succesfully.")
                                }).catch((error) => {
                                    this.setErrorData(error);
                                });
                        }).catch((error) => {
                            this.setErrorData(error)
                        });
                    } else {
                        toast.success("The Email has been taken.")
                    }
                })

        },

        /**
          * Update password with prom credential before confirm action
          * @param  {string} newPassword
          * @param  {string} currentUserPassword
          * @returns Promise
          */
        async updateCurrentUserPasswod(newPassword: string, currentUserPassword: string): Promise<void> {
            const currentUser = auth.currentUser as any;
            const userService = useUser();
            const user = userService.currentUser as User;

            const credential = EmailAuthProvider.credential(
                currentUser.email as string,
                currentUserPassword
            );

            reauthenticateWithCredential(currentUser, credential).then(() => {
                updatePassword(currentUser, newPassword)
                    .then(() => {
                        userService.updateCurrentUserData(user, { isSilent: true })
                            .then(() => toast.success("Password has been updated."))
                    }).catch((error) => {
                        this.setErrorData(error);
                    });
            }).catch((error) => {
                this.setErrorData(error)
            });
        },

        /**
          * This method will handle and send password reset email to user
          * before send email first check if email are registered
          * @param  {IUser['email']} email
          */
        async sendPasswordResetEmail(email: string): Promise<void> {
            const userRef = collection(db, 'user_collections');
            const q = query(userRef, where('email', '==', email));
            getDocs(q)
                .then(async (snapshot) => {
                    if (snapshot.size === 1) {
                        await sendPasswordResetEmail(auth, email)
                            .then(() => {
                                toast.info('Reset password link has been sent, please check your email.');
                            })
                            .catch((error) => {
                                this.setErrorData(error);
                            });
                    } else {
                        this.emailNotRegiter = true;
                        toast.warning(`${email} not registered email.`);
                    }
                })

            setTimeout(() => {
                this.emailNotRegiter = false;
            }, 5000);
        },

        async resetPasswordConfirm(oobCode: string, newPassword: string) {
            await confirmPasswordReset(auth, `${oobCode}`, newPassword);
        },

        /**
         * This method and handle send email verification after user register
         * @returns Promise
         */
        async sendVerificationEmail(): Promise<void> {

            await sendEmailVerification(auth.currentUser as any)
                .then(() => {
                    // TODO
                });
        },

        /**
         * This will permanently delete the user data
         */
        async deleteAccount() {
            const me = auth.currentUser as any;

            /** TODO Several things need to be done before the user decides to delete the account permanently.
             * 1. Delete From Class Room members room_collections.
             * 2. Delete all User Notifications in notification_collections.
             * 3. Delete permanently the User data in user_collections.
             * 4. Redirect to Login and show popup konfirmation if the account has been permanently deleted.
             */

            // deleteUser(me).then(() => {})
        },

        /**
         * Temporary Deactive Account
         * This action will disable if the user not verify their email first.
         */
        async deactivatedAccount() {
            const me = auth.currentUser as any;
            const { currentUser } = storeToRefs(useUser());

            // Set is_active to false
            const user = currentUser.value as User;
            user.is_active = false

            await updateDoc(doc(db, 'user_collections', `${me.uid}`), user as any);
        },
        
        /**
        * Activated The Account
        */
        async activatedAccount() {
            const me = auth.currentUser as any;
            const { currentUser } = storeToRefs(useUser());

            // Set is_active to false
            const user = currentUser.value as User;
            user.is_active = true

            await updateDoc(doc(db, 'user_collections', `${me.uid}`), user as any);
        },

        setErrorData(error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;

            this.$patch(state => state.error = {
                errorCode: errorCode,
                errorMessage: errorMessage
            });

            if (errorCode === 'auth/wrong-password')
                toast.error('Wrong password, please fill in the correct password.')
            else if (errorCode === 'auth/too-many-requests')
                toast.error('Too many request, your password wrong more than three time.')

            console.log(`${errorCode} => ${errorMessage}`);
        }
    }
})