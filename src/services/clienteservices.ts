// const URL = import.meta.env.API_ROUTE
export interface responseAPI {
  ok: boolean
  message: string
  data?: undefined
}
import type { Cliente } from '@/views/PageClientes.vue'

export const obtenerClientes = async () => {
  const res = await fetch(`http://localhost:3000/api/clientes/`)
  return await res.json()
}

export const creditosVencidos = async (data: number) => {
  const res = await fetch(`http://localhost:3000/api/clientes/cl/${data}`)
  return await res.json()
}

export const borrarCliente = async (data: number) => {
  const res = await fetch(`http://localhost:3000/api/clientes/${data}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}

export const clienteInfo = async (data: number) => {
  const res = await fetch(`http://localhost:3000/api/clientes/by-cedula/${data}`)
  return await res.json()
}

export const actualizarCliente = async (
  id: number | undefined,
  datos: Cliente,
): Promise<responseAPI> => {
  try {
    const res = await fetch(`http://localhost:3000/api/clientes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    })
    const response = await res.json()
    return {
      ok: res.ok,
      message: response.message ?? 'Server Response',
      data: response.data ?? null,
    }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

export const crearCliente = async(data: Cliente) => {
  try {

    const res = await fetch('http://localhost:3000/api/clientes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const response = await res.json()
    return{
      ok: res.ok,
      message: response.message ?? 'Server Response',
      response: response.data ?? null
    }
  } catch (error) {
    return{
      ok: false,
      message: error instanceof Error ? error.message : "Error desconocido"
    }
  }
}
