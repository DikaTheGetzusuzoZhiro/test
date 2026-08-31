'use client'
import { useState } from 'react'

export default function CekTransaksi() {
  const [orderId, setOrderId] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCheck = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch(`/api/orders?id=${orderId}`)
      const data = await res.json()
      if (res.ok) {
        setStatus(data)
      } else {
        setStatus({ error: data.error || 'Transaksi tidak ditemukan' })
      }
    } catch {
      setStatus({ error: 'Gagal terhubung ke server' })
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Cek Status Transaksi</h1>
      <form onSubmit={handleCheck} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label className="block font-medium">ID Transaksi</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Masukkan ID transaksi"
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
        >
          {loading ? 'Memeriksa...' : 'Cek Sekarang'}
        </button>
        {status && (
          <div className={`mt-4 p-4 rounded ${status.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {status.error ? status.error : `Status: ${status.status} - ${status.detail || ''}`}
          </div>
        )}
      </form>
    </div>
  )
}
