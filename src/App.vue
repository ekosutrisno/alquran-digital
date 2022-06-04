<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuth, useAyah } from '@/services';
import { useDark } from '@vueuse/core'
import { onBeforeMount, onMounted } from 'vue';

// For handling and checking dark mode configuration from localStorage
useDark();

// Authentication checking point
const authService = useAuth()
onBeforeMount(() => authService.authState());

</script>
