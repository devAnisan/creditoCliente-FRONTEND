<template>
  <header class="p-4 bg-background text-2xl font-sans text-primarytext">
    <ul class="flex flex-row flex-wrap items-center">
      <router-link to="/" class="mr-4">Página principal</router-link>
      <li class="mr-4">LOGO</li>
      <li class="mr-4">Pagos</li>
      <router-link to="/creditos" class="mr-4"> Creditos </router-link>
      <router-link to="/clientes" class="mr-4">Clientes</router-link>
      <li class="flex ml-auto">
        <Bell class="m-1" />
      </li>
    </ul>
  </header>
</template>

<script lang="ts" setup>
import { Bell } from 'lucide-vue-next'
</script>
