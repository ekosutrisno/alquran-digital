import { AppUser } from '@/types/user.interface';
import { applyActionCode, confirmPasswordReset, createUserWithEmailAndPassword, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updatePassword, User } from 'firebase/auth';
import { getDocs, updateDoc } from 'firebase/firestore';
import { defineStore, storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import { auth, gProvider } from '../config/firebase.config';
import { useUser } from './useUser';
import { queryByPropertyRefConfig, userCollectionRefConfig, userDataRefConfig } from '@/config/dbRef.config';
import { mapFirebaseAuthError } from '@/utils/firebaseHelperFunction';
import { encrypt } from '@/utils/cryp';

const toast = useToast();

export interface AuthState {
    isLoggedIn: boolean;
    isRegisterProcess: boolean;
    currentUserSession: CurrentUserSession | null;
    authRequest: {
        email: string;
        password: string;
        confirmPassword?: string;
    };
    error: {
        errorCode: string | null;
        errorMessage: string | null;
        userMessage: string | null;
    };
    emailNotRegiter: boolean;
    isLoginProcess: boolean;
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
        authRequest: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        error: {
            errorCode: '',
            errorMessage: '',
            userMessage: ''
        },
        isRegisterProcess: false,
        isLoginProcess: false,
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
            this.authRequest = { email: '', password: '', confirmPassword: '' };
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
                    localStorage.setItem('_uid', encrypt(uid));

                    // Set Detail Information such as profiderId
                    this.onLoginAction(user);

                    userService.fetchCurrentUser(uid);
                } else {
                    localStorage.removeItem('_uid');
                    this.isLoggedIn = false;
                }
            });
        },

        loginEmailPassword() {
            signInWithEmailAndPassword(auth, this.authRequest.email.toLowerCase(), this.authRequest.password)
                .then(({ user }) => {
                    /** Set User Detail to Context. */
                    this.onLoginAction(user);

                    /** Stop Loading and Redirect in to Dashboard. */
                    this.isLoginProcess = false;
                    this.router.replace({ name: 'AppDashboard' });
                })
                .catch((error) => {
                    this.setErrorData(error)
                    this.isLoginProcess = false;
                });
        },

        registerWithEmailPassword() {
            const { onRegisterUser } = useUser();

            if (this.authRequest.password === this.authRequest.confirmPassword) {
                createUserWithEmailAndPassword(auth, this.authRequest.email, this.authRequest.password)
                    .then(async ({ user }) => {
                        /** Set User Details Data. */
                        this.onLoginAction(user);

                        /** Save User Details To tbl_users. */
                        await onRegisterUser({ userId: user.uid, email: user.email as string });

                        /** Set isRegister to false and Redirect to Dashboard page. */
                        this.isRegisterProcess = false;

                        sendEmailVerification(user)
                            .then(() => {
                                this.onLogoutAction();
                                this.router.push({ query: { cta: 'create-confirmed' } });
                                toast.info("Email verifikasi telah dikirim.");
                            });
                    })
                    .catch((error) => {
                        this.setErrorData(error)
                        this.isRegisterProcess = false;
                    });
            } else {
                toast.warning("Password dan Konfirm Password tidak sama")
            }

        },

        loginGoogle() {
            const { onRegisterUser } = useUser();
            signInWithPopup(auth, gProvider)
                .then(({ user }) => {
                    onRegisterUser({ userId: user.uid, email: user.email as string }, { user: user, oauth: true })
                        .then(() => {
                            this.onLoginAction(user);
                            this.router.replace({ name: 'AppDashboard' })
                        });

                }).catch((error) => {
                    this.setErrorData(error);
                    this.isLoginProcess = false;
                });
        },

        /**
       * Update email with prom credential before confirm action
       * @param  {string} newEmail
       * @param  {string} currentUserPassword
       * @returns Promise
       */
        async updateCurrentUserEmail(newEmail: string, currentUserPassword: string): Promise<void> {

            const currentUser = auth.currentUser as User;

            if (currentUser.email?.toLowerCase() == newEmail.toLowerCase())
                toast.success("Email sama dengan email saat ini.")

            const userRef = userCollectionRefConfig();
            const q = queryByPropertyRefConfig(userRef, 'email', newEmail);

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
                                    const userRef = userDataRefConfig(currentUser.uid);
                                    await updateDoc(userRef, {
                                        lastModifiedDate: Date.now(),
                                        email: newEmail
                                    });

                                    toast.success("Email berhasil diupdate.")
                                }).catch((error) => {
                                    this.setErrorData(error);
                                });
                        }).catch((error) => {
                            this.setErrorData(error)
                        });
                    } else {
                        toast.success("Email telah digunakan.")
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
            const currentUser = auth.currentUser as User;
            const userService = useUser();
            const user = userService.currentUser as AppUser;

            const credential = EmailAuthProvider.credential(
                currentUser.email as string,
                currentUserPassword
            );

            reauthenticateWithCredential(currentUser, credential).then(() => {
                updatePassword(currentUser, newPassword)
                    .then(() => {
                        userService.updateCurrentUserData(user, { isSilent: true })
                            .then(() => toast.success("Password berhasil diubah."))
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
            const userRef = userCollectionRefConfig();
            const q = queryByPropertyRefConfig(userRef, 'email', email);
            getDocs(q)
                .then(async (snapshot) => {
                    if (snapshot.size === 1) {
                        await sendPasswordResetEmail(auth, email)
                            .then(() => {
                                this.router.push({ query: { cta: 'reset-confirmed' } });
                                toast.info('Reset password link telah dikirim, silahkan cek email.');
                            })
                            .catch((error) => {
                                this.setErrorData(error);
                            });
                    } else {
                        this.emailNotRegiter = true;
                        toast.warning(`${email} tidak terdaftar.`);
                    }
                })

            setTimeout(() => {
                this.emailNotRegiter = false;
            }, 5000);
        },

        async resetPasswordConfirm(oobCode: string, newPassword: string) {
            await confirmPasswordReset(auth, `${oobCode}`, newPassword);
        },

        doVerifyAcount(oobCode: string): void {
            applyActionCode(auth, oobCode)
                .then(() => {
                    this.router.replace({ name: 'LoginPage' });
                    toast.info(`Akun telah diaktifkan, silahkan Login Aplikasi.`);
                }).catch((_err) => {

                });
        },

        /**
         * This method and handle send email verification after user register
         * @returns Promise
         */
        async sendVerificationEmail(authUser: User): Promise<void> {
            await sendEmailVerification(authUser)
                .then(() => {
                    // TODO: need to be implementing
                });
        },

        /**
         * This will permanently delete the user data
         */
        async deleteAccount() {
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
            const me = auth.currentUser as User;
            const { currentUser } = storeToRefs(useUser());

            // Set is_active to false
            const user = currentUser.value as AppUser;
            user.is_active = false

            await updateDoc(userDataRefConfig(me.uid), user as any);
        },

        /**
        * Activated The Account
        */
        async activatedAccount() {
            const me = auth.currentUser as User;
            const { currentUser } = storeToRefs(useUser());

            // Set is_active to false
            const user = currentUser.value as AppUser;
            user.is_active = true

            await updateDoc(userDataRefConfig(me.uid), user as any);
        },

        setErrorData(error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;

            this.$patch(state => state.error = {
                errorCode: errorCode,
                errorMessage: errorMessage,
                userMessage: mapFirebaseAuthError(error)
            });

            if (errorCode === 'auth/wrong-password')
                toast.error('Wrong password, please fill in the correct password.')
            else if (errorCode === 'auth/too-many-requests')
                toast.error('Too many request, your password wrong more than three time.')

            console.log(`${errorCode} => ${errorMessage}`);
        }
    }
})