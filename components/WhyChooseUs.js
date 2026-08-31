const features = [
  { title: 'Proses Instan', desc: 'Robux langsung masuk ke akun kamu setelah pembayaran berhasil.' },
  { title: '100% Aman & Legal', desc: 'Transaksi dijamin aman, terenkripsi, dan menggunakan metode legal.' },
  { title: 'Harga Terbaik', desc: 'Kami menawarkan harga paling kompetitif untuk semua nominal.' },
  { title: 'Bantuan 24/7', desc: 'Customer service kami siap membantu kamu kapan saja jika ada kendala.' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Kenapa Harus FLEXBLOX?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div key={item.title} className="p-6 text-center border rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
