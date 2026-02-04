import { consulta_creditos } from '@/services/servicioscredito'
export const call_get_creditos = async () => {
  return await consulta_creditos();
}
