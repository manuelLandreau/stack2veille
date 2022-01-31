<template>
    <main style="animation: fadeIn ease 0.2s;">
        <router-view />
    </main>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDark } from '@vueuse/core';
import useAuthStore from '@/stores/auth'
import useUserStore from '@/stores/user'
import axios from "axios";

const isDark = useDark()
isDark.value = localStorage.getItem('vueuse-color-scheme') === 'dark'

const { isAuth } = storeToRefs(useAuthStore())
const { me } = useUserStore()

if (!!localStorage.getItem('jwt')) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt')
    isAuth.value = !!localStorage.getItem('jwt')
    me()
}
</script>
