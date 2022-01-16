<template>
  <div class="bg-white dark:bg-black">
    <Header />
    <div class="container mx-auto py-8 dark:text-white" style="min-height: calc(100vh - 170px)">
       <slot />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
export default {
  components: { Header, Footer }
}
</script>
