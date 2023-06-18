import { defineStore } from "pinia";


interface UtilState {
    wideMenu: boolean | any,
    appVersion: string;
    newAppAvailable: boolean;
}
export const useUtil = defineStore('utilityService', {
    state: (): UtilState => ({
        wideMenu: true,
        appVersion: `${import.meta.env.VITE_BASE_APP_VERSION}`,
        newAppAvailable: false
    }),

    actions: {

        setAlquranSize(size: {
            id: number,
            size: string,
            text: string,
            class: string
        }) {
            localStorage.setItem('_a_size', JSON.stringify(size));
        }
    },
    getters:{
        getAppVersion(state: UtilState){
            return state.appVersion;
        }
    }
})