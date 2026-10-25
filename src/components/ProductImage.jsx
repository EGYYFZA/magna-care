import { useState } from 'react';
import { ImageOff } from 'lucide-react';

export default function ProductImage({ product, eager = false }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="image-fallback" role="img" aria-label={`Foto ${product.name} tidak tersedia`}>
      <ImageOff aria-hidden="true" size={28} />
      <span>Foto belum tersedia</span>
    </span>
  ) : (
    <img
      src={product.image}
      alt={product.name}
      width="400"
      height="500"
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
    />
  );
}
