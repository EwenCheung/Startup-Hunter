import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useCart } from '../context/CartContext';

export default function BottomNav() {
  const location = useLocation();
  const pathname = location.pathname;
  const { itemCount } = useCart();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-100 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-20">
      <Link to="/" className={clsx("flex flex-col items-center gap-1", isActive('/') ? "text-primary" : "text-slate-400")}>
        <span className="material-symbols-outlined fill-1">home</span>
        <span className="text-[10px] font-bold">Home</span>
      </Link>
      <Link to="/categories" className={clsx("flex flex-col items-center gap-1", isActive('/categories') ? "text-primary" : "text-slate-400")}>
        <span className="material-symbols-outlined">explore</span>
        <span className="text-[10px] font-bold">Explore</span>
      </Link>
      <div className="relative -top-6">
        <Link to="/cart" className="size-14 rounded-full bg-primary text-white shadow-lg shadow-primary/40 border-4 border-background-light dark:border-background-dark flex items-center justify-center relative">
          <span className="material-symbols-outlined text-3xl">shopping_cart</span>
          {itemCount > 0 && (
            <span className="absolute top-0 right-0 size-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-background-light dark:border-background-dark">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
      <button className="flex flex-col items-center gap-1 text-slate-400">
        <span className="material-symbols-outlined">favorite</span>
        <span className="text-[10px] font-bold">Wishlist</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-slate-400">
        <span className="material-symbols-outlined">person</span>
        <span className="text-[10px] font-bold">Profile</span>
      </button>
    </nav>
  );
}
