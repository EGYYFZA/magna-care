import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, HeartPulse, Search, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { categories, products } from '../data/product';

export default function Products({ onAddToCart }) {
  const [params, setParams] = useSearchParams();
  const category = categories.some((c) => c.value === params.get('category'))
    ? params.get('category')
    : 'all';
  const query = params.get('q') || '';
  const sort = ['price-asc', 'price-desc'].includes(params.get('sort'))
    ? params.get('sort')
    : 'featured';
  const setFilter = (name, value) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value && value !== 'all' && value !== 'featured') next.set(name, value);
        else next.delete(name);
        return next;
      },
      { replace: name === 'q' },
    );
  };
  const visibleProducts = products.filter(
    (p) =>
      (category === 'all' || category === p.category) &&
      `${p.name} ${p.categoryLabel}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  if (sort === 'price-asc') visibleProducts.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') visibleProducts.sort((a, b) => b.price - a.price);

  return (
    <div className="shell catalog-page">
      <div className="breadcrumb eyebrow">
        <Link to="/">BERANDA</Link>
        <span>/</span>
        <span>KOLEKSI</span>
      </div>
      <div className="page-heading">
        <div>
          <p className="eyebrow muted">THOUGHTFULLY CHOSEN FOR YOUR EVERY DAY.</p>
          <h1>
            The care <span>collection.</span>
          </h1>
        </div>
        <p>
          Dari langkah kecil hingga ritual harian.
          <br />
          Temukan ruang untuk merawat diri.
        </p>
      </div>
      <div className="catalog-tools">
        <div className="search-field">
          <Search size={19} aria-hidden="true" />
          <label className="sr-only" htmlFor="search">
            Cari produk
          </label>
          <input
            id="search"
            type="search"
            placeholder="Cari perawatanmu..."
            value={query}
            onChange={(event) => setFilter('q', event.target.value)}
          />
          {query && (
            <button
              className="icon-button"
              aria-label="Hapus pencarian"
              onClick={() => setFilter('q', '')}
            >
              <X size={17} aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="sort-field">
          <label htmlFor="sort">Urutkan:</label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => setFilter('sort', event.target.value)}
          >
            <option value="featured">Pilihan kami</option>
            <option value="price-asc">Harga terendah</option>
            <option value="price-desc">Harga tertinggi</option>
          </select>
        </div>
      </div>
      <div className="catalog-filters">
        <div className="filter-chips" role="group" aria-label="Kategori produk">
          {categories.map((c) => (
            <button
              key={c.value}
              className={category === c.value ? 'filter-chip active' : 'filter-chip'}
              aria-pressed={category === c.value}
              onClick={() => setFilter('category', c.value)}
            >
              {c.label}
              {c.value === 'health' && <span className="new-dot" aria-hidden="true" />}
            </button>
          ))}
        </div>
        <p className="eyebrow muted" role="status" aria-live="polite">
          {visibleProducts.length} PRODUK
        </p>
      </div>
      <h2 className="sr-only">Produk di koleksi</h2>
      {visibleProducts.length ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          {category === 'health' ? (
            <>
              <HeartPulse size={48} strokeWidth={1} aria-hidden="true" />
              <p className="eyebrow muted">THE NEXT CHAPTER</p>
              <h2>
                Lebih banyak care.
                <br />
                Segera hadir.
              </h2>
              <p>
                Koleksi alat kesehatan sedang kami siapkan.
                <br />
                Sementara itu, kenali pilihan skincare kami.
              </p>
            </>
          ) : (
            <>
              <Search size={40} strokeWidth={1} aria-hidden="true" />
              <h2>Belum menemukan yang pas.</h2>
              <p>Coba kata lain atau jelajahi semua kategori.</p>
            </>
          )}
          <button className="button" onClick={() => setParams({})}>
            Lihat semua produk <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
      <p className="catalog-note">
        Katalog konsep · Nama, gambar, dan harga produk merupakan contoh untuk eksplorasi desain.
      </p>
    </div>
  );
}
