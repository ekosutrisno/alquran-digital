<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAuth } from './services';
import { useDark } from '@vueuse/core'

// For handling and checking dark mode configuration from localStorage
useDark();

// Authentication checking point
useAuth();

</script>
