// @ts-ignore
import { ref } from 'vue';
import { defineStore } from 'pinia'
import axios, { AxiosResponse } from 'axios'
import useUserStore from '@/stores/user'

type Credential = { email: string, password: string, remember?: boolean }
type LoginResponse = { token?: string, error?: string }

export default defineStore('auth', () => {
    const isAuth = ref(false)
    const isLoading = ref(false)
    const error = ref()

    /**
     * Login function
     * @param data: Credential
     * @return Promise<AxiosResponse<LoginResponse>>
     */
    function login(data: Credential): Promise<AxiosResponse<LoginResponse>> {
        isLoading.value = true
        error.value = null

        return axios.post<LoginResponse>('/auth/login', { method: 'POST', data })
            .then(async (response: { data: LoginResponse }) => {
                axios.defaults.headers.common['Authorization'] = response.data.token
                data.remember
                    ? localStorage.setItem('jwt', response.data.token)
                    : sessionStorage.setItem('jwt', response.data.token)
                isAuth.value = true
                await useUserStore().me()
                return response
            })
            .catch(response => {
                error.value = response.response
                logout()
                return response
            })
            .finally(() => isLoading.value = false)
    }

    /**
     * Register function
     * @param data: { username: string, email: string, password: string }
     * @return Promise<AxiosResponse>
     * Todo: types
     */
    function register(data: { username: string, email: string, password: string }): Promise<AxiosResponse> {
        isLoading.value = true
        error.value = null

        return axios.post<LoginResponse>('/auth/register', { method: 'POST', data })
            .then((response: { data: any }) => response)
            .catch(response => {
                error.value = response.response
                logout()
                return response
            })
            .finally(() => isLoading.value = false)
    }

    /**
     * Refresh token function
     * @return Promise<AxiosResponse<LoginResponse>>
     */
    function refresh(): Promise<AxiosResponse<LoginResponse>> {
        isLoading.value = true
        error.value = null
        let remember = false

        if (localStorage.getItem('jwt')) {
            remember = true
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt')
        } else axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('jwt')

        return axios.get<LoginResponse>('/auth/refresh')
            .then(async (response: { data: LoginResponse }) => {
                axios.defaults.headers.common['Authorization'] = response.data.token
                remember
                    ? localStorage.setItem('jwt', response.data.token)
                    : sessionStorage.setItem('jwt', response.data.token)
                isAuth.value = true
                await useUserStore().me()
                return response
            })
            .catch(response => {
                logout()
                return response
            })
            .finally(() => isLoading.value = false)
    }

    /**
     * Logout function
     * @return void
     */
    function logout(): void {
        axios.defaults.headers.common['Authorization'] = null
        localStorage.removeItem('jwt')
        sessionStorage.removeItem('jwt')
        useUserStore().reset()
        isAuth.value = false
    }

    return {
        login,
        register,
        refresh,
        logout,
        isAuth,
        isLoading,
        error
    }
})
