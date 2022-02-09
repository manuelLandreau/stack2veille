<template>
    <main style="animation: fadeIn ease 0.2s;">
        <router-view />
    </main>
    <notifications position="bottom right" />
</template>

<script setup>
import useAuthStore from '@/stores/auth'
import { toRefs } from 'vue';
const { refresh } = useAuthStore()
const { error } = toRefs(useAuthStore())
import { notify } from '@kyvg/vue3-notification'

async function init() {
    await refresh().catch(error => {
        notify({
            text: error.message,
            type: 'error',
            duration: 2000,
        })
    })
}
init()
</script>
