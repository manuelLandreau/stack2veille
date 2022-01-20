// @ts-ignore
import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

type User = {
    username: string,
    email: string,
    password?: string,
    optin: boolean
}

export default defineStore('user', () => {

    const user = reactive({
        username: '',
        email: '',
        password: '',
        optin: false
    })
    const isLoading = ref(false)
    const error = ref(null)

    async function me() {
        isLoading.value = true

        try {
            const { data } = await axios.get<User>('/user/me', { method: 'GET' })
            user.username = data.username
            user.email = data.email
            user.optin = data.optin
            isLoading.value = false
        } catch (e) {
            error.value = e
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
        isLoading,
        error
    }
})
