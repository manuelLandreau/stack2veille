import { createApp } from 'vue'
import './assets/tailwind.css'
import App from './App.vue'
import { routes } from './routes'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import axios from 'axios'
import Notifications from '@kyvg/vue3-notification'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.defaults.baseURL = 'http://localhost:3001'

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes,
})

app
    .use(router)
    .use(createPinia())
    .use(Notifications)
    .mount('#app')
