import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Products() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <Navbar />
      <div className="py-16 px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1e3a5f] mb-8">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
