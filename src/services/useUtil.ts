import { defineStore } from "pinia";


interface UtilState {
    wideMenu: boolean | any
}
export const useUtil = defineStore('utilityService', {
    state: (): UtilState => ({
        wideMenu: true,
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
    }
})