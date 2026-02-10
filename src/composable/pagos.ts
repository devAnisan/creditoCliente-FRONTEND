import { registrarPago } from '@/services/pagoservices'
import type { form_interface } from '@/components/credito_popUp/popUp_registro_pago.vue'
export const registroPago = async (form: form_interface) => {
  return await registrarPago(form.creditID, form.fechaPago, form.montoDePago, form.metodoPago)
}
