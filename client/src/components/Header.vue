<template>
  <div>
    <header class="bg-gray-100 dark:bg-gray-900 shadow py-4">
      <div class="container mx-auto">
        <div class="flex justify-between">
          <router-link to="/" class="text-3xl font-bold leading-tight text-teal-700">
            Starter
          </router-link>
          <button
              @click="setIsOpen(true)"
              class="inline-flex items-center justify-center px-5 py-1 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-teal-600 border border-transparent rounded-md hover:bg-teal-800 focus:outline-none"
          >Login</button>
        </div>
      </div>
    </header>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="setIsOpen">
        <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="min-h-screen px-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay class="fixed inset-0" />
            </TransitionChild>

            <span class="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
            >
              <div
                  class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-900 shadow-xl"
              >
                <div  class="px-12 py-6">
                  <DialogTitle
                      as="h2"
                      class="text-2xl font-bold leading-tight text-gray-900 dark:text-white"
                  >
                    Login
                  </DialogTitle>
                  <LoginForm @loggedin="() => setIsOpen()" />
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle
} from '@headlessui/vue';
import LoginForm from '@/components/LoginForm.vue'

const isOpen = ref(false)

function setIsOpen(value = false) {
  isOpen.value = value;
}
</script>
