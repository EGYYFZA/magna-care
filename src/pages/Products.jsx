import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/product';

export default function Products({ cartItemCount, onAddToCart }) {
  const navigate = useNavigate();

  const handleAddToCartAndGoCart = (product) => {
    onAddToCart(product);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <Navbar cartItemCount={cartItemCount} />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">All Products</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCartAndGoCart} />
          ))}
        </div>
      </div>
    </div>
  );
}
