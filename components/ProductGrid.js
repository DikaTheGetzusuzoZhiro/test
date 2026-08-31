const robuxPackages = [
  { id: 1, amount: '100 R$', price: 'Rp 25.000', popular: false },
  { id: 2, amount: '500 R$', price: 'Rp 85.000', popular: false },
  { id: 3, amount: '1.000 R$', price: 'Rp 165.000', popular: true },
  { id: 4, amount: '2.500 R$', price: 'Rp 395.000', popular: false },
  { id: 5, amount: '5.000 R$', price: 'Rp 750.000', popular: false },
]

export default function ProductGrid() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Pilih Paket Robux</h2>
        <p className="text-center text-gray-600 mb-8">Dapatkan harga terbaik untuk setiap nominal!</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {robuxPackages.map((pkg) => (
            <div key={pkg.id} className={`bg-white rounded-lg shadow p-4 text-center border-2 ${pkg.popular ? 'border-blue-500' : 'border-transparent'} hover:shadow-lg transition`}>
              {pkg.popular && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">POPULER</span>}
              <h3 className="text-xl font-bold mt-2">{pkg.amount}</h3>
              <p className="text-gray-700 font-semibold">{pkg.price}</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-full text-sm">Beli Sekarang</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
