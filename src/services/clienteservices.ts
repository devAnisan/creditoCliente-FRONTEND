// const URL = import.meta.env.API_ROUTE
export interface responseAPI {
  ok: boolean
  message: string
  data?: undefined
}
import type { Cliente } from '@/views/PageClientes.vue'

export const obtenerClientes = async (uid:string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}clientes/cls/${uid}`)
  return await res.json()
}

export const creditosVencidos = async (data: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}clientes/cl/${data}`)
  return await res.json()
}

export const borrarCliente = async (data: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}clientes/${data}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}

export const clienteInfo = async (data: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}clientes/by-cedula/${data}`)
  return await res.json()
}

export const actualizarCliente = async (
  id: string | undefined,
  datos: Cliente,
): Promise<responseAPI> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}clientes/${id}`, {
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
      body: JSON.stringify({...data})
    })
    const response = await res.json()
    return{
      code: response.code,
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

export const idUser = async (data: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}clientes/id/${data}`)
    return await res.json()
  } catch (error) {
    return{
      ok: false,
      message: error instanceof Error ? error.message : "Error desconocido"
    }
  }
}
