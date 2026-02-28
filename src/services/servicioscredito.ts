export const consulta_creditos = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}clientes/credito/general`)
  return res.json()
}
