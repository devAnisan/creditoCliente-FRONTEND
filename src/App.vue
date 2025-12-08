<script setup lang="ts">
import AppHeader from '../src/components/AppHeader.vue'
</script>
<template>
  <AppHeader />
  <section class="flex justify-center items-center">
    <section class="">
      <RouterView />
    </section>
  </section>
</template>
