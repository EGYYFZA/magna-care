import { Link } from 'react-router-dom';
import { ArrowUpRight, Asterisk, Plus } from 'lucide-react';

export default function Contact() {
  return (
    <div className="shell contact-page">
      <div className="breadcrumb eyebrow">
        <Link to="/">BERANDA</Link>
        <span>/</span>
        <span>BANTUAN</span>
      </div>
      <div className="page-heading">
        <div>
          <p className="eyebrow muted">A LITTLE CLARITY, A LITTLE CARE.</p>
          <h1>
            Good questions.
            <br />
            <span>Thoughtful answers.</span>
          </h1>
        </div>
        <Asterisk size={84} strokeWidth={1} aria-hidden="true" />
      </div>
      <div className="contact-grid">
        <div className="contact-intro">
          <p className="eyebrow">LET'S GET TO KNOW EACH OTHER.</p>
          <h2>
            Ruang untuk
            <br />
            mengenal lebih baik.
          </h2>
          <p>
            Magna Care sedang membangun pengalaman belanja skincare dan perawatan harian yang lebih
            sederhana.
          </p>
          <p>
            Kamu bisa menjelajahi produk dan menyusun bag. Kanal bantuan resmi akan dicantumkan saat
            layanan toko tersedia.
          </p>
          <Link className="text-link" to="/products">
            Kembali ke koleksi <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <section className="faq-list" aria-label="Pertanyaan yang sering diajukan">
          <details open>
            <summary>
              Apakah saya sudah bisa memesan? <Plus size={19} aria-hidden="true" />
            </summary>
            <div>
              <p>
                Saat ini website merupakan pratinjau desain. Produk dan harga masih berupa contoh.
                Menambahkan produk ke bag belum membuat pesanan dan tidak memproses pembayaran.
              </p>
            </div>
          </details>
          <details>
            <summary>
              Bagaimana dengan pengiriman dan retur? <Plus size={19} aria-hidden="true" />
            </summary>
            <div>
              <p>
                Biaya, area pengiriman, estimasi waktu, dan kebijakan retur akan ditampilkan setelah
                operasional toko siap.
              </p>
            </div>
          </details>
          <details>
            <summary>
              Di mana produk alat kesehatan? <Plus size={19} aria-hidden="true" />
            </summary>
            <div>
              <p>
                Koleksi alat kesehatan sedang disiapkan. Setiap produk akan dilengkapi informasi
                model, spesifikasi, manual, dan data izin edar dari sumber resmi.
              </p>
            </div>
          </details>
          <details>
            <summary>
              Apakah keranjang saya tersimpan? <Plus size={19} aria-hidden="true" />
            </summary>
            <div>
              <p>
                Bag disimpan di browser pada perangkat ini selama penyimpanan lokal diizinkan.
                Menghapus data browser juga menghapus bag. Sinkronisasi antarperangkat belum
                tersedia.
              </p>
            </div>
          </details>
          <details>
            <summary>
              Apakah tersedia konsultasi? <Plus size={19} aria-hidden="true" />
            </summary>
            <div>
              <p>
                Jadwal konsultasi belum tersedia. Informasi penyedia layanan dan jadwal akan
                ditampilkan setelah layanan tersebut siap digunakan.
              </p>
            </div>
          </details>
        </section>
      </div>
    </div>
  );
}
