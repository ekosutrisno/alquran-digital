<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuth, useNotification } from '@/services';
import { useDark } from '@vueuse/core'
import { onBeforeMount, onMounted, ref } from 'vue';
import { getTokenFcm, requestPermission} from '@/services/useFirebase';

const isLogin = ref<string | null>(localStorage.getItem('_uid'))
const notificationService = useNotification();

onMounted(() => {
  useDark();
  if(isLogin.value != null){
    requestPermission();
    getTokenFcm(isLogin.value);

    notificationService.loadNotifications();
    notificationService.onMessageForeground();
  }
})

// Authentication checking point
const authService = useAuth()
onBeforeMount(() => authService.authState());

</script>
