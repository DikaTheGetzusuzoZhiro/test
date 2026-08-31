export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} FLEXBLOX. Hak Cipta Dilindungi.</p>
        <p className="text-xs text-gray-400 mt-1">Roblox adalah merek dagang dari Roblox Corporation.</p>
      </div>
    </footer>
  )
}
