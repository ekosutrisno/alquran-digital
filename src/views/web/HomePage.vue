<template>
  <div class="flex flex-col justify-between with-transition">
    <div class="relative flex flex-col justify-center items-center pt-20 px-6 mx-auto">
      <p class="text-slate-900 dark:text-slate-100 font-extrabold tracking-wide text-xl md:text-4xl text-center">{{ t('home.s1') }} &#38; {{ t('home.s2') }} <span class="text-gradien">{{ t('home.quran') }}</span></p>
      <p class="text-slate-900 dark:text-slate-100 font-extrabold tracking-wide text-xl md:text-4xl text-center md:mt-2">{{ t('home.s3') }}</p>
      <p class="text-center tracking-wide text-sm md:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mt-4 md:mt-8 leading-6">{{ t('home.s4') }} <span class="text-gradien font-semibold">{{ t('home.quran') }}</span> {{ t('home.s5') }}</p>

      <div class="mt-10 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <button v-if="shown" @click="installPWA()" type="button" class="bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-50 text-slate-800 dark:text-gray-100 font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 dark:ring-0 dark:focus:ring-offset-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 20q-2.275 0-3.888-1.575T1 14.575q0-1.95 1.175-3.475T5.25 9.15q.425-1.8 2.125-3.425T11 4.1q.825 0 1.413.588T13 6.1v6.05l.9-.875q.275-.275.688-.275t.712.3q.275.275.275.7t-.275.7l-2.6 2.6q-.15.15-.325.213t-.375.062q-.2 0-.375-.062T11.3 15.3l-2.6-2.6q-.275-.275-.287-.687T8.7 11.3q.275-.275.688-.288t.712.263l.9.875V6.1q-1.9.35-2.95 1.838T7 11h-.5q-1.45 0-2.475 1.025T3 14.5q0 1.45 1.025 2.475T6.5 18h12q1.05 0 1.775-.725T21 15.5q0-1.05-.725-1.775T18.5 13H17v-2q0-1.2-.55-2.238T15 7V4.675q1.85.875 2.925 2.588T19 11q1.725.2 2.863 1.488T23 15.5q0 1.875-1.313 3.188T18.5 20h-12Zm5.5-8.95Z"/></svg>
          <span class="ml-2">{{ t('home.install') }}</span>
        </button>
        <Button :text="t('home.cta')" :to="{name: 'AppDashboard'}" />
      </div>
  </div>
</div>

</template>

<script setup lang="ts">
import Button from '@/components/shared/Button.vue';
import { onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toastification';

const { t } = useI18n();
const { info } = useToast();

const installEvent = ref<any>();
const shown = ref(false);

onBeforeMount(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installEvent.value = e
    shown.value = true
  })
});

function  installPWA() {
  installEvent.value?.prompt();

  installEvent.value?.userChoice
    .then((choice: { outcome: string, platform: string }) => {

      shown.value = false;

      if (choice.outcome === 'accepted') {
        info(`${t('home.quran')} Installed!`)
      } else {
        info(`${t('home.quran')} Not Installed!`)
      }
    })
}
</script>