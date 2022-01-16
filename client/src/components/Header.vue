<template>
  <header class="bg-gray-100 dark:bg-gray-900 shadow py-4">
    <div class="container mx-auto">
      <div class="flex justify-between">
        <router-link to="/" class="text-3xl font-bold leading-tight text-teal-700">
          Starter
        </router-link>
        <router-link
            to="/login"
            class="inline-flex items-center justify-center px-5 py-1 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-teal-600 border border-transparent rounded-md hover:bg-teal-800 focus:outline-none"
        >Login</router-link>
      </div>
    </div>
  </header>
</template>
