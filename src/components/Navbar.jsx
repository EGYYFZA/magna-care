import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, ShoppingCart, X } from 'lucide-react';

const navItems = [
  { label: 'Men', to: '/' },
  { label: 'Skin Care', to: '/products' },
  { label: 'Contact Us', to: '/contact' },
];

function linkClassName({ isActive }) {
  return `transition-colors hover:text-[#1e3a5f] ${isActive ? 'text-[#1e3a5f]' : 'text-gray-700'}`;
}

export default function Navbar({ cartItemCount = 0 }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-xl font-bold uppercase tracking-wider text-[#1e3a5f] sm:text-2xl">
          Magna Care
        </NavLink>

        <button
          type="button"
          aria-label="Toggle menu"
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-widest md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClassName}>
              {item.label}
            </NavLink>
          ))}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative rounded-full p-2 transition-colors ${isActive ? 'text-[#1e3a5f]' : 'text-gray-700 hover:text-[#1e3a5f]'}`
            }
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e86e1c] px-1 text-[10px] font-bold leading-none text-white">
                {cartItemCount}
              </span>
            )}
          </NavLink>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-3 pt-4 text-sm font-semibold uppercase tracking-widest">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClassName}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/cart"
              className="flex items-center gap-2 text-gray-700 transition-colors hover:text-[#1e3a5f]"
              onClick={() => setOpen(false)}
            >
              <ShoppingCart size={18} />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="rounded-full bg-[#e86e1c] px-2 py-0.5 text-[10px] font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
