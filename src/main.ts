import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerSW } from 'virtual:pwa-register'
import { MotionPlugin } from '@vueuse/motion'

import App from './App.vue'
import router from './router';
import './index.css'

// Vue Lottie
import Vue3Lottie from 'vue3-lottie'
import 'vue3-lottie/dist/style.css'

//Vue Toastification
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";
const options: PluginOptions = {
    hideProgressBar: true,
    timeout: 3500,
    closeButton: false,
    toastClassName: 'toast-style',
    maxToasts: 3
};

// DayJs Config And Extends
import * as dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(localizedFormat)
dayjs.extend(localeData)
dayjs.extend(relativeTime)

const updateSW = registerSW({
    onNeedRefresh() { 
        console.log("Al-Quran Digital Need Refresh, new Content Available.");
     },
    onOfflineReady() {
        console.log("Al-Quran Digital Ready for Ofline.");
     },
})

updateSW();



const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Toast, options);
app.use(Vue3Lottie);
app.use(MotionPlugin);

app.mount('#app');
