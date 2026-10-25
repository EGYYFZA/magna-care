import { products } from './product';

export const CART_STORAGE_KEY = 'magna-care-cart';

export function normalizeCart(value) {
  if (!Array.isArray(value)) return [];
  const items = new Map();
  for (const item of value) {
    const product = products.find((entry) => entry.id === item?.id);
    if (!product || !Number.isSafeInteger(item.quantity) || item.quantity < 1) continue;
    const quantity = (items.get(product.id)?.quantity ?? 0) + item.quantity;
    if (Number.isSafeInteger(quantity) && Number.isSafeInteger(quantity * product.price)) {
      items.set(product.id, { ...product, quantity });
    }
  }
  return [...items.values()];
}
