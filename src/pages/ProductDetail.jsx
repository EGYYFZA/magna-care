import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Plus } from 'lucide-react';
import ProductImage from '../components/ProductImage';
import { products, formatPrice } from '../data/product';

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === id);
  if (!product)
    return (
      <div className="empty-state shell">
        <p className="eyebrow muted">PRODUK TIDAK DITEMUKAN</p>
        <h1>Mari lihat pilihan lainnya.</h1>
        <Link className="button" to="/products">
          Kembali ke koleksi <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
    );
  return (
    <div className="shell detail-page">
      <Link className="text-link back-link" to="/products">
        <ArrowLeft size={17} aria-hidden="true" /> Kembali ke koleksi
      </Link>
      <div className="detail-grid">
        <div className="detail-media">
          <ProductImage key={product.id} product={product} eager />
          <span className="eyebrow">{product.step}</span>
        </div>
        <div className="detail-copy">
          <p className="eyebrow muted">{product.categoryLabel}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <p className="detail-description">{product.description}</p>
          <button className="button full-width" onClick={() => onAddToCart(product)}>
            Tambah ke bag <Plus size={19} aria-hidden="true" />
          </button>
          <p className="catalog-note">
            Produk contoh untuk eksplorasi desain. Pembayaran belum tersedia.
          </p>
          <div className="product-facts">
            <div>
              <span>Kategori</span>
              <Link to={`/products?category=${product.category}`}>
                {product.categoryLabel} <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
            <div>
              <span>Kode katalog</span>
              <span>MC—00{product.id}</span>
            </div>
          </div>
          <details open>
            <summary>
              Informasi produk <Plus size={18} aria-hidden="true" />
            </summary>
            <div>
              <p>
                Komposisi, isi kemasan, petunjuk penggunaan, dan nomor notifikasi akan ditampilkan
                setelah data resmi produsen tersedia.
              </p>
              <a
                className="text-link"
                href="https://cekbpom.pom.go.id/produk-kosmetika/"
                target="_blank"
                rel="noreferrer"
              >
                Kenali Cek BPOM <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </details>
          <details>
            <summary>
              Pengiriman & pemesanan <Plus size={18} aria-hidden="true" />
            </summary>
            <div>
              <p>
                Halaman ini adalah pratinjau toko. Perhitungan ongkir, pembayaran, dan pengiriman
                akan tersedia setelah layanan pemesanan terhubung.
              </p>
              <Link className="text-link" to="/contact">
                Bantuan & FAQ <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
