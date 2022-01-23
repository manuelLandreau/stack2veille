<template>
    <div class="py-4">
        <div v-if="!isAuth">
            <div v-if="!isAuth" class="">
                <div class="grid grid-cols-1 gap-6">
                    <label class="block">
                        <span class="text-gray-700 dark:text-gray-200">Email</span>
                        <input v-model="form.email" type="email" class="mt-1 block w-full" placeholder="Email" />
                    </label>
                    <label class="block">
                        <span class="text-gray-700 dark:text-gray-200">Password</span>
                        <input v-model="form.password" type="password" class="mt-1 block w-full"
                               placeholder="password" />
                    </label>
                    <div class="block">
                        <div class="mt-2">
                            <SwitchGroup>
                                <Switch
                                    v-model="form.optin"
                                    :class="form.optin ? 'bg-teal-800' : 'bg-teal-600'"
                                    class="relative inline-flex flex-shrink-0 h-[20px] w-[37px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                >
                                    <span class="sr-only">Opt in</span>
                                    <span
                                        aria-hidden="true"
                                        :class="form.optin ? 'translate-x-4' : 'translate-x-0'"
                                        class="pointer-events-none inline-block h-[16px] w-[16px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200"
                                    />
                                </Switch>
                                <SwitchLabel class="dark:text-gray-200"> Opt in</SwitchLabel>
                            </SwitchGroup>
                        </div>
                    </div>

                    <button @click="submit" class="button">Submit<span v-if="isLoading">...</span></button>

                    <div class="block dark:text-white" v-if="error">{{ error }}</div>
                </div>
            </div>
        </div>
        <div v-else>All ready logged in !</div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia';
import useAuthStore from '@/stores/auth'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

const form = reactive({
    email: '',
    password: '',
    optin: false
})
const { login } = useAuthStore()
const { isLoading, isAuth, error } = storeToRefs(useAuthStore())

const emit = defineEmits(['loggedin'])

async function submit() {
    await login(form)
    if (!error.value) emit('loggedin')
}
</script>
