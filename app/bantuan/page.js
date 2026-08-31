export default function Bantuan() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold text-center mb-6">Pusat Bantuan</h1>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold">📞 Kontak Kami</h2>
          <p className="text-gray-600">Email: support@flexblox.id</p>
          <p className="text-gray-600">WhatsApp: +62 812-3456-7890</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">❓ Pertanyaan Umum</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Berapa lama proses top up? - Instan, maksimal 5 menit.</li>
            <li>Apakah aman? - Ya, kami menggunakan sistem terenkripsi.</li>
            <li>Bagaimana jika robux tidak masuk? - Hubungi CS kami 24/7.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
