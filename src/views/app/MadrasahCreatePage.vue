<template>
    <div ref="pageUp" class="absolute -top-20"></div>

    <div class="wrapper md:p-2 space-y-6 max-w-screen-lg mx-auto">
        <div class="flex flex-col items-center justify-center mb-10">
            <h1 class="text-2xl font-semibold">Data Sekolah</h1>
            <p class="text-sm text-center">Pengisian data umum sekolah</p>
        </div>
        <div v-if="route.query.step == '1'" class="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            <CardMadrasahType v-for="type in madrasahType" :key="type.type" :type="type" />
        </div>

        <!-- Section 1-->
        <section v-if="route.query.step == '2'" class="gap-y-4 h-auto xl:gap-4 grid-cols-1 xl:grid-cols-4 mx-auto">
            <div
                class="bg-white relative overflow-hidden dark:bg-dark-blue shadow-lg shadow-slate-200 dark:shadow-slate-900/40 ring-1 dark:ring-slate-700 ring-slate-700/10 rounded p-4 col-span-3 flex flex-col">
                <Svg3 aria-hidden="true" class="absolute right-[-6.5rem] bottom-24 rotate-90" />
                <!-- Content of tabs 1 -->
                <div class="with-transition grid grid-cols-1 lg:grid-cols-2 w-full py-6 px-2">
                    <!-- Room Data -->
                    <FormCreateMadrasah @send="saveMadrasah" />

                    <!-- Image Ilustration -->
                    <div>
                        <img src="@/assets/school.svg" alt="img-ill" class="">
                    </div>
                </div>
            </div>
        </section>

        <ScrollToTop @on-back="scrollToPageUp" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { useMadrasah } from '@/services';
import Svg3 from '@/components/svg/Svg3.vue';
import CardMadrasahType from '@/components/app/card/CardMadrasahType.vue';
import { madrasahType } from '@/assets/data/data-dummy';
import FormCreateMadrasah from '@/components/app/FormCreateMadrasah.vue';

const route = useRoute();
const router = useRouter();
const { getMadrasah, createMadrasah, updateMadrasah } = useMadrasah();

onMounted(async () => {
    if (route.query.a === 'edit')
        await getMadrasah(String(route.query.id));
})

const saveMadrasah = async () => {
    const action = route.query.a === 'create' ? createMadrasah : updateMadrasah;

    try {
        await action();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push({ name: 'MadrasahPage' });
    } catch (error) {
        console.error("Failed to save Madrasah:", error);
    }
};

const pageUp = ref<HTMLDivElement | undefined>();
const scrollToPageUp = () => {
    if (pageUp != null)
        pageUp.value?.scrollIntoView({ behavior: 'smooth' });
}

</script>