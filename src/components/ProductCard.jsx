export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex h-56 w-full items-center justify-center overflow-hidden rounded-md bg-gray-100 sm:h-64">
        <img src={product.image} alt={product.name} className="object-cover h-full w-full" referrerPolicy="no-referrer" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{product.description}</p>
      <p className="text-md font-bold text-gray-900 mb-4">IDR {product.price.toLocaleString('id-ID')}</p>
      <button
        type="button"
        className="w-full rounded bg-[#e86e1c] py-2 font-medium text-white transition-colors hover:bg-[#d56115]"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
