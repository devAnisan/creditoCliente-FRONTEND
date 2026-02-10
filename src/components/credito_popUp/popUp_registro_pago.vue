<script lang="ts" setup>
import { registroPago } from '@/composable/pagos'
import { ref } from 'vue'
export interface pago_interface {
  pagoID: number
  creditID: number
  fechaPago: Date
  montoDePago: number
  metodoPago: string
}
const props = defineProps<{
  credito: number | undefined
}>()
const emit = defineEmits(['close', 'updateTable'])
const closePopUp = (value: boolean) => {
  emit('close', value)
}

export interface form_interface {
  creditID: number
  fechaPago: Date
  montoDePago: number
  metodoPago: string
}
const form = ref<form_interface>({
  creditID: props.credito!,
  fechaPago: new Date().toISOString().split('T')[0] as unknown as Date,
  montoDePago: 0,
  metodoPago: '',
})
const registrar_pago = async () => {
  try {
    const response = await registroPago(form.value)
    console.log(response)

    if (response.data.affectedRows > 0) {
      alert('Pago registrado exitosamente')
      closePopUp(false)
      emit('updateTable')
    } else {
      alert('Error al registrar el pago')
    }
  } catch (error) {
    console.error('Error al registrar el pago:', error)
  }
}
</script>
<template>
  <section class="box-popUpBackground">
    <section class="box-PopUp">
      <span class="text-lg font-bold text-center"
        >Crar un nuevo registro de pago al crédito número {{ props.credito }}</span
      >
      <form @submit.prevent="registrar_pago">
        <table class="**:p-1 **:border **:rounded-md border-collapse">
          <tr>
            <td class="">Fecha de pago:</td>
            <td>
              <input v-model="form.fechaPago" type="date" class="input-main" />
            </td>
          </tr>
          <tr>
            <td>Monto de pago:</td>
            <td><input v-model="form.montoDePago" type="number" class="input-main" /></td>
          </tr>
          <tr>
            <td>Método de pago:</td>
            <td>
              <select v-model="form.metodoPago" class="input-main">
                <option value="EFECTIVO">Efectivo</option>
                <option value="TARJETA">Tarjeta</option>
                <option value="TRANSFERENCIA">Transferencia</option>
                <option value="SINPE">Sinpe</option>
              </select>
            </td>
          </tr>
        </table>
        <section class="flex flex-row justify-center mt-2">
          <button type="button" class="btn-main" @click="closePopUp(false)">Cerrar</button
          ><button type="submit" class="btn-main">Registrar</button>
        </section>
      </form>
    </section>
  </section>
</template>
