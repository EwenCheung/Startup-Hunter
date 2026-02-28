import { Link } from 'react-router-dom';
import { IMAGES } from '../constants';
import BottomNav from '../components/BottomNav';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-8 pb-4 bg-background-light dark:bg-background-dark sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">pets</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Pawsome</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Pet Boutique</p>
          </div>
        </div>
        <button className="size-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-700">
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">shopping_basket</span>
        </button>
      </header>

      {/* Search Bar */}
      <div className="px-6 py-2">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-slate-400">search</span>
          <input 
            className="w-full h-12 pl-12 pr-4 bg-white dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary shadow-sm placeholder:text-slate-400 outline-none" 
            placeholder="Search for collars, beds, or toys" 
            type="text" 
          />
          <span className="material-symbols-outlined absolute right-4 text-slate-400">tune</span>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-6 mb-4">
          <h2 className="text-lg font-bold">Categories</h2>
          <Link to="/categories" className="text-sm font-semibold text-primary">See All</Link>
        </div>
        <div className="flex overflow-x-auto gap-4 px-6 no-scrollbar pb-2">
          {[
            { name: 'Dogs', img: IMAGES.dogs, color: 'bg-blue-100' },
            { name: 'Cats', img: IMAGES.cats, color: 'bg-orange-100' },
            { name: 'Birds', img: IMAGES.birds, color: 'bg-green-100' },
            { name: 'Fish', img: IMAGES.fish, color: 'bg-cyan-100' },
            { name: 'Reptiles', img: IMAGES.reptiles, color: 'bg-yellow-100' },
          ].map((cat) => (
            <div key={cat.name} className="flex flex-col items-center gap-2 min-w-[70px]">
              <div className={`size-16 rounded-full ${cat.color} flex items-center justify-center overflow-hidden`}>
                <img className="w-full h-full object-cover" src={cat.img} alt={cat.name} />
              </div>
              <span className="text-xs font-medium">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="mt-8 px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Featured Products</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Product Card 1 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-sm border border-slate-50 dark:border-slate-700">
            <div className="relative aspect-square rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden mb-3">
              <img className="w-full h-full object-cover" src={IMAGES.collar} alt="Premium Leather Collar" />
              <button className="absolute top-2 right-2 size-8 rounded-full bg-white/80 dark:bg-slate-800/80 flex items-center justify-center">
                <span className="material-symbols-outlined text-rose-500 text-lg fill-1">favorite</span>
              </button>
            </div>
            <h3 className="text-sm font-bold truncate">Premium Leather Collar</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Handcrafted, Tan</p>
            <div className="flex items-center justify-between">
              <span className="text-primary font-bold">$24.00</span>
              <button 
                onClick={() => addToCart({
                  id: 'collar-1',
                  name: 'Premium Leather Collar',
                  price: 24.00,
                  image: IMAGES.collar,
                  size: 'M',
                  color: 'Tan'
                })}
                className="size-7 rounded-lg bg-primary text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-sm border border-slate-50 dark:border-slate-700 block">
            <Link to="/product/1" className="block">
              <div className="relative aspect-square rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden mb-3">
                <img className="w-full h-full object-cover" src={IMAGES.bed} alt="Cloud Comfort Bed" />
                <button className="absolute top-2 right-2 size-8 rounded-full bg-white/80 dark:bg-slate-800/80 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-400 text-lg">favorite</span>
                </button>
              </div>
              <h3 className="text-sm font-bold truncate">Cloud Comfort Bed</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Washable, Soft Pink</p>
            </Link>
            <div className="flex items-center justify-between">
              <span className="text-primary font-bold">$45.99</span>
              <button 
                onClick={() => addToCart({
                  id: 'bed-1',
                  name: 'Cloud Comfort Bed',
                  price: 45.99,
                  image: IMAGES.bed,
                  size: 'M',
                  color: 'Pink'
                })}
                className="size-7 rounded-lg bg-primary text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="mt-8 mb-24">
        <div className="flex items-center justify-between px-6 mb-4">
          <h2 className="text-lg font-bold">New Arrivals</h2>
          <button className="text-sm font-semibold text-primary">View More</button>
        </div>
        <div className="flex overflow-x-auto gap-4 px-6 no-scrollbar pb-4">
          {/* New Arrival Card 1 */}
          <div className="flex-shrink-0 w-64 bg-primary/10 dark:bg-primary/5 rounded-2xl p-4 flex gap-4 items-center border border-primary/10">
            <div className="size-20 rounded-xl bg-white overflow-hidden flex-shrink-0">
              <img className="w-full h-full object-cover" src={IMAGES.laser} alt="Smart Laser Cat Toy" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-primary uppercase">Just In</span>
              <h3 className="text-sm font-bold leading-tight">Smart Laser Cat Toy</h3>
              <span className="text-sm font-bold mt-1">$19.50</span>
            </div>
          </div>

          {/* New Arrival Card 2 */}
          <div className="flex-shrink-0 w-64 bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 flex gap-4 items-center">
            <div className="size-20 rounded-xl bg-white overflow-hidden flex-shrink-0">
              <img className="w-full h-full object-cover" src={IMAGES.treats} alt="Gourmet Dog Treats" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Organic</span>
              <h3 className="text-sm font-bold leading-tight">Gourmet Dog Treats</h3>
              <span className="text-sm font-bold mt-1">$12.00</span>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNav />
    </>
  );
}
