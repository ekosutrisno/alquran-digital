<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10 font-quicksand" @close="closeModal">
      <div class="fixed inset-0 bg-gray-900/75 backdrop-blur" />
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex w-full items-start justify-center min-h-full p-4 sm:p-0">
            <DialogPanel class="relative w-full rounded-2xl overflow-hidden transform transition-all sm:my-8 sm:max-w-screen-md sm:w-full">
              <div class="bg-white flex flex-col mx-auto max-w-xl rounded-2xl justify-between dark:bg-slate-800 border-2 border-transparent dark:border-slate-700/75">
                  <div class="ss px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full border dark:border-slate-500 bg-white dark:bg-slate-700 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationIcon class="h-6 w-6 text-sky-500" aria-hidden="true" />
                      </div>
                      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <DialogTitle as="h3" class="text-lg leading-6 font-medium text-slate-800 dark:text-slate-50">
                          Update password
                        </DialogTitle>
                        <div class="mt-2">
                          <p class="text-sm text-slate-700 dark:text-slate-300">
                            Are you sure you want to update your password? Beacuse this password replace your login password and will be the default password. Type your password bellow to confirm.
                          </p>
                        </div>
                        <form id="passwordConfirm" class="mt-4">
                          <input v-model="state.passwordConfirm" type="password" placeholder="Type your password" class="py-2 px-4 rounded-md border-gray-300 dark:bg-slate-800 dark:border-slate-500/75 dark:text-white w-full focus:outline-none focus:ring-sky-500">
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button type="submit" form="passwordConfirm" :disabled="!checkPassword" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 disabled:bg-opacity-25 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm" @click="mainAction">
                      Delete
                    </button>
                    <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="closeModal" ref="cancelButtonRef">
                      Cancel
                    </button>
                  </div>
              </div>
            </DialogPanel>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import { computed, reactive} from 'vue'
import { Dialog, DialogPanel, TransitionRoot, DialogTitle } from '@headlessui/vue'
import { ExclamationIcon } from '@heroicons/vue/outline'

defineProps<{ open: boolean }>()
const emit = defineEmits<{(e: 'close-modal', open: boolean): void, (e: 'action', passwordConfirm: string): void}>();

const state = reactive({
    passwordConfirm: ''
});

const closeModal = ()=> {
    emit('close-modal', false);
    state.passwordConfirm = '';
}

const mainAction = ()=> {
    emit('action', state.passwordConfirm);
    state.passwordConfirm = '';
}

const checkPassword = computed(()=> state.passwordConfirm.trim().length >= 6)

</script>