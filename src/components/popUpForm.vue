<template>
  <section class="box-popUpBackground">
    <section class="box-PopUp">
      <h1>{{ title }}</h1>
      <table></table>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps<{
  title: string
}>()
</script>
