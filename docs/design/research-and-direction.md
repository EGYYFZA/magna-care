# Magna Care — riset, konsep, dan rencana fitur

> Konsep halaman editorial dalam dokumen ini telah diganti sesuai koreksi pengguna. Arah yang berlaku sekarang: [galeri produk melingkar 3D](gallery-direction.md). Roadmap transaksi dan batas data produk tetap relevan.

Riset 24 Oktober 2026 · Implementasi dan verifikasi 25 Oktober 2026 · Arah: **Everyday Care, Curated**

## Keputusan desain

Magna Care menjadi toko perawatan harian untuk skincare dan, berikutnya, alat kesehatan rumahan. Arahnya editorial, tenang, dan tegas: tipografi grotesk, ruang kosong, garis tipis, foto besar, serta koleksi bernomor. Kebutuhan belanja tetap terlihat: jenis produk, harga rupiah, detail produk, dan keranjang.

Inspirasi utamanya [AVEA](https://avea.studio/). Dari inspeksi situs, AVEA memakai Archivo, navigasi ringkas, metadata huruf kapital, serta pilihan showcase/list/slider untuk memusatkan perhatian pada karya. **Interpretasi untuk Magna Care:** perlakukan produk sebagai koleksi terkurasi. Gunakan grid yang bisa dipindai; mode 3D dan navigasi eksperimental tidak diperlukan untuk membeli tiga produk. Logo, foto proyek, dan kode AVEA tidak disalin.

Ini hipotesis desain, bukan hasil pengujian konsumen Magna Care. Belum ada data konversi, persona terverifikasi, daftar stok riil, atau kebijakan operasional toko. Tingkat keyakinan tinggi untuk pola antarmuka yang diamati dan lisensi aset; sedang untuk kecocokan positioning; belum teruji untuk dampak penjualan.

## Empat pertanyaan riset

1. Elemen AVEA apa yang dapat diterjemahkan menjadi pengalaman belanja yang mudah?
2. Bagaimana membantu pembeli menemukan skincare dan menilai alat kesehatan?
3. Konten dan fitur apa yang layak dikerjakan sekarang dibanding tahap transaksi nyata?
4. Aset apa yang dapat dipakai ulang dengan sumber dan lisensi yang jelas?

## Temuan dan implikasi

| Bukti | Implikasi untuk Magna Care |
| --- | --- |
| AVEA menonjolkan karya melalui showcase dan navigasi tipis. [Sumber](https://avea.studio/) | Foto mendapat ruang besar; metadata produk ringkas; pembelian tidak bergantung pada hover atau drag. |
| The Ordinary mengelompokkan panduan berdasarkan kebutuhan kulit. [Sumber](https://theordinary.com/en-gb/skincare-regimen-for-beginners.html) | Rancang jalur “berdasarkan kebutuhan” setelah atribut katalog diverifikasi. Pada tahap awal, filter berdasarkan jenis produk yang sudah diketahui. |
| Aesop menyediakan penjelasan tentang produk, bahan, jenis kulit, dan masa penggunaan setelah dibuka. [Sumber](https://www.aesop.com.sg/pages/product-and-advice) | Detail produk kelak memuat isi, bahan lengkap, cara pakai, dan informasi masa penggunaan dari label produsen. Jangan mengarang komposisi atau manfaat. |
| Penelitian Baymard membahas peran filter, urutan, dan informasi kartu dalam pemilihan produk. [Sumber](https://baymard.com/research/ecommerce-product-lists) | Sediakan pencarian, filter terlihat, jumlah hasil, urutan harga, dan reset ketika hasil kosong. Parameter tersimpan di URL. |
| Baymard menyarankan guest checkout yang mudah ditemukan. [Sumber](https://baymard.com/research-articles/make-guest-checkout-prominent) | Pada tahap transaksi, pembeli boleh memesan tanpa membuat akun. Akun tidak menjadi penghalang pada katalog atau keranjang. |
| Halaman produk OMRON menampilkan model dan tipe manset; akses halaman penuh dibatasi 403, informasi hanya teramati dari hasil pencarian. [Sumber](https://www.omron-healthcare.com/products/m3-comfort) | Model, ukuran/kompatibilitas, kelengkapan, manual, dan garansi perlu menjadi atribut alat kesehatan. Spesifikasi nyata harus berasal dari pemasok, bukan contoh kompetitor. |
| BPOM menyediakan pencarian produk kosmetika. [Sumber](https://cekbpom.pom.go.id/produk-kosmetika/) | Siapkan kolom nomor notifikasi beserta tautan verifikasi ketika data produk tersedia. Jangan menampilkan lencana “terdaftar” tanpa verifikasi. |
| FAQ Kemenkes mengarahkan pemeriksaan izin alat kesehatan ke Info Alkes. [Sumber](https://farmalkes.kemkes.go.id/faq/) | Informasi izin edar alat kesehatan memiliki sumber tersendiri. Tautan verifikasi bukan klaim bahwa produk contoh sudah disetujui. |

Rekomendasi di kolom kanan merupakan sintesis untuk proyek ini. Temuan Baymard dan contoh merek internasional tidak membuktikan besaran peningkatan konversi bagi pasar Indonesia; tidak ada proyeksi angka penjualan dalam rancangan ini.

## Kondisi kode saat riset

- React 19, React Router, Vite, Tailwind, dan Lucide sudah tersedia. Tidak perlu mengganti framework atau menambah pustaka animasi.
- Empat rute: beranda, katalog, keranjang, kontak. Tiga produk skincare dengan ID 1–3 dan harga rupiah.
- Keranjang memakai `magna-care-cart` di localStorage. Desain baru perlu mempertahankan ID, harga, jumlah, dan data keranjang lama yang valid.
- Tombol checkout mengarah ke kontak; belum ada pemrosesan transaksi, ongkir, inventori, atau pesanan di server.
- Kalender konsultasi hanya mengarah ke kontak. Formulir kontak menampilkan sukses tanpa mengirim data ke server. Ini perlu diganti dengan perilaku yang jujur pada tahap frontend.
- Nama produk saat ini bersifat umum sementara beberapa gambar memuat merek berbeda. Seluruh katalog diperlakukan sebagai contoh desain sampai nama, gambar resmi, spesifikasi, stok, dan harga disahkan pemilik toko.

## Audiens dan pekerjaan utama

Asumsi awal: pembeli Indonesia yang ingin membandingkan kebutuhan perawatan sehari-hari lewat ponsel. Pengguna perlu tahu “ini produk apa, berapa harganya, bagaimana melihat detailnya, dan apa yang sudah ada di keranjang”. Segmen usia, fokus gender, rentang belanja, dan kebutuhan kesehatan belum divalidasi. Bahasa antarmuka Indonesia; frasa Inggris hanya untuk ekspresi visual merek.

Alur utama: **Beranda → kategori/pencarian → produk → keranjang.** Alur berikutnya setelah backend: **alamat → pilihan pengiriman → pembayaran → status pesanan**.

## Struktur konten

| Halaman | Isi dan aksi utama |
| --- | --- |
| Beranda | Identitas besar, galeri editorial, tiga pilihan skincare, pintu masuk alat kesehatan, pendekatan kurasi, panduan memilih, tautan bantuan. Aksi utama: jelajahi koleksi. |
| Koleksi | Cari nama/jenis produk, filter kategori, jumlah hasil, urutkan harga, lihat detail, tambah ke keranjang. |
| Detail produk | Gambar, nama, kategori, harga, deskripsi yang diketahui, informasi ketersediaan data, tambah ke keranjang. Produk tidak ditemukan memiliki jalur kembali. |
| Keranjang | Item, jumlah, harga satuan, subtotal, hapus, lanjut jelajah. Tahap ini menjelaskan bahwa pembayaran belum tersedia. |
| Kontak/bantuan | FAQ nyata tentang penggunaan prototipe, kategori baru, dan kebutuhan transaksi. Tanpa konfirmasi pesan terkirim palsu. |

Alat kesehatan mendapat halaman kategori dengan keadaan kosong yang jelas sampai produk terverifikasi tersedia. Contoh foto kategori tidak diperlakukan sebagai barang yang sudah bisa dibeli.

## Prioritas fitur

| Prioritas | Fitur | Alasan dan prasyarat | Tahap |
| --- | --- | --- | --- |
| P0 | Sistem visual dan navigasi responsif | Menyatukan empat halaman lama; keranjang terlihat di ponsel. | Implementasi desain |
| P0 | Pencarian, kategori, urutan harga | Membantu penemuan produk; data lokal cukup. | Implementasi desain |
| P0 | Detail produk dengan URL sendiri | Kartu dan pencarian memiliki tujuan yang dapat dibagikan. | Implementasi desain |
| P0 | Keranjang persisten dan umpan balik tambah | Mempertahankan fungsi yang sudah ada tanpa memaksa pindah halaman. | Implementasi desain |
| P0 | Empty/error states dan aksesibilitas | Hasil kosong, data rusak, produk hilang, keyboard, dan reduced motion perlu ditangani. | Implementasi desain |
| P1 | Katalog produksi dan admin | Foto resmi, harga, SKU, variasi, stok, metadata skincare/alkes, dan status izin terverifikasi. | Memerlukan backend dan data toko |
| P1 | Guest checkout dan ongkir | Alamat, layanan kirim, biaya final, validasi stok/harga di server. | Setelah katalog produksi |
| P1 | Pembayaran dan pesanan | Gateway pilihan toko, webhook terverifikasi, idempotensi, refund, status pesanan; sukses hanya dari server. | Setelah checkout |
| P1 | Kebijakan toko dan bantuan nyata | Kontak resmi, jam layanan, retur, pengiriman, privasi, serta kanal penerima formulir. | Sebelum publikasi komersial |
| P2 | Filter kebutuhan dan bahan | Memerlukan atribut produsen yang benar. Pilihan pengguna tidak menjadi diagnosis. | Setelah katalog cukup kaya |
| P2 | Perbandingan alat kesehatan | Bandingkan model, ukuran, daya, garansi, kelengkapan, dan manual yang kompatibel. | Setelah ada beberapa model |
| P2 | Panduan dan paket rutinitas | Konten ditinjau pihak yang kompeten; paket mengikuti stok dan variasi. | Setelah validasi konten |
| P2 | Ulasan pembelian terverifikasi | Butuh relasi ke pesanan dan moderasi. Tidak ada rating atau testimoni buatan. | Setelah transaksi berjalan |
| P3 | Wishlist dan pembelian ulang | Akun opsional atau penyimpanan lokal sesuai kebutuhan. | Setelah kebutuhan tervalidasi |
| P3 | Konsultasi terjadwal | Penyedia layanan, jadwal riil, zona waktu, ketersediaan, kebijakan pembatalan, dan penyimpanan aman. | Setelah layanan operasional tersedia |

Tidak dibangun pada iterasi desain: payment gateway, akun, chatbot diagnosis, langganan, loyalty, dashboard admin, booking palsu, angka ulasan, atau badge kepercayaan tanpa bukti.

## Sistem visual

| Elemen | Keputusan |
| --- | --- |
| Kanvas | Putih hangat `#f6f5f1`; panel putih bersih; garis abu tipis. |
| Teks | Charcoal `#20211e`; sekunder `#62645c`. |
| Aksen | Hijau muda `#dce6cf`, lavender `#e9e5ee`, dan foto berwarna amber. Aksen tidak menggantikan kontras teks. |
| Tipografi | Archivo variabel 400–800, disimpan lokal, `font-display: swap`. Metadata memakai sistem monospace. |
| Komposisi | Grid, nomor indeks, ruang kosong luas, foto persegi/potret dengan ukuran stabil. Kartu tidak ditumpuk di dalam kartu. |
| Bentuk | Foto dan panel bersudut kecil; CTA utama gelap; tidak ada gradient atau glassmorphism dekoratif. |
| Gerak | Transisi opacity/transform singkat; tidak ada autoplay, scroll hijacking, atau cursor custom. `prefers-reduced-motion` dihormati. |

UI/UX Pro Max: panduan aksesibilitas, kontras, focus, ukuran target, gambar berdimensi stabil, dan layout mobile dibaca dari skill. Python di mesin ini hanya berupa alias Windows yang tidak dapat dijalankan; pencarian generator tidak berhasil. Sebagai fallback, dataset lokal `styles.csv` (Minimalism & Swiss Style), `products.csv` (E-commerce), dan `stacks/react.csv` ditinjau langsung. Rekomendasi generik seperti glassmorphism ditolak karena kurang sesuai dengan referensi dan konteks toko ini; tidak ada keluaran generator yang diklaim telah tervalidasi.

## Aset dan lisensi

“Open source” dibedakan dari foto gratis berlisensi: Archivo dan Lucide adalah sumber terbuka; foto Pexels memakai lisensi Pexels, bukan lisensi open source/CC0 secara otomatis. Lisensinya mengizinkan penggunaan gratis pada situs dengan batasan, antara lain tidak menyiratkan endorsement. [Lisensi Pexels](https://www.pexels.com/license/)

| Aset | Sumber | Penggunaan |
| --- | --- | --- |
| Foto botol amber, Alesia Kozik | [Pexels 7796975](https://www.pexels.com/photo/cosmetic-product-in-a-brown-glass-container-7796975/) | Foto editorial galeri; `public/images/care-still-life.jpg`. |
| Foto perlengkapan kosmetik, Polina | [Pexels 8101521](https://www.pexels.com/photo/close-up-photo-of-cosmetic-products-8101521/) | Suasana ritual harian; `public/images/daily-ritual.jpg`. |
| Archivo | [Google Fonts, SIL OFL 1.1](https://github.com/google/fonts/blob/main/ofl/archivo/OFL.txt) | Font lokal dan salinan lisensi di `public/fonts/`. |
| Lucide | [ISC dan lisensi ikon turunan](https://lucide.dev/license) | Menggunakan dependensi proyek yang sudah ada; lisensi dipertahankan dalam notice. |
| Gambar tiga produk lama | Berkas `src/assets/` yang sudah ada | Hanya contoh katalog; asal lisensi belum diketahui. Perlu foto resmi pemasok sebelum peluncuran komersial. |
| Unsplash (opsi cadangan) | [Unsplash License](https://unsplash.com/license) | Diteliti, tidak diperlukan untuk implementasi awal. |

Foto dioptimalkan ukurannya saat diunduh dan disimpan lokal. Foto editorial bukan bukti bahwa isi gambar merupakan produk Magna Care, atau bahwa fotografer/pihak terkait mendukung toko.

## Kontrak implementasi dan verifikasi

- Surface: toko frontend dalam checkout lokal ini; tanpa publikasi ke hosting baru.
- Aksi utama: menemukan produk dan menambahkannya ke keranjang.
- Target render: **390x844** dan **1440x900**; cek tambahan 320 px untuk overflow.
- Hierarki beranda: identitas → galeri/koleksi → produk → pendekatan → panduan/bantuan.
- Gambar bermakna memiliki alt; gambar editorial tidak diberi nama produk yang tidak ditampilkan.
- Semua kontrol keyboard memiliki fokus terlihat dan label; sasaran interaksi utama minimal 44 px; halaman dapat dipakai tanpa hover.
- Data keranjang lama valid dipertahankan; harga diambil dari katalog; localStorage tidak dipercaya sebagai sumber harga final.
- Tidak ada klaim izin, stok, keaslian, review, diskon, atau pengiriman yang belum diberikan toko.

| State | Pemicu | Feedback dan langkah aman |
| --- | --- | --- |
| Loading | Font/gambar lokal sedang dimuat | Dimensi media stabil dan fallback font; katalog tidak membutuhkan fetch. |
| Empty | Pencarian tidak cocok, kategori alkes belum diisi, keranjang kosong | Jelaskan keadaan; reset filter, lihat skincare, atau kembali ke koleksi. |
| Error | URL produk tidak dikenal, media gagal | Halaman tidak ditemukan atau pengganti gambar; tautan pemulihan tetap bisa dipakai. |
| Partial | Sebagian data simpanan keranjang tidak valid, detail produsen belum tersedia | Pertahankan item valid; jangan membuat atribut produk yang belum diketahui. |
| Success | Produk ditambahkan, jumlah berubah, item dihapus | Badge dan subtotal berubah; status terucap; tautan keranjang tanpa memindahkan fokus. |
| Permission | Browser menolak penyimpanan lokal | Keranjang tetap berfungsi selama sesi; status menjelaskan bahwa penyimpanan tidak tersedia. |

Build, lint, alur belanja, link, font/gambar, keyboard, reduced motion, serta render desktop/ponsel harus dicek setelah implementasi. Bukti disimpan lokal; state yang belum diuji dicatat sebagai belum diuji, bukan dianggap lulus.

## Metode dan batasan

Riset memakai pencarian web, pembacaan halaman primer, inspeksi DOM referensi, serta pembacaan kode lokal. Firecrawl/Exa tidak tersedia. Screenshot melalui konektor browser tidak merespons saat eksplorasi awal; observasi AVEA di atas berasal dari konten, DOM, dan computed font, bukan klaim audit visual lengkap. Foto dan font yang diunduh diperiksa secara lokal. Tidak ada data privat proyek yang diunggah ke layanan riset.

Pembaruan 25 Oktober: tampilan AVEA akhirnya diperiksa melalui Chrome lokal dengan profil terpisah; screenshot `avea-reference.png` mendokumentasikan showcase berperspektif, logo ringkas, metadata kecil, dan ruang kosong yang luas. Magna Care menerjemahkan fokus galeri tersebut menjadi susunan foto yang dapat langsung diklik, dengan hierarki katalog yang lebih ringkas di ponsel. Implementasi lima halaman, penanganan state, dan bukti render tercatat di `evidence.json`; hasil interaksi dan sampel kontras ada di `browser-checks.json` dan `accessibility-checks.json`. Tidak ada publikasi hosting atau integrasi backend pada iterasi ini.

Lima kelompok sumber utama: referensi visual (AVEA), UX perdagangan (Baymard), pola informasi perawatan (The Ordinary/Aesop), verifikasi produk Indonesia (BPOM/Kemenkes), serta penyedia aset/lisensi (Pexels/Google Fonts/Lucide). Sumber lama yang masih relevan, seperti artikel guest checkout 2023, dibaca pada 24 Oktober 2026; tahun publikasinya tidak disamakan dengan tanggal akses. Tidak ada survei pengguna, pengujian medis, atau verifikasi stok pemasok dalam riset ini.
