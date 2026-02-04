export const consulta_creditos = async () => {
  const res = await fetch('http://localhost:3000/api/clientes/credito/general')
  return res.json()
}
