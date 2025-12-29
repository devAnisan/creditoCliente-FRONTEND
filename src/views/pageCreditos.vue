<template>
  <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
    <h1 class="text-2xl font-semibold">Créditos</h1>

    <button class="btn-main w-full md:w-auto flex justify-center">
      <SquarePlus /> <span class="font-bold">Nuevo crédito</span>
    </button>
  </header>

  <body class="text-sm md:text-lg">
    <!-- Mobile -->
    <div class="md:hidden">Aqui es en mobile</div>
    <!-- Desktop -->
    <div class="hidden md:block">Aqui en desktop</div>
  </body>
</template>

<script lang="ts" setup>
import { SquarePlus } from 'lucide-vue-next'
</script>
