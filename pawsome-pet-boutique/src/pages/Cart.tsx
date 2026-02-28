import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import BottomNav from '../components/BottomNav';
import clsx from 'clsx';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-slate-100 dark:border-slate-800">
        <button onClick={() => navigate(-1)} className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">My Cart</h2>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-slate-400">shopping_cart_off</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Your cart is empty</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-[200px]">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="bg-primary text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/25">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="size-24 bg-slate-100 dark:bg-slate-700 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                    <div className="flex gap-2 mt-1">
                      {item.size && (
                        <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded">
                          Size: {item.size}
                        </span>
                      )}
                      {item.color && (
                        <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded flex items-center gap-1">
                          Color: {item.color}
                          <span className={clsx("size-2 rounded-full inline-block", 
                            item.color === 'Navy' ? 'bg-slate-700' : 
                            item.color === 'Grey' ? 'bg-slate-400' : 
                            item.color === 'Beige' ? 'bg-orange-200' : 
                            item.color === 'Blue' ? 'bg-blue-700' : 'bg-slate-900'
                          )}></span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                        className="size-6 bg-white dark:bg-slate-800 rounded shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                        className="size-6 bg-white dark:bg-slate-800 rounded shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Checkout Summary */}
      {items.length > 0 && (
        <div className="fixed bottom-[72px] left-0 right-0 max-w-[430px] mx-auto bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 p-6 z-30 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-500 dark:text-slate-400 text-sm">Subtotal</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-500 dark:text-slate-400 text-sm">Shipping</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">$5.00</span>
          </div>
          <div className="flex justify-between items-center mb-6 pt-4 border-t border-dashed border-slate-200 dark:border-slate-700">
            <span className="font-bold text-lg text-slate-900 dark:text-slate-100">Total</span>
            <span className="font-bold text-xl text-primary">${(total + 5).toFixed(2)}</span>
          </div>
          <button className="w-full bg-primary hover:bg-yellow-500 text-white font-bold h-14 rounded-2xl shadow-lg shadow-primary/25 transition-colors flex items-center justify-center gap-2">
            <span>Checkout</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
