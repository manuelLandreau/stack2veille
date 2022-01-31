import { defineStore } from 'pinia'
import axios  from 'axios'
import useUserStore from '@/stores/user'

type Credential = { email: string, password: string, optin?: boolean }
type LoginResponse = { token?: string, error?: string }

export default defineStore('auth', () => {
    let isAuth = $ref(false)
    let isLoading = $ref(false)
    let error = $ref(null)

    async function login(credential: Credential) {
        isLoading = true
        error = null

        try {
            const { data } = await axios.post<LoginResponse>('/auth/login', { method: 'POST', data: credential })
            if (data.token) {
                axios.defaults.headers.common['Authorization'] = data.token
                localStorage.setItem('jwt', data.token)
                await useUserStore().me()
                isAuth = true
            } else if (data.error) error = data.error
        } catch (e) {
            error = e
        }
        isLoading = false
    }

    async function logout() {
        axios.defaults.headers.common['Authorization'] = null
        localStorage.removeItem('jwt')
        useUserStore().reset()
        isAuth = false
    }

    return {
        login,
        logout,
        isAuth: $$(isAuth),
        isLoading: $$(isLoading),
        error: $$(error)
    }
})
