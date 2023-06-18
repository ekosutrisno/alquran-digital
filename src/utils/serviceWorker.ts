import { useUtil } from "@/services";
import { registerSW } from "virtual:pwa-register";

export const updateSW = registerSW({
    onNeedRefresh() {
        const utilityService = useUtil();
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                const sw = registration.installing || registration.waiting || registration.active;
                if (sw) {
                    if (sw.state === 'installed') {
                        sw.postMessage({ action: 'skipWaiting' });
                        utilityService.newAppAvailable = true;
                    }
                }
            });
        }
    },
    onOfflineReady() {
        console.log("Al-Quran Digital Ready for Ofline.");
    },
})

export function reloadAndInstall() {
    navigator.serviceWorker.getRegistration().then(registration => {
        if (registration && registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
    });
}