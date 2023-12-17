<template>
<div>
    <div class="pb-2">
        <p class="text-xl dark:text-white inline-flex items-center space-x-2">
            <MailIcon class="text-slate-500"/>
             <span>Update email</span>
        </p>
        <div class="border-t dark:border-slate-700/50 mt-2 py-2">
            <p class="text-sm text-slate-600 dark:text-slate-300">Mengubah email Anda akan memperbarui email Anda untuk login dan tindakan apa pun yang memerlukan email. Email baru harus berupa email aktif karena perlu diverifikasi.</p>
        </div>
    </div>
    <div v-if="!state.onChange">
        <button type="button" @click="toggleEdit" class="text-slate-800 dark:text-sky-50 bg-white hover:bg-slate-50 ring-1 ring-slate-700/20 hover:ring-slate-700/20 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-md text-sm">
            Update email
        </button>
    </div>
    <div v-else class="with-transition mt-4 md:mt-0 w-full max-w-lg space-y-4">
        <div>
            <label for="new-email" class="block text-sm font-medium text-slate-700 dark:text-slate-300">New email</label>
            <div class="mt-1 relative rounded-md shadow-sm">
                <input
                    v-model="state.newEmail" type="email" name="new-email" id="new-email"
                    class="focus:ring-sky-500 dark:bg-slate-700/25 dark:text-slate-50 focus:border-sky-500 block w-full pl-4 pr-12 sm:text-sm border-slate-300 dark:border-slate-700/50 rounded-md" placeholder="New email"
                />
            </div>
        </div>
        <p v-if="!isValidEmail && !isBlank" class="text-xs text-red-600">The value did not valid email</p>
        <div class="float-right relative">
            <button type="button" @click="toggleEdit" class="text-slate-800 dark:text-sky-50 bg-white hover:bg-slate-50 ring-1 ring-slate-700/10 hover:ring-slate-700/20 dark:bg-dark-blue dark:hover:bg-slate-700/50 dark:ring-slate-700/75 dark:hover:ring-slate-400/50 py-2 px-3 rounded-md mr-4 text-sm">
                Cancel
            </button>
            <button type="button" @click="toggleModalEmail(true)" :disabled="!isValidEmail || isBlank" class="mt-4 disabled:bg-opacity-50 inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-sky-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                <span class="mr-2">Update</span>
            </button>
        </div>
    </div>
    <PromptCredentialConfirm
        @close-modal="toggleModalEmail"
        :open="state.openModalPassword"
        @action="onUpdatePassword"
    />
</div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useAuth } from '@/services/useAuth';
import PromptCredentialConfirm from './modal/PromptCredentialConfirm.vue';
import { validateEmail } from '@/utils/helperFunction';
import MailIcon from '../svg/MailIcon.vue';

const authService = useAuth()

const state = reactive({
    newEmail: '',
    openModalPassword: false,
    onChange: false
})

const onUpdatePassword = async (password: string)=> {
    if(isValidEmail.value)
        authService.updateCurrentUserEmail(state.newEmail, password)
        .then(() => {
                  toggleModalEmail(false);
                  state.newEmail = '';
               });;
}

const toggleModalEmail = (flag: boolean)=>{
   state.openModalPassword = flag;
}

const toggleEdit = ()=>{
    state.onChange = !state.onChange;
    state.newEmail = '';
}

const isValidEmail = computed(()=> validateEmail(state.newEmail))
const isBlank = computed(()=> state.newEmail.trim().length == 0)

</script>