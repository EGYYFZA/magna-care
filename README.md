# Magna Care

A skincare storefront interface developed as a capstone project for the Magna Global Internship at SGN.

Prototipe toko skincare dengan Home satu viewport berupa galeri kartu melingkar 3D yang mengikuti komposisi dan interaksi AVEA. Logo Magna Care dibuat sebagai wordmark geometris SVG. Navbar tetap terlihat pada desktop dan ponsel.

## Menjalankan

```sh
npm ci
npm run dev
```

Pada PowerShell yang membatasi skrip, gunakan `npm.cmd` sebagai pengganti `npm`.

```sh
npm run build
npm run lint
```

Stack: React, React Router, Vite, Tailwind, Lucide, dan Three.js. Galeri memakai `CSS3DRenderer` sehingga kartu tetap berupa tombol/gambar DOM dan tidak membutuhkan WebGL.

## Fitur saat ini

- Home satu viewport: drag/swipe, scroll, panah keyboard, tombol sebelumnya/berikutnya, momentum, snap, dan tilt ringan.
- Detail produk berupa dialog dan tambah ke bag langsung dari Home. Menu Produk menampilkan daftar di Home yang sama.
- Katalog lama dengan pencarian/kategori/urutan harga, halaman detail tersendiri, keranjang, dan bantuan tetap tersedia.
- Keranjang lokal: tambah, ubah jumlah, hapus, subtotal, dan notifikasi. Item lama yang valid tetap terbaca melalui kunci `magna-care-cart`; harga dan metadata diambil dari katalog saat ini.
- Navigasi desktop/ponsel, fokus keyboard, skip link, reduced motion, pengganti foto gagal, dan pemulihan hasil kosong.
- Ada tiga produk unik; panel visualnya diulang untuk menutup lingkaran. Panel duplikat tidak ditambahkan ke urutan keyboard/screen reader dan tidak membuat produk baru di keranjang.

## Batas prototipe

Ketiga produk, gambar, dan harganya merupakan contoh desain. Belum ada stok server, pembayaran, ongkir, pengiriman, akun, penerima formulir kontak, atau booking konsultasi. Menambahkan produk ke keranjang tidak membuat pesanan. Konfirmasi transaksi hanya boleh ditambahkan setelah backend benar-benar menyelesaikan prosesnya.

Gunakan data contoh; jangan memasukkan data pelanggan atau pembayaran yang nyata. Lihat [SECURITY.md](SECURITY.md).

Data disimpan pada browser/perangkat yang sama. Jika penyimpanan diblokir, keranjang tetap bekerja selama sesi dan menampilkan pemberitahuan. Data ini tidak boleh menjadi sumber harga final untuk transaksi produksi.

Foto editorial baru dan font disimpan lokal. Asal dan hak komersial gambar produk lama belum diverifikasi; gunakan foto resmi pemasok sebelum peluncuran. Lihat [kredit dan lisensi aset](public/ASSET-LICENSES.md).

## Riset dan verifikasi

- [Analisis referensi, arah galeri, dan kriteria perilaku](docs/design/gallery-direction.md).
- [Riset awal dan roadmap fitur — konsep editorial awal telah diganti](docs/design/research-and-direction.md).
- [Hasil pengecekan browser](docs/design/browser-checks.json).
- [Bukti render dan pemeriksaan desain](docs/design/evidence.json).

Pengecekan interaksi memakai Node.js 24 dan Chrome DevTools Protocol tanpa dependensi tambahan:

```sh
node scripts/check-storefront.mjs
```

Jalankan Vite pada `127.0.0.1:5173` dan Chrome dengan **profil uji terpisah** serta remote debugging pada port `9223` terlebih dahulu. Jangan gunakan profil browser pribadi untuk tes. Contoh PowerShell dari direktori proyek:

```powershell
$qaProfile = Join-Path (Get-Location) '.preview\chrome'
Start-Process -WindowStyle Hidden -FilePath 'C:\Program Files\Google\Chrome\Application\chrome.exe' -ArgumentList @('--headless=new', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=9223', ('--user-data-dir="' + $qaProfile + '"'), 'about:blank')
```

Tes memeriksa geometri 3D, drag, wheel, keyboard, snap, idle, dialog/Escape, reduced motion, menu ponsel, daftar dalam Home, alur katalog/keranjang, data simpanan tidak valid, penyimpanan ditolak, dan gambar gagal. Render dicek pada 1440×900, 390×844, serta overflow pada 320 px. Screenshot dan hasilnya disimpan di `docs/design/`; profil browser sementara diabaikan Git, Vite, dan ESLint.
