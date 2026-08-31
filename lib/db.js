// Simulasi penyimpanan order dalam array
let orders = []
let idCounter = 1

export const db = {
  createOrder: (data) => {
    const newOrder = {
      id: idCounter++,
      userId: data.userId,
      paket: data.paket,
      metode: data.metode,
      status: 'Menunggu Pembayaran',
      createdAt: new Date().toISOString(),
    }
    orders.push(newOrder)
    return newOrder
  },
  getOrder: (id) => {
    return orders.find(o => o.id === parseInt(id)) || null
  },
  getAllOrders: () => orders,
}
