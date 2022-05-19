<template>
  <router-view />
</template>

<script setup lang="ts">
 import { useAuth } from './services';

 const authService = useAuth();

</script>
