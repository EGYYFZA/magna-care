import uvImage from '../assets/uv.png';
import dMoisterImage from '../assets/d-moister.png';
import Lorel from '../assets/lorel.png';

export const products = [
  {
    id: 1,
    name: 'Hydra Cleanser',
    description: 'Deep Clean Formula',
    price: 120000,
    image: Lorel,
    category: 'cleanser',
    categoryLabel: 'Pembersih wajah',
    step: '01 / CLEANSE',
  },
  {
    id: 2,
    name: 'Daily Moisturizer',
    description: 'Hydrating & Refreshing',
    price: 150000,
    image: dMoisterImage,
    category: 'moisturizer',
    categoryLabel: 'Pelembap',
    step: '02 / HYDRATE',
  },
  {
    id: 3,
    name: 'UV Shield SPF 50',
    description: 'Broad Spectrum Protection',
    price: 180000,
    image: uvImage,
    category: 'sunscreen',
    categoryLabel: 'Tabir surya',
    step: '03 / PROTECT',
  },
];

export const categories = [
  { value: 'all', label: 'Semua produk' },
  { value: 'cleanser', label: 'Pembersih' },
  { value: 'moisturizer', label: 'Pelembap' },
  { value: 'sunscreen', label: 'Tabir surya' },
  { value: 'health', label: 'Alat kesehatan' },
];

export const formatPrice = (price) => `Rp${price.toLocaleString('id-ID')}`;
