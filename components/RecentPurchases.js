// Data statis untuk simulasi pembelian terakhir
const purchases = [
  { id: 1, username: 'Naj***00', amount: '1.000 R$' },
  { id: 2, username: 'Mae***ns', amount: '500 R$' },
  { id: 3, username: 'Riz***12', amount: '2.500 R$' },
  { id: 4, username: 'Cit***ia', amount: '800 R$' },
  { id: 5, username: 'Far***an', amount: '1.200 R$' },
  { id: 6, username: 'Dew***99', amount: '3.000 R$' },
]

export default function RecentPurchases() {
  return (
    <div className="bg-gray-100 py-2 overflow-hidden border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex space-x-6 text-sm text-gray-700 whitespace-nowrap animate-scroll">
          {purchases.map((p) => (
            <span key={p.id}>
              {p.username} membeli {p.amount}
            </span>
          ))}
          <span className="text-blue-500 font-semibold cursor-pointer">Lihat Semua →</span>
        </div>
      </div>
    </div>
  )
}
