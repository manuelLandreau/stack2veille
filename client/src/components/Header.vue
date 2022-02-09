<template>
<header class="bg-gray-100 dark:bg-gray-900 shadow py-4">
    <div class="container mx-auto">
        <div class="flex justify-between">
            <router-link to="/" class="text-3xl font-bold leading-tight text-teal-700">
                Starter
            </router-link>
            <div class="flex items-center">
                <DarkModeSwitch />
                <button v-if="!isAuth" @click="toggleModal(true)" class="button">Sign in</button>
                <Menu as="div" v-else class="relative inline-block text-left">
                    <div>
                        <MenuButton
                            class="inline-flex justify-center w-full px-4 py-2 rounded-md text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 hover:dark:text-gray-900 focus:outline-none"
                        >
                            {{ user.username }}
                        </MenuButton>
                    </div>
                    <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                    >
                        <MenuItems
                            class="absolute right-0 w-56 mt-2 origin-top-right rounded-md bg-white divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                            <div class="">
                                <MenuItem v-slot="{ active }">
                                    <button
                                        :class="[
                                            active ? 'bg-teal-600 text-white' : 'text-gray-900',
                                            'group flex items-center w-full px-2 py-2 rounded-t-md text-sm',
                                        ]"
                                    >
                                        <UserCircleIcon :class="[
                                            active ? 'text-white' : 'text-teal-600',
                                            'h-5 w-5 mr-2'
                                        ]"  /> Profile
                                    </button>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <button
                                        @click="logout"
                                        :class="[
                                            active ? 'bg-teal-600 text-white' : 'text-gray-900',
                                            'group flex items-center w-full px-2 py-2 rounded-b-md text-sm',
                                        ]"
                                    >
                                        <LogoutIcon :class="[
                                            active ? 'text-white' : 'text-teal-600',
                                            'h-5 w-5 mr-2'
                                        ]" /> Logout
                                    </button>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </transition>
                </Menu>
            </div>
        </div>
    </div>
</header>
<Modal v-if="!isAuth" title="Login" :isOpen="isOpen" @toggleModal="toggleModal">
    <LoginForm @loggedin="toggleModal" />
</Modal>
</template>

<script setup lang="ts">
import  { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import Modal from '@/components/Modal.vue'
import { LogoutIcon } from '@heroicons/vue/solid'
import { UserCircleIcon } from '@heroicons/vue/solid'
import LoginForm from '@/components/LoginForm.vue'
import { storeToRefs } from 'pinia';
import useAuthStore from '@/stores/auth';
import useUserStore from '@/stores/user';
import { ref } from 'vue';
import DarkModeSwitch from '@/components/DarkModeSwitch.vue'

const { logout } = useAuthStore()
const { isAuth } = storeToRefs(useAuthStore())
const { user } = storeToRefs(useUserStore())

const isOpen = ref(false)

function toggleModal(value: boolean = false) {
    isOpen.value = value;
}
</script>
