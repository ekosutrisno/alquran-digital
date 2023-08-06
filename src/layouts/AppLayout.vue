<template>
<div class="antialiased font-quicksand flex min-h-screen flex-col justify-between dark:bg-slate-900">
   <div class="fixed inset-0 bg-[url(@/assets/grid-light.svg)] dark:bg-[url(@/assets/grid-dark.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
   <header class="w-full relative text-slate-700 dark:text-slate-200 bg-gray-50 border-b border-gray-300/50 dark:border-slate-800 dark:bg-[#0B1120] h-64 p-4 transition-colors">
      <NavbarHeader @search="openModal"/>
   </header>

   <div :class="[wideMenu ? '' : 'max-w-7xl']" class="flex-1 w-full relative mx-auto p-4 sm:p-8 -mt-44 pb-4 md:pb-0">
      <router-view />
   </div>
   <Footer />
</div>
<Teleport to="body">
   <ModalSearch :open="state.onSearch" @close-modal="closeModal"/>
 </Teleport>
</template>
<script setup lang="ts">
import NavbarHeader from '@/components/app/NavbarHeader.vue';
import { useUtil } from '@/services';
import { onMounted, reactive } from 'vue';
import ModalSearch from '@/components/shared/ModalSearch.vue';
import { storeToRefs } from 'pinia';
import Footer from '@/components/Footer.vue';
import { initFlowbite } from 'flowbite';

onMounted(() => initFlowbite());

const utilService = useUtil();
const {wideMenu} = storeToRefs(utilService);
const state = reactive({
   onSearch: false
})

const openModal = ()=>{
   state.onSearch = !state.onSearch;
}

const closeModal = (open: boolean)=>{
   state.onSearch = open;
}
</script>