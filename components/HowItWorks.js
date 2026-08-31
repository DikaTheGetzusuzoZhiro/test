const steps = [
  { step: '1', title: 'Pilih Paket', desc: 'Pilih nominal Robux atau item yang kamu inginkan.' },
  { step: '2', title: 'Masukkan Data', desc: 'Masukkan User ID & pilih metode pembayaran.' },
  { step: '3', title: 'Selesaikan Pembayaran', desc: 'Bayar melalui metode pilihan, Robux langsung masuk!' },
]

export default function HowItWorks() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Hanya 3 Langkah Mudah!</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {steps.map((item) => (
            <div key={item.step} className="flex-1 text-center max-w-xs">
              <div className="w-16 h-16 bg-blue-500 text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
