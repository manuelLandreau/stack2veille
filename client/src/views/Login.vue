<template>
  <Layout>
    <h1 class="text-3xl font-bold leading-tight text-gray-900 dark:text-white">Login</h1>
    <LoginForm @loggedin="router.go(-1)" />
  </Layout>
</template>

<script setup>
import Layout from '@/views/Layout.vue'
import LoginForm from '@/components/LoginForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter();
</script>
