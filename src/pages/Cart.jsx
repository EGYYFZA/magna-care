import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { products } from '../data/product';

export default function Cart({ cartItemCount, cartItems, onAddToCart, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const navigate = useNavigate();
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const recommendedProducts = products.filter(
    (product) => !cartItems.some((item) => item.id === product.id),
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <Navbar cartItemCount={cartItemCount} />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500 shadow-sm">
            Your cart is currently empty.{' '}
            <Link to="/products" className="font-medium text-[#1e3a5f] underline">
              Explore products
            </Link>
            .
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-[110px_1fr_auto] sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-full rounded-md object-cover sm:h-20 sm:w-24"
                  referrerPolicy="no-referrer"
                />

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">IDR {item.price.toLocaleString('id-ID')}</p>
                </div>

                <div className="flex items-center gap-2 sm:justify-end">
                  <button
                    type="button"
                    className="rounded border border-gray-300 px-3 py-1 text-sm"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    type="button"
                    className="rounded border border-gray-300 px-3 py-1 text-sm"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="ml-2 rounded px-3 py-1 text-sm text-red-500 hover:bg-red-50"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between text-lg font-semibold text-gray-900">
                <span>Subtotal</span>
                <span>IDR {subtotal.toLocaleString('id-ID')}</span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className="rounded border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
                  onClick={onClearCart}
                >
                  Clear Cart
                </button>
                <button
                  type="button"
                  className="rounded bg-[#e86e1c] px-4 py-2 font-medium text-white hover:bg-[#d56115]"
                  onClick={() => navigate('/contact')}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {recommendedProducts.length > 0 && (
          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1e3a5f]">You May Also Like</h2>
              <p className="text-sm text-gray-500">Geser ke kanan untuk melihat lainnya</p>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {recommendedProducts.map((product) => (
                <article
                  key={product.id}
                  className="min-w-[240px] max-w-[240px] rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-3 h-36 w-full rounded-md object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
                  <p className="mb-2 text-sm text-gray-500">{product.description}</p>
                  <p className="mb-3 text-sm font-bold text-gray-900">
                    IDR {product.price.toLocaleString('id-ID')}
                  </p>
                  <button
                    type="button"
                    className="w-full rounded bg-[#e86e1c] py-2 text-sm font-medium text-white transition-colors hover:bg-[#d56115]"
                    onClick={() => onAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}