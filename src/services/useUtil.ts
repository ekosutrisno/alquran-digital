import { defineStore } from "pinia";


interface UtilState {
    wideMenu: boolean | any
}
export const useUtil = defineStore('useUtil', {
    state: (): UtilState => ({
        wideMenu: false
    }),

    actions: {
    }
})