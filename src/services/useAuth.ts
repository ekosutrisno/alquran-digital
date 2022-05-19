import { defineStore } from 'pinia';

export interface AuthState {
    currentUser: any | undefined;
}

export const useAuth = defineStore('useAuth', {
    state: (): AuthState => ({
        currentUser: {
            userId: 1000,
            username: "eko.sutrisno",
            email: "eko.sutrisno@gmail.com",
            isActive: true
        }
    }),
    getters:{
        
    }
})