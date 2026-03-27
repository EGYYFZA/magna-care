import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-white border-b border-gray-100">
      <Link to="/" className="text-2xl font-bold text-[#1e3a5f] uppercase tracking-wider">
        Magna Care
      </Link>
      <div className="flex space-x-8 text-xs font-semibold text-gray-700 uppercase tracking-widest">
        <Link to="/products" className="hover:text-gray-900">Men</Link>
        <Link to="/products" className="hover:text-gray-900">Skin Care</Link>
        <Link to="/contact" className="hover:text-gray-900">Contact Us</Link>
      </div>
    </nav>
  );
}
