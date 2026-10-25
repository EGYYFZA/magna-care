import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function Navbar({ cartItemCount = 0 }) {
  const { pathname, search } = useLocation();
  const list = pathname === '/' && new URLSearchParams(search).get('view') === 'list';
  return (
    <header className="site-header minimal-header">
      <nav className="minimal-navbar" aria-label="Navigasi utama">
        <Link to="/" className="magna-logo" aria-label="Magna Care — beranda">
          <img src="/magna-care.svg" width="252" height="64" alt="Magna Care" />
        </Link>
        <div className="visible-nav">
          <Link to="/" aria-current={pathname === '/' && !list ? 'page' : undefined}>
            Koleksi
          </Link>
          <Link to="/?view=list" aria-current={list ? 'page' : undefined}>
            Produk
          </Link>
          <Link to="/contact" aria-current={pathname === '/contact' ? 'page' : undefined}>
            Bantuan
          </Link>
        </div>
        <Link to="/cart" className="minimal-bag" aria-label={`Keranjang, ${cartItemCount} produk`}>
          <ShoppingBag size={17} strokeWidth={1.4} aria-hidden="true" />
          <span>Bag</span>
          <span className="bag-count">{cartItemCount}</span>
        </Link>
      </nav>
    </header>
  );
}
