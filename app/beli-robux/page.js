'use client'
import { useState } from 'react'

export default function BeliRobux() {
  const [userId, setUserId] = useState('')
  const [paket, setPaket] = useState('100 R$')
  const [metode, setMetode] = useState('Bank Transfer')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // Simulasi panggil API
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, paket, metode }),
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(`✅ Pesanan berhasil! ID Transaksi: ${data.orderId}`)
      } else {
        setMessage(`❌ Gagal: ${data.error}`)
      }
    } catch (err) {
      setMessage('❌ Terjadi kesalahan jaringan.')
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-6">Beli Robux</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label className="block font-medium">User ID Roblox</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Contoh: 123456789"
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Pilih Paket</label>
          <select value={paket} onChange={(e) => setPaket(e.target.value)} className="w-full border rounded px-3 py-2 mt-1">
            <option>100 R$ - Rp 25.000</option>
            <option>500 R$ - Rp 85.000</option>
            <option>1.000 R$ - Rp 165.000</option>
            <option>2.500 R$ - Rp 395.000</option>
            <option>5.000 R$ - Rp 750.000</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Metode Pembayaran</label>
          <select value={metode} onChange={(e) => setMetode(e.target.value)} className="w-full border rounded px-3 py-2 mt-1">
            <option>Bank Transfer (BNI/BCA/Mandiri)</option>
            <option>E-Wallet (OVO/GoPay/DANA)</option>
            <option>QRIS</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
        >
          {loading ? 'Memproses...' : 'Bayar Sekarang'}
        </button>
        {message && <p className="text-center mt-4 font-medium">{message}</p>}
      </form>
    </div>
  )
}
