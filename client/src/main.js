import { createApp } from 'vue'
import './assets/tailwind.css'
import App from './App.vue'
import { routes } from './routes.js'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

const app = createApp(App)

const router = createRouter({
	history: createWebHistory(),
	routes,
})

app
	.use(router)
	.use(createPinia())
	.mount('#app')
