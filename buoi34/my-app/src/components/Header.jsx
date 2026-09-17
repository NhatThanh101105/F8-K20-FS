import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Header() {
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }) => {
    const base =
      "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg";
    const active = "bg-white/20 text-white shadow-lg shadow-white/10";
    const inactive = "text-indigo-100 hover:bg-white/10 hover:text-white";
    return `${base} ${isActive ? active : inactive}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-xl shadow-indigo-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              ReactShop
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={linkClass}>
              <span>🏠</span> Home
            </NavLink>
            <NavLink to="/products" className={linkClass}>
              <span>📦</span> Products
            </NavLink>
            <NavLink
              to="/cart"
              className={linkClass}
            >
              <span>🛒</span> Cart
              {cartCount > 0 && (
                <span className="ml-1 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </NavLink>
            <div className="w-px h-6 bg-white/20 mx-2"></div>
            <NavLink to="/sign-in" className={linkClass}>
              Sign In
            </NavLink>
            <NavLink
              to="/sign-up"
              className={({ isActive }) =>
                `${linkClass({ isActive })} !bg-white/20 !text-white border border-white/30 hover:!bg-white/30`
              }
            >
              Sign Up
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block ${linkClass({ isActive })}`
              }
              onClick={() => setMobileOpen(false)}
            >
              🏠 Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `block ${linkClass({ isActive })}`
              }
              onClick={() => setMobileOpen(false)}
            >
              📦 Products
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `block ${linkClass({ isActive })}`
              }
              onClick={() => setMobileOpen(false)}
            >
              🛒 Cart{" "}
              {cartCount > 0 && (
                <span className="bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                `block ${linkClass({ isActive })}`
              }
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </NavLink>
            <NavLink
              to="/sign-up"
              className={({ isActive }) =>
                `block ${linkClass({ isActive })}`
              }
              onClick={() => setMobileOpen(false)}
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
