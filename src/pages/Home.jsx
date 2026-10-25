import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, X } from 'lucide-react';
import ProductRing from '../components/ProductRing';
import ProductImage from '../components/ProductImage';
import { products, formatPrice } from '../data/product';

export default function Home({ onAddToCart }) {
  const [params] = useSearchParams();
  const listView = params.get('view') === 'list';
  const [selected, setSelected] = useState(0);
  const [detail, setDetail] = useState(null);
  const dialogRef = useRef(null);
  const ringControls = useRef(null);
  const product = products[selected];
  const openProduct = useCallback((item) => {
    setDetail(item);
    if (!dialogRef.current.open) dialogRef.current.showModal();
  }, []);

  useEffect(() => {
    if (detail) dialogRef.current.querySelector('.dialog-close')?.focus();
  }, [detail]);

  return (
    <section className="gallery-home" aria-label="Koleksi Magna Care">
      <h1 className="sr-only">Magna Care — koleksi produk</h1>
      <div className="gallery-caption">
        <span>SKINCARE & HEALTHCARE</span>
        <span>KOLEKSI / {String(products.length).padStart(2, '0')}</span>
      </div>
      <ProductRing
        controllerRef={ringControls}
        onSelect={setSelected}
        onOpen={openProduct}
        hidden={listView}
      />

      {listView && (
        <div className="home-product-list" aria-label="Semua produk">
          {products.map((item, index) => (
            <button className="home-product-row" key={item.id} onClick={() => openProduct(item)}>
              <span className="list-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="list-thumbnail">
                <ProductImage product={item} eager />
              </span>
              <span className="list-product-name">
                {item.name}
                <small>{item.categoryLabel}</small>
              </span>
              <span className="list-product-price">{formatPrice(item.price)}</span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </button>
          ))}
        </div>
      )}

      {!listView && (
        <>
          <div className="orbit-product-meta" aria-live="polite" aria-atomic="true">
            {product.categoryLabel}
          </div>
          <div className="orbit-product-actions">
            <button
              className="orbit-add"
              onClick={() => onAddToCart(product)}
              aria-label={`Tambah ${product.name} ke bag`}
            >
              Tambah ke bag <Plus size={16} aria-hidden="true" />
            </button>
            <button className="orbit-detail" onClick={() => openProduct(product)}>
              Detail produk <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="orbit-controls" role="group" aria-label="Kontrol galeri">
            <button
              className="icon-button"
              aria-label="Produk sebelumnya"
              onClick={() => ringControls.current?.move(-1)}
            >
              <ArrowLeft size={18} strokeWidth={1.4} aria-hidden="true" />
            </button>
            <span>
              {String(selected + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
            </span>
            <button
              className="icon-button"
              aria-label="Produk berikutnya"
              onClick={() => ringControls.current?.move(1)}
            >
              <ArrowRight size={18} strokeWidth={1.4} aria-hidden="true" />
            </button>
          </div>
        </>
      )}

      <div className="gallery-bottom-line">
        <span>© {new Date().getFullYear()} MAGNA CARE</span>
      </div>

      <dialog
        ref={dialogRef}
        className="gallery-product-dialog"
        aria-labelledby="gallery-detail-name"
        onClose={() => {
          if (!dialogRef.current.open) setDetail(null);
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            event.currentTarget.close();
        }}
      >
        {detail && (
          <>
            <button
              className="dialog-close icon-button"
              aria-label="Tutup detail produk"
              onClick={() => dialogRef.current.close()}
            >
              <X size={20} aria-hidden="true" />
            </button>
            <div className="gallery-dialog-image">
              <ProductImage key={detail.id} product={detail} eager />
            </div>
            <div className="gallery-dialog-copy">
              <p className="eyebrow muted">{detail.categoryLabel}</p>
              <h2 id="gallery-detail-name">{detail.name}</h2>
              <p>{detail.description}</p>
              <div className="dialog-price">{formatPrice(detail.price)}</div>
              <button
                className="orbit-add"
                onClick={() => {
                  onAddToCart(detail);
                  dialogRef.current.close();
                }}
              >
                Tambah ke bag <Plus size={18} aria-hidden="true" />
              </button>
              <p className="dialog-demo-note">Produk contoh · pembayaran belum tersedia.</p>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
