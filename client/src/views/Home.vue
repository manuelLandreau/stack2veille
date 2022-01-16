<template>
  <Layout>
    <h1 class="text-3xl font-bold leading-tight text-gray-900 dark:text-white">Home</h1>
    <div class="my-8">
      <Switch
          v-model="isDark"
          :class="isDark ? 'bg-teal-800' : 'bg-teal-600'"
          class="relative inline-flex flex-shrink-0 h-[20px] w-[37px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span class="sr-only">Use dark theme</span>
        <span
            aria-hidden="true"
            :class="isDark ? 'translate-x-4' : 'translate-x-0'"
            class="pointer-events-none inline-block h-[16px] w-[16px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200"
        />
      </Switch>
    </div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </Layout>
</template>

<script setup>
import Layout from '@/views/Layout.vue';
import { Switch } from '@headlessui/vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()

</script>
