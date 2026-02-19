import {
  creditosVencidos,
  borrarCliente,
  clienteInfo,
  actualizarCliente,
  crearCliente,
  idUser,
} from '@/services/clienteservices'
import type { Cliente } from '@/views/PageClientes.vue'
export const countCreditos = async (data: string) => {
  return await creditosVencidos(data)
}

export const borrarCl = async (data: string) => {
  return borrarCliente(data)
}

export const clientePID = async (data: number) => {
  return clienteInfo(data)
}

export const actualizarcl = async (id: string | undefined, data: Cliente) => {
  return actualizarCliente(id, data)
}

export const crearCl = async (data: Cliente) => {
  return crearCliente(data)
}

export const idCliente = async (data: string) => {
  return idUser(data)
}
