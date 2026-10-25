import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';
import { products, formatPrice } from '../data/product';

export default function Cart({ cartItems, onAddToCart, onUpdateQuantity, onRemoveItem }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const recommended = products.filter(
    (product) => !cartItems.some((item) => item.id === product.id),
  );
  return (
    <div className="shell cart-page">
      <div className="breadcrumb eyebrow">
        <Link to="/">BERANDA</Link>
        <span>/</span>
        <span>YOUR BAG</span>
      </div>
      <div className="section-heading">
        <div>
          <p className="eyebrow muted">A LITTLE SOMETHING FOR YOU.</p>
          <h1>
            Your care bag<span className="heading-dot">.</span>
          </h1>
        </div>
        <Link className="text-link" to="/products">
          Lanjut jelajah <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </div>
      {cartItems.length ? (
        <div className="cart-layout">
          <section aria-label="Produk di keranjang" className="cart-items">
            <div className="cart-table-heading eyebrow">
              <span>PRODUK</span>
              <span>JUMLAH / TOTAL</span>
            </div>
            {cartItems.map((item) => (
              <article key={item.id} className="cart-item">
                <Link to={`/products/${item.id}`} className="cart-image">
                  <ProductImage product={item} />
                </Link>
                <div className="cart-item-info">
                  <p className="eyebrow muted">{item.categoryLabel}</p>
                  <h2>
                    <Link to={`/products/${item.id}`}>{item.name}</Link>
                  </h2>
                  <p>{formatPrice(item.price)}</p>
                  <div className="quantity-control">
                    <button
                      className="icon-button"
                      aria-label={`Kurangi jumlah ${item.name}`}
                      disabled={item.quantity <= 1}
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={15} aria-hidden="true" />
                    </button>
                    <span aria-label={`Jumlah ${item.name}: ${item.quantity}`}>
                      {item.quantity}
                    </span>
                    <button
                      className="icon-button"
                      aria-label={`Tambah jumlah ${item.name}`}
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={15} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="cart-line-total">
                  <p>{formatPrice(item.price * item.quantity)}</p>
                  <button
                    className="icon-button"
                    aria-label={`Hapus ${item.name}`}
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </section>
          <aside className="cart-summary" aria-labelledby="summary-heading">
            <p className="eyebrow">THE GOOD STUFF</p>
            <h2 id="summary-heading">Ringkasan bag</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong aria-live="polite" aria-atomic="true">
                {formatPrice(subtotal)}
              </strong>
            </div>
            <p>
              Belum termasuk ongkir. Pembayaran belum tersedia pada pratinjau ini; pesanan belum
              dibuat.
            </p>
            <Link to="/contact" className="button full-width">
              Info pemesanan <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/products" className="text-link">
              Jelajahi koleksi <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </aside>
        </div>
      ) : (
        <div className="empty-state cart-empty">
          <ShoppingBag size={46} strokeWidth={1} aria-hidden="true" />
          <h2>Ruang untuk hal baik.</h2>
          <p>Bag kamu masih kosong. Mulai dari satu langkah kecil.</p>
          <Link className="button" to="/products">
            Temukan perawatanmu <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      )}
      {recommended.length > 0 && (
        <section className="cart-recommendations" aria-labelledby="recommended-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow muted">A LITTLE MORE CARE</p>
              <h2 id="recommended-heading">Lengkapi ritualmu.</h2>
            </div>
          </div>
          <div className="product-grid">
            {recommended.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
