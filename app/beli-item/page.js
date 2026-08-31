const items = [
  { id: 1, name: 'Gamepass - 2x XP', price: 'Rp 50.000', game: 'Blox Fruits' },
  { id: 2, name: 'Legendary Sword', price: 'Rp 75.000', game: 'Blox Fruits' },
  { id: 3, name: 'Pet Dragon', price: 'Rp 120.000', game: 'Adopt Me' },
  { id: 4, name: 'Golden Crown', price: 'Rp 90.000', game: 'Royale High' },
]

export default function BeliItem() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Item Game Populer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4 text-center">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-500 text-sm">{item.game}</p>
            <p className="text-blue-600 font-bold mt-2">{item.price}</p>
            <button className="mt-3 bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-full text-sm">Pesan</button>
          </div>
        ))}
      </div>
    </div>
  )
}
