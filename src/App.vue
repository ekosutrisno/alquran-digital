<template>
  <router-view />
  <ToastUpdateAvailabelVue />
</template>

<script setup lang="ts">
import { useAuth, useChats, useNotification } from '@/services';
import { useDark } from '@vueuse/core'
import { onBeforeMount, onMounted, ref } from 'vue';
import { getTokenFcm, requestPermission } from '@/services/useFirebase';
import ToastUpdateAvailabelVue from '@/components/shared/ToastUpdateAvailable.vue';

const { loadNotifications, onMessageForeground } = useNotification();
const { chatInfo } = useChats();
const { authState } = useAuth()
const isLogin = ref<string | null>(localStorage.getItem('_uid'))

onBeforeMount(() => authState());

onMounted(() => {
  useDark();
  if (isLogin.value != null) {
    // Check Utility Info
    chatInfo(isLogin.value);

    // FCM Token handling
    requestPermission();
    getTokenFcm(isLogin.value);

    // Notifications handling
    loadNotifications();
    onMessageForeground();
  }
})
</script>
