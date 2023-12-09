import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import i18n from "./i18n"
import { updateSW } from './utils/serviceWorker'

import App from './App.vue'
import { useRoute } from 'vue-router'
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
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import calendar from 'dayjs/plugin/calendar';
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

updateSW();

const app = createApp(App);

app.use(createPinia()
    .use(({ store }) => { store.router = markRaw(router) })
    .use(({ store }) => { store.route = markRaw(useRoute()) })
);
app.use(router);
app.use(Toast, options);
app.use(MotionPlugin);
app.use(i18n);

app.mount('#app');
