export default function ProductCard({ product }) {
  return (
    <div className="flex flex-col items-center p-6 bg-white border border-gray-100 rounded-lg shadow-sm">
      <div className="w-full h-64 mb-4 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
        <img src={product.image} alt={product.name} className="object-cover h-full w-full" referrerPolicy="no-referrer" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{product.description}</p>
      <p className="text-md font-bold text-gray-900 mb-4">IDR {product.price.toLocaleString('id-ID')}</p>
      <button className="w-full py-2 bg-[#e86e1c] text-white font-medium rounded hover:bg-[#d56115] transition-colors">
        Add to Cart
      </button>
    </div>
  );
}
