import { consulta_creditos } from '@/services/servicioscredito'
export const call_get_creditos = async (id?: number) => {
  return await consulta_creditos(id);
}
