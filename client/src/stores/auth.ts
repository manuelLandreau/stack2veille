// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import useUserStore from '@/stores/user'

type Credential = {
    email: string,
    password: string,
    optin: boolean
}

type LoginResponse = {
    token: string,
    error?: string
}

export default defineStore('auth', () => {

    const isAuth = ref(false)
    const isLoading = ref(false)
    const error = ref(null)

    const setAuth = computed((value: boolean) => isAuth.value = value)

    async function login(credential: Credential) {
        isLoading.value = true
        error.value = null

        try {
            const { data } = await axios.post<LoginResponse>('/auth/login', { method: 'POST', data: credential })
            if (data.token) {
                axios.defaults.headers.common['Authorization'] = data.token
                localStorage.setItem('jwt', data.token)
                await useUserStore().me()
                isAuth.value = true
            } else if (data.error) error.value = data.error
        } catch (e) {
            error.value = e
        }
        isLoading.value = false
    }

    async function logout() {
        axios.defaults.headers.common['Authorization'] = null
        localStorage.removeItem('jwt')
        useUserStore().reset()
        isAuth.value = false
    }

    return {
        login,
        logout,
        isAuth,
        setAuth,
        isLoading,
        error
    }
})
