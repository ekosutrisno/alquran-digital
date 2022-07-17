<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuth } from '@/services';
import { useDark } from '@vueuse/core'
import { onBeforeMount } from 'vue';

useDark();

// Authentication checking point
const authService = useAuth()
onBeforeMount(() => authService.authState());

</script>
