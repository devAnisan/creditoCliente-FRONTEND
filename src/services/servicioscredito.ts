export const consulta_creditos = async (id?: number) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}clientes/credito/general/${id ?? ''}`)
  return res.json()
}
