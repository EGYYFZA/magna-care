import { Link } from 'react-router-dom';
import { ArrowUpRight, Plus } from 'lucide-react';
import { formatPrice } from '../data/product';
import ProductImage from './ProductImage';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <Link
        to={`/products/${product.id}`}
        className="product-media"
        aria-label={`Lihat ${product.name}`}
      >
        <span className="product-index eyebrow">{product.step}</span>
        <ProductImage product={product} />
        <span className="product-view">
          <ArrowUpRight size={20} aria-hidden="true" />
        </span>
      </Link>
      <div className="product-caption">
        <div>
          <p className="eyebrow muted">{product.categoryLabel}</p>
          <h3>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="product-price">{formatPrice(product.price)}</p>
        </div>
        <button
          className="icon-button add-button"
          onClick={() => onAddToCart(product)}
          aria-label={`Tambah ${product.name} ke keranjang`}
        >
          <Plus size={21} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
