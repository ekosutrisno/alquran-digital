import { QuranLayoutSize } from '@/types/user.interface';
import { defineStore } from "pinia";

interface UtilState {
    wideMenu: boolean | any,
    appVersion: string;
    newAppAvailable: boolean;
    ayahConfig: {
        showTransliteration: boolean,
        showTranslation: boolean,
    }
}

type TargetConfig = 'transliteration' | 'translation';

export const useUtil = defineStore('utilityService', {
    state: (): UtilState => ({
        wideMenu: JSON.parse(localStorage.getItem("_a_mode") as string ?? 'true') as boolean,
        appVersion: `${import.meta.env.VITE_BASE_APP_VERSION}`,
        newAppAvailable: false,
        ayahConfig: JSON.parse(localStorage.getItem("_a_config") as string) ?? {
            showTransliteration: true,
            showTranslation: true,
        }
    }),

    actions: {
        setAlquranSize(size: QuranLayoutSize) {
            localStorage.setItem('_a_size', JSON.stringify(size));
        },
        setModeScreen() {
            this.wideMenu = this.wideMenu ? false : true;
            localStorage.setItem('_a_mode', JSON.stringify(this.wideMenu));
        },

        setAyahCardConfig(target: TargetConfig) {
            const curr = JSON.parse(localStorage.getItem('_a_config') || '{}') as {
                showTransliteration?: boolean;
                showTranslation?: boolean;
            };

            const updatedConfig = {
                showTransliteration: target === 'transliteration' ? !curr.showTransliteration : curr.showTransliteration ?? false,
                showTranslation: target === 'translation' ? !curr.showTranslation : curr.showTranslation ?? false,
            };

            this.ayahConfig = updatedConfig;
            localStorage.setItem('_a_config', JSON.stringify(updatedConfig));
        }
    },
    getters: {
        getAppVersion(state: UtilState) {
            return state.appVersion;
        }
    }
})