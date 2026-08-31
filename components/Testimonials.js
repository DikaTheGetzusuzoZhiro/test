const testimonials = [
  { id: 1, name: 'Andi', text: 'Top up Robux cepat banget, langsung masuk. Rekomendasi!', rating: 5 },
  { id: 2, name: 'Siti', text: 'Harga murah dan proses mudah. Akan beli lagi.', rating: 5 },
  { id: 3, name: 'Budi', text: 'CS responsif banget, bantuin saya yang bingung. Mantap!', rating: 4 },
]

export default function Testimonials() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Apa Kata Customer Kami?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <div className="flex text-yellow-400 mb-2">
                {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
              </div>
              <p className="text-gray-700 italic">"{t.text}"</p>
              <p className="font-semibold mt-2">- {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
