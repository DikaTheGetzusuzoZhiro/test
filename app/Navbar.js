'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-bold">FLEXBLOX</Link>

        {/* Menu Desktop */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li><Link href="/beli-robux">Beli Robux</Link></li>
          <li><Link href="/beli-item">Item Game</Link></li>
          <li><Link href="/cek-transaksi">Cek Transaksi</Link></li>
          <li><Link href="/bantuan">Bantuan</Link></li>
        </ul>

        {/* Tombol Hamburger Mobile */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-2">
          <ul className="space-y-2 font-medium">
            <li><Link href="/beli-robux" onClick={() => setIsOpen(false)}>Beli Robux</Link></li>
            <li><Link href="/beli-item" onClick={() => setIsOpen(false)}>Item Game</Link></li>
            <li><Link href="/cek-transaksi" onClick={() => setIsOpen(false)}>Cek Transaksi</Link></li>
            <li><Link href="/bantuan" onClick={() => setIsOpen(false)}>Bantuan</Link></li>
          </ul>
        </div>
      )}
    </nav>
  )
}
