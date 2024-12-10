<template>
    <div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-dark-blue dark:border-slate-700">
        <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
            <ButtonNavBottom @click="goTo(1)" :isActive="$route.query.tab == 'profile'" title="Profil">
                <ProfileIcon  class="w-5 h-5"/>
            </ButtonNavBottom>
            <ButtonNavBottom @click="goTo(3)" :isActive="$route.query.tab == 'appearance'" title="Tampilan">
                <AppearanceIcon class="w-5 h-5"/>
            </ButtonNavBottom>
            <ButtonNavBottom @click="goTo(4)" :isActive="$route.query.tab == 'privacy'" title="Privasi">
                <ExclamationIcon class="w-5 h-5"/>
            </ButtonNavBottom>
            <ButtonNavBottom @click="goTo(2)" :isActive="$route.query.tab == 'account'" title="Pengaturan">
                <GearIcon class="w-5 h-5"/>
            </ButtonNavBottom>
        </div>
    </div>
</template>

<script setup lang="ts">
import { } from '@/services';
import ProfileIcon from '../svg/ProfileIcon.vue';
import GearIcon from '../svg/GearIcon.vue';
import AppearanceIcon from '../svg/AppearanceIcon.vue';
import ExclamationIcon from '../svg/ExclamationIcon.vue';
import ButtonNavBottom from '../shared/ButtonNavBottom.vue';

const emits = defineEmits<{ (e: 'on-change', tab: number): void }>();

function goTo(tab: number) {
    emits('on-change', tab);
}
</script>