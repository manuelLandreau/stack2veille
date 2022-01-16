<template>
  <div class="py-4">
    <div v-if="!isAuth">
      <div v-if="!isAuth" class="">
        <div class="grid grid-cols-1 gap-6">
          <label class="block">
            <span class="text-gray-700">Email</span>
            <input v-model="form.email" type="email" class="mt-1 block w-full" placeholder="Email"/>
          </label>
          <label class="block">
            <span class="text-gray-700">Password</span>
            <input v-model="form.password" type="password" class="mt-1 block w-full" placeholder="password"/>
          </label>
          <div class="block">
            <div class="mt-2">
              <div>
                <label class="inline-flex items-center">
                  <input v-model="form.optin" type="checkbox" checked/>
                  <span class="ml-2">Opt in</span>
                </label>
              </div>
            </div>
          </div>

          <button @click="submit" class="inline-flex items-center justify-center px-5 py-1 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none">Login <span v-if="isLoading">...</span></button>

          <div class="block" v-if="error">{{ error }}</div>
        </div>
      </div>
      <div v-if="error">{{ error }}</div>
    </div>
    <div v-else>All ready logged in !</div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {storeToRefs} from 'pinia';
import useAuthStore from '@/stores/auth'

const form = reactive({
  email: '',
  password: '',
  optin: false
})
const { login } = useAuthStore()
const { isLoading, isAuth, error} = storeToRefs(useAuthStore())

const emit = defineEmits(['loggedin'])

async function submit() {
  await login(form)
  emit('loggedin')
}
</script>
