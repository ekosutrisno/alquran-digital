<template>
    <footer class="mt-4 py-5">
        <p class="text-center font-semibold dark:text-white">Al-Qur'an Digital by <span class="text-gradien">Kelas Pondok</span></p>
        <p class="mt-5 text-center text-sm leading-6 text-slate-500 dark:text-slate-300">Released under the MIT License.</p>
        <p class="text-center text-sm leading-6 text-slate-500 dark:text-slate-300"> Copyright &copy;2022-{{ new Date().getFullYear() }} Eko Sutrisno.</p>
        <div class="mt-16 relative flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
            <router-link :to="{name: 'PrivacyPolicyPage'}">Privacy policy</router-link>
            <div class="h-4 w-px bg-slate-500/20"></div>
            <router-link :to="{name: 'DocumentationPage'}">About</router-link>
        </div>
    </footer>
</template>