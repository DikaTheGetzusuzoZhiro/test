# TAMA Top Up — Frontend + Ulasan + Admin Panel

Versi ini menambahkan:
- Tampilan marketplace top up yang lebih lengkap.
- User dapat mengirim ulasan dari halaman utama.
- Ulasan user masuk status **menunggu persetujuan** dan tidak langsung tampil.
- Admin panel untuk menyetujui/sembunyikan/hapus ulasan.
- Admin dapat menambah/menghapus/mengubah harga produk secara lokal.
- Admin dapat mengubah announcement dan nomor WhatsApp.
- Checkout modal frontend.

## Admin demo
Password default: `TAMA2026`

## Catatan penting
Ini masih frontend/static. Data admin dan ulasan disimpan di `localStorage`, sehingga cocok untuk demo/pengembangan. Untuk produksi, gunakan backend (mis. Supabase/Firebase/Node API) agar login admin, ulasan, produk, dan transaksi aman serta tersimpan untuk semua user.
