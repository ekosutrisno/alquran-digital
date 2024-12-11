<template>
<div class="space-y-6 md:space-y-10">
    <!-- S1 -->
    <section>
        <div class="pb-2">
            <p class="text-xl dark:text-white inline-flex items-center space-x-2">
                <AppearanceIcon class="text-slate-500 w-6 h-6"/>
                <span>Tema Aplikasi</span>
            </p>
            <div class="dark:border-slate-700/50 py-2">
                <p class="text-sm text-slate-700 dark:text-slate-300">Choose how Al-Qur'an Digital looks to you. Select a single theme, or sync with your system and automatically switch between day and night themes.</p>
            </div>
        </div>
        <div class="text-sm dark:text-white max-w-md">
            <div @click="toggle()" class="border cursor-pointer dark:hover:bg-sky-800/50 hover:bg-sky-50/75 transition border-sky-500 dark:border-slate-700/50 rounded-lg p-3 flex flex-col">
                <div class="inline-flex justify-between">
                    <div class="inline-flex dark:hidden items-center space-x-1.5 text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <p class="font-semibold">Day theme</p>
                    </div>
                    <div class="hidden dark:inline-flex items-center space-x-1.5 text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        <p class="font-semibold">Night theme</p>
                    </div>
                    <span class="text-xs py-0.5 px-1.5 text-sky-500 rounded-full border border-sky-500">Active</span>
                </div>
                <p class="text-xs mt-3 dark:hidden">This theme will be active when your system is set to “light mode”</p>
                <p class="text-xs mt-3 hidden dark:block">This theme will be active when your system is set to “dark mode”</p>
            </div>
        </div>
    </section>

    <!-- S2 TODO: Show Arti dan TransLiteration -->
    <section>
        <div class="pb-2">
            <p class="text-xl dark:text-white inline-flex items-center space-x-2">
                <AppearanceAyahIcon class="text-slate-500 w-6 h-6"/>
                <span>Tampilan Ayah</span>
            </p>
            <div class="dark:border-slate-700/50 py-2">
                <p class="text-sm text-slate-700 dark:text-slate-300">Konfigurasi untuk menampilan cara baca dan terjemahan dari setiap ayat.</p>
            </div>
        </div>
        <div class="text-sm grid md:grid-cols-2 gap-4 dark:text-white">
            <div @click="setAyahCardConfig('translation')" class="border cursor-pointer dark:hover:bg-sky-800/50 hover:bg-sky-50/75 transition border-sky-500 dark:border-slate-700/50 rounded-lg p-3 flex flex-col">
                <div class="inline-flex justify-between">
                    <div class="inline-flex items-center space-x-1.5 text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M5.25 14.5a.75.75 0 0 1 .75-.75h8a.75.75 0 1 1 0 1.5H6a.75.75 0 0 1-.75-.75m0 3.5a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75"/><path d="M12.25 2.834c-.46-.078-1.088-.084-2.22-.084c-1.917 0-3.28.002-4.312.14c-1.012.135-1.593.39-2.016.812s-.677 1.003-.812 2.009c-.138 1.028-.14 2.382-.14 4.29v4c0 1.906.002 3.26.14 4.288c.135 1.006.389 1.586.812 2.01c.423.422 1.003.676 2.009.811c1.028.139 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812s.677-1.003.812-2.009c.138-1.027.14-2.382.14-4.289v-.437c0-1.536-.01-2.264-.174-2.813h-3.13c-1.133 0-2.058 0-2.79-.098c-.763-.103-1.425-.325-1.954-.854s-.751-1.19-.854-1.955c-.098-.73-.098-1.656-.098-2.79zm1.5.776V5c0 1.2.002 2.024.085 2.643c.08.598.224.891.428 1.094s.496.348 1.094.428c.619.083 1.443.085 2.643.085h2.02a46 46 0 0 0-1.17-1.076l-3.959-3.563A37 37 0 0 0 13.75 3.61m-3.575-2.36c1.385 0 2.28 0 3.103.315c.823.316 1.485.912 2.51 1.835l.107.096l3.958 3.563l.125.112c1.184 1.065 1.95 1.754 2.361 2.678s.412 1.954.411 3.546v.661c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433V9.945c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.75-.749 1.701-1.08 2.878-1.238c1.144-.153 2.607-.153 4.455-.153h.202"/></g></svg>
                        <p class="font-semibold">Tampilkan Arti Ayat</p>
                    </div>
                    <span class="text-xs py-0.5 px-1.5 text-sky-500 rounded-full border border-sky-500">{{ ayahConfig.showTranslation ? 'Aktif' : 'Non Aktif' }}</span>
                </div>
                <p class="text-xs mt-3">Pengaturan untuk menampilkan terjemahan dari setiap ayah.</p>
            </div>
            <div @click="setAyahCardConfig('transliteration')" class="border cursor-pointer dark:hover:bg-sky-800/50 hover:bg-sky-50/75 transition border-sky-500 dark:border-slate-700/50 rounded-lg p-3 flex flex-col">
                <div class="inline-flex justify-between">
                    <div class="inline-flex items-center space-x-1.5 text-sky-500">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12.14 4.91c-.714.347-1.62.942-2.909 1.792l-.219.144l-.05.033c-.38.25-.643.424-.931.552a3.8 3.8 0 0 1-.89.267c-.31.052-.626.052-1.082.052H6c-1.444 0-1.93.016-2.345.208a2.47 2.47 0 0 0-1.036.975c-.218.405-.259.82-.336 2.084c-.02.347-.033.68-.033.983s.012.636.033.983c.077 1.264.118 1.68.336 2.084c.209.389.635.79 1.036.975c.414.192.901.208 2.345.208h.06c.455 0 .77 0 1.081.052q.462.079.89.267c.288.128.552.301.932.552l.05.033l.218.144c1.29.85 2.195 1.445 2.91 1.792c.711.346 1.068.36 1.317.275c.137-.047.272-.115.39-.199c.217-.152.415-.447.553-1.218c.14-.775.191-1.847.263-3.377c.052-1.12.086-2.06.086-2.571s-.034-1.451-.086-2.57c-.072-1.531-.123-2.603-.262-3.378c-.14-.771-.337-1.066-.553-1.218a1.6 1.6 0 0 0-.391-.2c-.25-.084-.606-.07-1.318.276m-.655-1.35c.826-.4 1.64-.624 2.457-.345c.272.093.534.226.769.391c.706.497 1.005 1.28 1.167 2.18c.159.884.213 2.056.281 3.516l.003.058c.052 1.115.088 2.088.088 2.64s-.036 1.525-.088 2.64l-.003.058c-.068 1.46-.122 2.632-.281 3.516c-.162.9-.461 1.683-1.167 2.18a3 3 0 0 1-.769.39c-.818.28-1.631.057-2.457-.344c-.814-.396-1.8-1.047-3.032-1.858l-.267-.176c-.447-.295-.602-.394-.76-.464q-.257-.114-.535-.16c-.171-.03-.354-.032-.89-.032h-.162c-1.217 0-2.062.001-2.814-.347a3.96 3.96 0 0 1-1.727-1.624c-.392-.729-.438-1.49-.504-2.575l-.008-.13A18 18 0 0 1 .75 12c0-.341.014-.706.036-1.074l.008-.13C.86 9.712.906 8.95 1.298 8.22a3.96 3.96 0 0 1 1.727-1.624c.752-.348 1.597-.348 2.814-.347H6c.537 0 .72-.002.891-.031a2.3 2.3 0 0 0 .534-.16c.16-.07.314-.17.761-.465l.267-.176c1.231-.811 2.218-1.462 3.032-1.857m8.035 1.864a.75.75 0 0 1 1.056.096L20 6l.576-.48l.001.001l.002.002l.003.004l.007.009a2 2 0 0 1 .086.114a5 5 0 0 1 .203.311c.161.27.368.665.572 1.195c.408 1.061.8 2.653.8 4.844s-.392 3.783-.8 4.845a7.7 7.7 0 0 1-.572 1.194a5 5 0 0 1-.268.399l-.013.017l-.008.01l-.007.009l-.003.003l-.002.002L20 18l.576.48a.75.75 0 0 1-1.156-.955m0 0l.003-.005l.031-.041a3 3 0 0 0 .137-.212c.12-.198.288-.516.459-.961c.342-.889.7-2.297.7-4.306s-.358-3.417-.7-4.306a6 6 0 0 0-.459-.961a3 3 0 0 0-.171-.257l.003.004l-.001-.002l-.002-.002a.75.75 0 0 1 .1-1.052m-1.884 2.92a.75.75 0 0 1 1.02.292l-.628.349l.628-.349v.001l.001.002l.002.003l.004.007l.01.018l.026.054q.03.064.075.174c.06.147.132.356.203.631c.14.551.273 1.364.273 2.474s-.132 1.923-.273 2.474a5 5 0 0 1-.203.631a3 3 0 0 1-.102.228l-.01.019l-.003.007l-.002.003v.001s-.001.002-.63-.347l.629.348a.75.75 0 0 1-1.317-.719l.005-.01l.038-.087c.035-.087.087-.234.141-.447c.11-.424.227-1.11.227-2.1s-.118-1.678-.227-2.102a4 4 0 0 0-.179-.534l-.005-.01a.75.75 0 0 1 .297-1.01" clip-rule="evenodd"/></svg>
                        <p class="font-semibold">Tampilkan Cara Baca</p>
                    </div>
                    <span class="text-xs py-0.5 px-1.5 text-sky-500 rounded-full border border-sky-500">{{ ayahConfig.showTransliteration ? 'Aktif' : 'Non Aktif' }}</span>
                </div>
                <p class="text-xs mt-3">Pengaturan untuk menampilkan cara membaca dari setiap ayah.</p>
            </div>
        </div>
    </section>

    <!-- S3 -->
    <section>
        <div class="pb-2">
            <p class="text-xl dark:text-white inline-flex items-center space-x-2">
                <SizeIcon class="text-slate-500"/>
                <span>Lebar Tampilan Ayat</span>
            </p>
            <div class="dark:border-slate-700/50 py-2">
                <p class="text-sm text-slate-700 dark:text-slate-300">This is the provider that is used for you to log in to the application and also what accounts are connected.</p>
            </div>
        </div>

         <div class="grid sm:grid-cols-3 gap-2">
            <ul v-for="size in state.sizes" :key="size.id">
                <button type="button" @click="selectSize(size)" :class="[size.id == state.sizeSelected.id ? 'bg-sky-500 ring-0 text-white' : '']" class="py-2 rounded-lg ring-1 ring-slate-700/20 dark:ring-slate-700 dark:hover:ring-sky-500 hover:ring-sky-500 px-3 inline-flex items-center justify-center space-x-1 w-full relative dark:text-white transition">
                    <div class="col-span-1 hidden md:inline">{{ size.size }}</div> <div class="text-sm col-span-3 text-left"> &bull; {{ size.text}}</div>
                </button>
            </ul>
         </div>
    </section>
</div>
</template>

<script setup lang="ts">
import { useUtil } from '@/services';
import { useDark, useToggle } from '@vueuse/core';
import { reactive } from 'vue';
import AppearanceIcon from '../svg/AppearanceIcon.vue';
import SizeIcon from '../svg/SizeIcon.vue';
import { QuranLayoutSize } from '@/types/user.interface';
import AppearanceAyahIcon from '../svg/AppearanceAyahIcon.vue';
import { storeToRefs } from 'pinia';

const isDark = useDark();
const toggle = useToggle(isDark);

const { setAlquranSize, setAyahCardConfig } = useUtil();
const { ayahConfig } = storeToRefs(useUtil());

const state = reactive({
    sizeSelected: localStorage.getItem('_a_size') != null
        ? JSON.parse(localStorage.getItem('_a_size') as string)
        : {
            id: 1,
            size: 'MD',
            text: 'Medium',
            class: 'max-w-screen-lg'
        },
    sizes: [
        {
            id: 1,
            size: 'MD',
            text: 'Medium',
            class: 'max-w-screen-lg'
        },
        {
            id: 2,
            size: 'LG',
            text: 'Large',
            class: 'max-w-screen-xl'
        },
        {
            id: 3,
            size: 'XL',
            text: 'Extra',
            class: 'w-full'
        }
    ]
})

const selectSize = (size: QuranLayoutSize) => {
    setAlquranSize(size);
    state.sizeSelected = size;
}
</script>