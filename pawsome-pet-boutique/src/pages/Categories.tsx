import { Link } from 'react-router-dom';
import { IMAGES } from '../constants';
import BottomNav from '../components/BottomNav';

export default function Categories() {
  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-slate-100 dark:border-slate-800">
        <Link to="/" className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h2 className="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Browse Categories</h2>
        <div className="flex w-10 items-center justify-end">
          <button className="flex size-10 cursor-pointer items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">search</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Shop by Pet Grid */}
        <section className="px-4 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-slate-900 dark:text-slate-100 text-xl font-bold tracking-tight">Shop by Pet</h2>
            <span className="text-primary text-sm font-semibold">View All</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Dog Card */}
            <div className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/5] bg-slate-100 dark:bg-slate-800">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={IMAGES.dogLarge} alt="Dogs" />
              <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
                <p className="text-white text-lg font-bold leading-tight">Dogs</p>
                <p className="text-white/80 text-xs mt-1">1.2k+ Products</p>
              </div>
            </div>

            {/* Cat Card */}
            <div className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/5] bg-slate-100 dark:bg-slate-800 border-2 border-primary">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={IMAGES.catLarge} alt="Cats" />
              <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
                <div className="flex items-center gap-2">
                  <p className="text-white text-lg font-bold leading-tight">Cats</p>
                  <span className="bg-primary text-slate-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">Selected</span>
                </div>
                <p className="text-white/80 text-xs mt-1">850+ Products</p>
              </div>
            </div>

            {/* Bird Card */}
            <div className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/5] bg-slate-100 dark:bg-slate-800">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={IMAGES.birdLarge} alt="Birds" />
              <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
                <p className="text-white text-lg font-bold leading-tight">Birds</p>
                <p className="text-white/80 text-xs mt-1">320+ Products</p>
              </div>
            </div>

            {/* Small Animal Card */}
            <div className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/5] bg-slate-100 dark:bg-slate-800">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
              <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={IMAGES.smallAnimalLarge} alt="Small Animals" />
              <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
                <p className="text-white text-lg font-bold leading-tight">Small Animals</p>
                <p className="text-white/80 text-xs mt-1">150+ Products</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sub-Categories for Selected (Cats) */}
        <section className="px-4 mt-8">
          <h3 className="text-slate-900 dark:text-slate-100 text-lg font-bold mb-4">Cat Essentials</h3>
          <div className="space-y-3">
            {[
              { icon: 'restaurant', title: 'Food & Treats', desc: 'Dry food, wet food, dental treats' },
              { icon: 'toys', title: 'Toys & Entertainment', desc: 'Lasers, wands, catnip toys' },
              { icon: 'content_cut', title: 'Grooming & Health', desc: 'Brushes, shampoos, vitamins' },
              { icon: 'bed', title: 'Beds & Furniture', desc: 'Trees, scratchers, cozy beds' },
              { icon: 'cleaning_services', title: 'Litter & Cleaning', desc: 'Boxes, litter, stain removers' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-primary/50 transition-colors">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-slate-100">{item.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </>
  );
}
