// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import useUserStore from '@/stores/user'

type Credential = {
    email: string,
    password: string,
    optin: boolean
}

type LoginResponse = {
    token: string
}

export default defineStore('auth', () => {

	const isAuth = ref(false)
	const isLoading = ref(false)
	const error = ref(null)

	async function login(credential: Credential) {
		isLoading.value = true

		try {
			const { data } = await axios.post<LoginResponse>('/auth/login', { method: 'POST', data: credential })
			axios.defaults.headers.common['Authorization'] = data.token
			useUserStore().me()
			isAuth.value = true
			isLoading.value = false
		} catch(e) {
			error.value = e
		}
	}

	async function logout() {
		axios.defaults.headers.common['Authorization'] = null
		useUserStore().reset()
		isAuth.value = false
	}

	return {
		login,
		logout,
		isAuth,
		isLoading,
		error
	}
})
