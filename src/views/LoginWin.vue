<template>
  <section class="flex justify-center align-middle mt-20">
    <section
      class="flex justify-center flex-col gap-4 mt-10 bg-background p-10 rounded-lg shadow-lg"
    >
      <p class="text-2xl font-bold text-center text-white">CoinFlow</p>
      <input
        class="border p-2 rounded text-white"
        v-model="email"
        type="email"
        placeholder="Correo electrónico"
      />
      <input
        class="border p-2 rounded text-white"
        v-model="password"
        type="password"
        placeholder="Contraseña"
      />
      <button @click="login" class="bg-blue-500 text-white p-2 rounded">Iniciar Sesión</button>
      <p v-if="error" class="p-2 w-52 text-red-500 bg-red-200 text-center font-bold rounded">
        {{ error }}
      </p>
    </section>
  </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const email = ref('')
const password = ref('')
const error = ref('')

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import router from '../router/index'
const auth = getAuth()
const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = `Credenciales incorrectas. Inténtalo de nuevo. `
  }
}
</script>
