import {
  creditosVencidos,
  borrarCliente,
  clienteInfo,
  actualizarCliente,
  crearCliente,
} from '@/services/clienteservices'
import type { Cliente } from '@/views/PageClientes.vue'
export const countCreditos = async (data: number) => {
  return await creditosVencidos(data)
}

export const borrarCl = async (data: number) => {
  return borrarCliente(data)
}

export const clientePID = async (data: number) => {
  return clienteInfo(data)
}

export const actualizarcl = async (id: number | undefined, data: Cliente) => {
  return actualizarCliente(id, data)
}

export const crearCl = async (data: Cliente) => {
  return crearCliente(data)
}
