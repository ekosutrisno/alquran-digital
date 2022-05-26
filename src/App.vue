<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuth } from '@/services';
import { useDark } from '@vueuse/core'
import { onBeforeMount } from 'vue';

// For handling and checking dark mode configuration from localStorage
useDark();

// Authentication checking point
useAuth();

const authService = useAuth()
onBeforeMount(() => authService.authState());

</script>
