import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

// GET: Ambil order berdasarkan ID (query param ?id=...)
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID transaksi wajib diisi' }, { status: 400 })
  }

  const order = db.getOrder(id)
  if (!order) {
    return NextResponse.json({ error: 'Transaksi tidak ditemukan' }, { status: 404 })
  }

  return NextResponse.json(order)
}

// POST: Buat order baru
export async function POST(request) {
  try {
    const body = await request.json()
    const { userId, paket, metode } = body

    if (!userId || !paket || !metode) {
      return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 })
    }

    const newOrder = db.createOrder({ userId, paket, metode })
    return NextResponse.json({ 
      message: 'Order berhasil dibuat', 
      orderId: newOrder.id,
      status: newOrder.status 
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
