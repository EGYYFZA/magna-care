import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <p className="eyebrow">A LITTLE CARE GOES A LONG WAY.</p>
            <h2>
              Make room
              <br />
              for yourself.
            </h2>
          </div>
          <Link to="/products" className="round-link" aria-label="Jelajahi koleksi">
            <ArrowUpRight size={38} strokeWidth={1.4} aria-hidden="true" />
          </Link>
        </div>
        <div className="footer-links">
          <Link to="/products">Koleksi skincare</Link>
          <Link to="/products?category=health">Alat kesehatan</Link>
          <Link to="/contact">Bantuan & FAQ</Link>
          <a href="/ASSET-LICENSES.md">Kredit aset</a>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          magna care<span>+</span>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Magna Care</span>
          <span>Perawatan baik, setiap hari.</span>
          <span>INDONESIA / IDR</span>
        </div>
      </div>
    </footer>
  );
}
