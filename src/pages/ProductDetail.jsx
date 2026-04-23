import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const product = products.find(p => p.id === parseInt(id));

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-slate-300">search_off</span>
          <p className="mt-4 text-slate-500">Product not found</p>
          <button onClick={() => navigate('/home')} className="mt-4 bg-yellow-400 text-indigo-950 px-6 py-2 rounded-xl font-bold">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const inCart = items.find(i => i.product.id === product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-background min-h-screen font-work-sans text-on-surface pb-24">
      <Navbar subtitle={product.category} />

      <main className="pt-20 px-4 md:px-8 max-w-[1200px] mx-auto">
        {/* Back nav */}
        <div className="flex items-center gap-2 my-4 text-slate-500">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-indigo-950 transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span className="font-semibold text-xs uppercase tracking-widest">{product.category}</span>
          </button>
        </div>

        {/* Product layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10">
          {/* Hero image */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(46,16,101,0.04)] aspect-square md:aspect-video relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
              {/* Urgency badge */}
              {product.stock === 'low-stock' && (
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-tertiary text-on-tertiary px-3 py-1 rounded-full font-work-sans font-bold text-xs uppercase tracking-wider shadow-lg">
                    High demand today
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-3 gap-1 mt-1">
              <div className="bg-surface-container rounded-lg aspect-square overflow-hidden p-2">
                <img src={product.image} alt="" className="w-full h-full object-contain opacity-60" />
              </div>
              <div className="bg-surface-container rounded-lg aspect-square flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-2xl">360</span>
              </div>
              <div className="bg-surface-container rounded-lg aspect-square flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-2xl">video_library</span>
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-4">
            {/* Main info card */}
            <div className="bg-white p-6 rounded-xl shadow-[0_4px_20px_rgba(46,16,101,0.04)] border border-slate-50">
              <span className="text-secondary font-work-sans font-bold text-xs uppercase tracking-widest">
                {product.brand}
              </span>
              <h2 className="font-epilogue font-bold text-2xl text-indigo-950 mt-1 leading-tight">
                {product.name}
              </h2>
              <p className="text-sm text-slate-500 mt-1">{product.unit}</p>

              {/* Price block */}
              <div className="flex items-baseline gap-2 mt-3">
                <span className="font-epilogue font-bold text-[32px] text-on-surface leading-none">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-slate-400 line-through text-base">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-tertiary font-bold text-sm">({discount}% OFF)</span>
              </div>

              {/* Stock/urgency */}
              {product.stock === 'low-stock' ? (
                <div className="flex items-center gap-2 bg-error-container text-on-error-container p-3 rounded-lg mt-3">
                  <span className="material-symbols-outlined text-[20px]">warning</span>
                  <span className="font-work-sans font-bold text-sm">Only a few left in stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 p-3 rounded-lg mt-3">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span className="font-work-sans font-bold text-sm">In Stock · Ready to ship</span>
                </div>
              )}

              {/* Bulk pricing */}
              <div className="mt-5 border-t pt-4">
                <span className="font-work-sans font-bold text-xs uppercase text-slate-400 block mb-2 tracking-wider">
                  Bulk Pricing
                </span>
                <div className="space-y-1.5">
                  {product.bulkPricing.map((tier) => (
                    <div key={tier.qty} className="flex justify-between items-center p-2 rounded-lg bg-surface">
                      <span className="text-sm text-on-surface-variant">{tier.qty}</span>
                      <span className="font-work-sans font-semibold text-indigo-950 text-sm">{tier.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity + ETA */}
              <div className="mt-5">
                <label className="font-work-sans font-bold text-xs uppercase tracking-widest block mb-2">
                  Select Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-indigo-950 rounded-lg overflow-hidden w-32 h-12">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="flex-1 h-full flex items-center justify-center hover:bg-slate-100 transition-colors active:scale-90"
                    >
                      <span className="material-symbols-outlined text-[20px]">remove</span>
                    </button>
                    <span className="flex-1 text-center font-epilogue font-bold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="flex-1 h-full flex items-center justify-center hover:bg-slate-100 transition-colors active:scale-90"
                    >
                      <span className="material-symbols-outlined text-[20px]">add</span>
                    </button>
                  </div>
                  <div className="flex-1 bg-surface-container p-3 rounded-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">local_shipping</span>
                    <div>
                      <span className="font-work-sans font-bold text-[11px] text-secondary uppercase block">ETA</span>
                      <span className="font-work-sans font-bold text-on-surface text-sm">45 mins</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specs */}
            <div className="bg-indigo-950 text-white p-6 rounded-xl">
              <h3 className="font-epilogue font-bold text-xl mb-3 text-yellow-400">Technical Specs</h3>
              <ul className="space-y-2 text-sm">
                {Object.entries(product.specs).map(([key, val]) => (
                  <li key={key} className="flex justify-between border-b border-white/10 pb-2 last:border-0 last:pb-0">
                    <span className="text-white/70">{key}</span>
                    <span className="font-bold">{val}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div className="bg-white p-5 rounded-xl shadow-[0_4px_20px_rgba(46,16,101,0.04)] border border-slate-50">
              <h3 className="font-epilogue font-bold text-base mb-2 text-indigo-950">About this product</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Add to Cart bar */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-[0_-8px_30px_rgba(46,16,101,0.1)] p-4 pb-safe border-t border-slate-100 flex gap-3">
        <button className="flex-[0.25] flex items-center justify-center border-2 border-indigo-950 text-indigo-950 font-bold rounded-xl h-14 active:scale-95 transition-all hover:bg-slate-50">
          <span className="material-symbols-outlined text-[22px]">favorite_border</span>
        </button>
        <button
          onClick={handleAddToCart}
          className={`flex-1 text-indigo-950 font-epilogue font-bold flex items-center justify-center gap-2 rounded-xl h-14 shadow-lg active:scale-95 transition-all text-base ${
            added ? 'bg-green-400' : 'bg-yellow-400 hover:bg-yellow-500'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">{added ? 'check' : 'shopping_cart'}</span>
          {added
            ? 'Added to Cart!'
            : `ADD TO CART — ₹${(product.price * quantity).toLocaleString('en-IN')}`}
        </button>
      </div>
    </div>
  );
}
