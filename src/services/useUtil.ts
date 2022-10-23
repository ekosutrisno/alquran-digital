import { defineStore } from "pinia";


interface UtilState {
    wideMenu: boolean | any,
    appVersion: string;
}
export const useUtil = defineStore('utilityService', {
    state: (): UtilState => ({
        wideMenu: true,
        appVersion: `${import.meta.env.VITE_BASE_APP_VERSION}`
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