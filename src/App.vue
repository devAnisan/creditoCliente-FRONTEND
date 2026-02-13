<script setup lang="ts">
import AppHeader from '../src/components/AppHeader.vue'
import { auth } from '@/services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, onMounted } from 'vue'
import LoginWin from '@/views/LoginWin.vue'
const user = ref()
const loading = ref(true)

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    loading.value = false
  })
})
</script>
<template>
  <section v-if="loading" class="fixed inset-0 bg-gray-900 z-50 flex justify-center items-center">
    <p class="text-white text-lg">Loading...</p>
  </section>
  <section v-else>
    <template v-if="user">
      <AppHeader />
      <section class="flex justify-center items-center">
        <section class="">
          <RouterView />
        </section>
      </section>
    </template>
    <template v-else> <LoginWin /> </template>
  </section>
</template>
