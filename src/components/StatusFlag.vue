<template>
    <span 
        class="font-bold uppercase text-[9px] py-0.5 px-2 rounded-full border" 
        :class="featureTagVariant(flag).class"
    >
    {{ featureTagVariant(flag).textLabel }}
    </span>
</template>

<script setup lang="ts">
import { TagType } from '@/types/user.interface';
import { featureTagVariant } from '@/utils/helperFunction';

defineProps<{flag: TagType}>()
</script>