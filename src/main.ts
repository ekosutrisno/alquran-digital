import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerSW } from 'virtual:pwa-register'
import { MotionPlugin } from '@vueuse/motion'
import i18n from "./i18n"

import App from './App.vue'
import router from './router';
import './index.css'

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
import calendar  from 'dayjs/plugin/calendar';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import updateLocale from 'dayjs/plugin/updateLocale';
dayjs.extend(localizedFormat);
dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault(dayjs.tz.guess());

dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
    calendar: {
        lastDay: '[Yesterday at] HH:mm',
        sameDay: '[Today at] HH:mm',
        nextDay: '[Tomorrow at] HH:mm',
        lastWeek: '[Last seen] dddd [at] HH:mm',
        nextWeek: 'dddd [at] HH:mm',
        sameElse: 'L'
    }
})

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
app.use(MotionPlugin);
app.use(i18n);

app.mount('#app');
