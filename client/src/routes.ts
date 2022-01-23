import Home from './views/Home.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import Login from '@/views/Login.vue'

/** @type {[{path: string, component: {components: {Layout: *}}, meta: {title: string}},{path: string, component: {}, meta: {title: string}},{path: string, component: *}]} */
export const routes = [
    { path: '/', component: Home, meta: { title: 'Home' } },
    { path: '/login', component: Login, meta: { title: 'Login' } },
    {
        path: '/about',
        meta: { title: 'About' },
        component: About,
        // example of route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import('./views/About.vue')
    },
    { path: '/:path(.*)', component: NotFound },
]
