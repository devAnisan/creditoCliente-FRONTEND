export const registrarPago = async (creditID: number, fechaPago: Date, montoDePago: number, metodoPago: string) => {
  const res = await fetch('http://localhost:3000/api/clientes/pago', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      creditID,
      fechaPago,
      montoDePago,
      metodoPago,
    }),
  });
  return res.json();
}
