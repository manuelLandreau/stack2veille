import { reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

type User = { username: string, email: string, password?: string, optin?: boolean }

export default defineStore('user', () => {

    const user = reactive({
        username: '',
        email: '',
        password: '',
        optin: false
    })
    let isLoading = $ref(false)
    let error = $ref(null)

    async function me() {
        isLoading = true

        try {
            const { data } = await axios.get<User>('/user/me', { method: 'GET' })
            user.username = data.username
            user.email = data.email
            user.optin = data.optin
            isLoading = false
        } catch (e) {
            error = e
        }
    }

    async function reset() {
        user.username = ''
        user.email = ''
        user.optin = false
    }

    return {
        me,
        reset,
        user,
        isLoading: $$(isLoading),
        error: $$(error)
    }
})
