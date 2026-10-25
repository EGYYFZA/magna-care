import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import { CART_STORAGE_KEY, normalizeCart } from './data/cart';

function getInitialCart() {
  try {
    return normalizeCart(JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]'));
  } catch {
    return [];
  }
}

function Storefront() {
  const [cartItems, setCartItems] = useState(getInitialCart);
  const [notice, setNotice] = useState('');
  const [storageUnavailable, setStorageUnavailable] = useState(false);
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      setStorageUnavailable(true);
    }
  }, [cartItems]);

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      target?.scrollIntoView();
      target?.focus({ preventScroll: true });
    } else {
      window.scrollTo(0, 0);
      if (previousPath.current !== pathname)
        document.getElementById('main-content')?.focus({ preventScroll: true });
    }
    previousPath.current = pathname;
  }, [pathname, hash]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => {
      if (!document.activeElement?.closest('.cart-notice')) setNotice('');
    }, 5500);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const addToCart = (product) => {
    setCartItems((prev) => normalizeCart([...prev, { ...product, quantity: 1 }]));
    setNotice(`${product.name} ditambahkan. ${cartCount + 1} produk di bag.`);
  };
  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      normalizeCart(prev.map((item) => (item.id === id ? { ...item, quantity } : item))),
    );
  };
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setNotice('Produk dihapus dari keranjang.');
  };

  return (
    <div className={pathname === '/' ? 'app gallery-layout' : 'app'}>
      <a className="skip-link" href="#main-content">
        Langsung ke konten
      </a>
      <Navbar cartItemCount={cartCount} />
      {storageUnavailable && (
        <p className="storage-notice" role="status">
          Penyimpanan browser tidak tersedia. Keranjang hanya tersimpan selama sesi ini.
        </p>
      )}
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/products" element={<Products onAddToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetail onAddToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onAddToCart={addToCart}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <div className="empty-state shell">
                <p className="eyebrow">404 / HALAMAN TIDAK DITEMUKAN</p>
                <h1>Kembali ke hal baik.</h1>
                <Link to="/products" className="button">
                  Jelajahi koleksi
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
      {pathname !== '/' && <Footer />}
      <div className="cart-notice" role="status" aria-live="polite" aria-atomic="true">
        {notice && (
          <div className="notice-content">
            <Check size={19} aria-hidden="true" />
            <p>{notice}</p>
            <Link to="/cart">Lihat bag</Link>
            <button
              className="icon-button"
              aria-label="Tutup notifikasi"
              onClick={() => setNotice('')}
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Storefront />
    </BrowserRouter>
  );
}
