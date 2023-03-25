import { createI18n } from 'vue-i18n'
import numberFormats from "./rules/numbers"
import en from "./locales/en.json";
import id from "./locales/id.json";

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
    messages: { en, id },
    runtimeOnly: false,
    numberFormats
})