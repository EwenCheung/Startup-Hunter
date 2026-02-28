import { Link } from 'react-router-dom';
import { IMAGES } from '../constants';
import { useState } from 'react';
import clsx from 'clsx';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState('Small');
  const [selectedColor, setSelectedColor] = useState('Navy');
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: 'bed-1',
      name: 'Premium Orthopedic Dog Bed',
      price: 89.99,
      image: IMAGES.bed,
      size: selectedSize,
      color: selectedColor,
    });
  };

  return (
    <div className="bg-white dark:bg-background-dark min-h-screen flex flex-col">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-transparent">
        <Link to="/" className="text-slate-900 dark:text-slate-100 flex size-10 shrink-0 items-center justify-center rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm cursor-pointer">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <div className="flex items-center justify-end">
          <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm transition-colors">
            <span className="material-symbols-outlined text-slate-900 dark:text-slate-100">share</span>
          </button>
        </div>
      </div>

      {/* Product Image */}
      <div className="relative w-full aspect-[4/3] bg-slate-100 dark:bg-slate-800">
        <img 
          src={IMAGES.bed} 
          alt="Premium Orthopedic Dog Bed" 
          className="w-full h-full object-cover"
        />
        <button className="absolute top-4 right-16 size-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary z-20">
          <span className="material-symbols-outlined fill-1">favorite</span>
        </button>
        
        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-8 h-1.5 rounded-full bg-primary"></div>
          <div className="size-1.5 rounded-full bg-white/50"></div>
          <div className="size-1.5 rounded-full bg-white/50"></div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-6 pb-28 rounded-t-3xl bg-white dark:bg-background-dark -mt-6 relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">Best Seller</span>
          <div className="flex items-center gap-1 ml-auto">
            <span className="material-symbols-outlined text-primary text-sm fill-1">star</span>
            <span className="text-sm font-bold text-primary">4.8</span>
            <span className="text-xs text-slate-400">(124)</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 leading-tight">Premium Orthopedic Dog Bed</h1>
        
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl font-bold text-primary">$89.99</span>
          <span className="text-lg text-slate-400 line-through decoration-1">$110.00</span>
        </div>

        {/* Select Size */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Select Size</h3>
          <div className="flex gap-3">
            {['Small', 'Medium', 'Large'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={clsx(
                  "flex-1 py-3 rounded-xl text-sm font-bold border transition-all",
                  selectedSize === size
                    ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                    : "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Select Color */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Select Color</h3>
          <div className="flex gap-4">
            {[
              { name: 'Navy', color: 'bg-slate-700' },
              { name: 'Grey', color: 'bg-slate-400' },
              { name: 'Beige', color: 'bg-orange-200' },
              { name: 'Blue', color: 'bg-blue-700' },
            ].map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={clsx(
                  "size-12 rounded-full flex items-center justify-center transition-all",
                  selectedColor === color.name ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-background-dark" : ""
                )}
              >
                <div className={`size-12 rounded-full ${color.color} border border-slate-200 dark:border-slate-600`}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Description Accordion */}
        <div className="border-t border-slate-100 dark:border-slate-800 py-4">
          <button 
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">description</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">Description</span>
            </div>
            <span className={`material-symbols-outlined text-slate-400 transition-transform ${isDescriptionOpen ? 'rotate-180' : ''}`}>expand_more</span>
          </button>
          
          {isDescriptionOpen && (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Our Premium Orthopedic Dog Bed features 4 inches of high-density memory foam to provide maximum support for joints and muscles. The water-resistant inner liner and removable, machine-washable faux suede cover make it easy to keep clean.
            </p>
          )}
        </div>

        {/* Materials Accordion */}
        <div className="border-t border-slate-100 dark:border-slate-800 py-4">
          <button 
            onClick={() => setIsMaterialsOpen(!isMaterialsOpen)}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary" style={{transform: 'rotate(45deg)'}}>texture</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">Materials & Care</span>
            </div>
            <span className={`material-symbols-outlined text-slate-400 transition-transform ${isMaterialsOpen ? 'rotate-180' : ''}`}>expand_more</span>
          </button>
          {isMaterialsOpen && (
             <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
               Cover: 100% Polyester Faux Suede. Fill: High-Density Memory Foam. Care: Machine wash cover cold, tumble dry low. Do not wash foam core.
             </p>
          )}
        </div>

        {/* Reviews Preview */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 mt-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Customer Reviews</h3>
            <button className="text-primary text-sm font-bold">Write a review</button>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div>
              <span className="text-4xl font-bold text-slate-900 dark:text-slate-100">4.8</span>
              <div className="flex text-primary text-sm mt-1">
                <span className="material-symbols-outlined text-sm fill-1">star</span>
                <span className="material-symbols-outlined text-sm fill-1">star</span>
                <span className="material-symbols-outlined text-sm fill-1">star</span>
                <span className="material-symbols-outlined text-sm fill-1">star</span>
                <span className="material-symbols-outlined text-sm fill-1">star</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">124 total reviews</p>
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 font-bold">5</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[80%] rounded-full"></div>
                </div>
                <span className="text-slate-400 w-6 text-right">80%</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 font-bold">4</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[12%] rounded-full"></div>
                </div>
                <span className="text-slate-400 w-6 text-right">12%</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 font-bold">3</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[5%] rounded-full"></div>
                </div>
                <span className="text-slate-400 w-6 text-right">5%</span>
              </div>
            </div>
          </div>

          {/* Single Review */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-sm">Sarah M.</h4>
              <span className="text-[10px] text-slate-400">2 days ago</span>
            </div>
            <div className="flex text-primary text-[10px] mb-2">
              <span className="material-symbols-outlined text-xs fill-1">star</span>
              <span className="material-symbols-outlined text-xs fill-1">star</span>
              <span className="material-symbols-outlined text-xs fill-1">star</span>
              <span className="material-symbols-outlined text-xs fill-1">star</span>
              <span className="material-symbols-outlined text-xs fill-1">star</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              My senior golden retriever loves this! You can tell it really helps with his hip dysplasia.
            </p>
          </div>
          
          <button className="w-full text-center text-xs font-bold text-slate-500 mt-4 py-2">
            View All Reviews
          </button>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto bg-white dark:bg-background-dark border-t border-slate-100 dark:border-slate-800 p-4 pb-8 z-30 flex items-center gap-4">
        <button className="size-12 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-slate-100">
          <span className="material-symbols-outlined">shopping_bag</span>
        </button>
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-primary hover:bg-yellow-500 text-white font-bold h-12 rounded-full shadow-lg shadow-primary/25 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
