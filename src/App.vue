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
import ToastUpdateAvailabelVue from '@/components/shared/ToastUpdateAvailable.vue';
import OfflineBanner from './components/shared/OfflineBanner.vue';
import { decrypt } from './utils/cryp';
import { SpeedInsights } from "@vercel/speed-insights/vue"

const { loadNotifications } = useNotification();
const { chatInfo } = useChats();
const { authState } = useAuth()
const isLogin = ref(decrypt(String(localStorage.getItem("_uid"))));

onBeforeMount(() => authState());

onMounted(() => {
  useDark();
  if (isLogin.value?.length) {
    // Check Utility Info
    chatInfo(isLogin.value);

    // Notifications handling (Need Improvement)
    loadNotifications();
  }
})
</script>