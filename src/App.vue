<template>
  <SpeedInsights />
  <RouterView />
  <ToastUpdateAvailabelVue />
  <OfflineBanner />
</template>

<script setup lang="ts">
import { useAuth, useChats, useNotification } from '@/services';
import { useDark } from '@vueuse/core'
import { onBeforeMount, onMounted, ref } from 'vue';
import { getTokenFcm, requestPermission } from '@/config/firebase.config';
import ToastUpdateAvailabelVue from '@/components/shared/ToastUpdateAvailable.vue';
import OfflineBanner from './components/shared/OfflineBanner.vue';
import { decrypt } from './utils/cryp';
import { SpeedInsights } from "@vercel/speed-insights/vue"

const { loadNotifications, onMessageForeground } = useNotification();
const { chatInfo } = useChats();
const { authState } = useAuth()
const isLogin = ref(decrypt(String(localStorage.getItem("_uid"))));

onBeforeMount(() => authState());

onMounted(() => {
  useDark();
  if (isLogin.value?.length) {
    // Check Utility Info
    chatInfo(isLogin.value);

    // FCM Token handling
    requestPermission();
    getTokenFcm(isLogin.value);

    // Notifications handling (Need Improvement)
    loadNotifications();
    onMessageForeground();
  }
})
</script>