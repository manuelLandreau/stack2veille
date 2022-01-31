<template>
    <div class="bg-white dark:bg-black">
        <Header />
        <div class="container mx-auto py-8 dark:text-white"
             style="min-height: calc(100vh - 170px);animation: fadeIn ease 0.5s;">
            <slot />
        </div>
        <Footer />
    </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>
