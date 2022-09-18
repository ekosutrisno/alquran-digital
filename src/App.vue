<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuth, useUser } from '@/services';
import { useDark } from '@vueuse/core'
import { onBeforeMount, onMounted, ref } from 'vue';
import { getTokenFcm, requestPermission, messaging, onMessage } from '@/services/useFirebase';
import { useToast } from 'vue-toastification';

const toast = useToast();

const isLogin = ref<string | null>(localStorage.getItem('_uid'))

onMounted(() => {
  useDark();
  if(isLogin.value != null){
    requestPermission();
    getTokenFcm(isLogin.value);

    const { currentUser } = useUser();

    onMessage(messaging, (payload) => {
          const notif = payload.notification as any;
          console.log(payload);
          const notificationOptions = {
              title: `${notif?.title}`,
              body: `Hi ${currentUser?.full_name}, ${notif.body}`,
              image: notif.image || `https://res.cloudinary.com/ekosutrisno/image/upload/v1662785818/briix/notif_n0ogoj.jpg`,
              icon: 'https://res.cloudinary.com/ekosutrisno/image/upload/v1662786263/briix/n_pyzbuz.png',
          };
          var n = new Notification(notificationOptions.title, notificationOptions);
          toast.info(notificationOptions.title);
          n.onshow;
      });
  }
})

// Authentication checking point
const authService = useAuth()
onBeforeMount(() => authService.authState());

</script>
