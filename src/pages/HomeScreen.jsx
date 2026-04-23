import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import StickyCartBar from '../components/StickyCartBar';
import ProductCard from '../components/ProductCard';
import { products, buyAgainProducts } from '../data/products';
import { useCart } from '../context/CartContext';

export default function HomeScreen() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div className="bg-background min-h-screen font-work-sans text-on-surface">
      <Navbar />

      <main className="pt-20 pb-40 px-4 max-w-[1200px] mx-auto">
        {/* Search bar */}
        <div className="mb-6">
          <div className="relative flex items-center w-full h-14 bg-white rounded-xl border-2 border-slate-100 px-4 focus-within:border-yellow-400 transition-colors shadow-[0_2px_8px_rgba(46,16,101,0.04)]">
            <span className="material-symbols-outlined text-slate-400 mr-3 text-[22px]">search</span>
            <input
              className="w-full h-full bg-transparent border-none outline-none text-base placeholder:text-slate-400"
              placeholder="Search cement, bricks, tools..."
              type="text"
            />
            <span className="material-symbols-outlined text-on-primary-container text-[22px]">mic</span>
          </div>
        </div>

        {/* ⚡ Express Delivery Banner */}
        <div className="mb-8 relative overflow-hidden rounded-xl bg-indigo-950 p-6 flex items-center justify-between">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center bg-yellow-400 text-indigo-950 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
                Express
              </span>
            </div>
            <h2 className="font-epilogue font-bold text-white text-2xl mb-1 tracking-tight">
              ⚡ Under 20 Minute Delivery
            </h2>
            <p className="text-slate-300 text-sm">Get construction materials on-site, instantly.</p>
          </div>
          <div className="hidden sm:flex items-center justify-center opacity-10">
            <span className="material-symbols-outlined text-yellow-400 text-[80px]">bolt</span>
          </div>
        </div>

        {/* Buy Again */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-epilogue font-bold text-xl text-indigo-950">Buy Again</h3>
            <button className="text-on-primary-container font-semibold text-sm">View History</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {buyAgainProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/${item.productId}`)}
                className="min-w-[140px] bg-white p-3 rounded-xl shadow-[0_4px_20px_rgba(46,16,101,0.04)] border border-slate-50 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-lg mb-2 p-2 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-700 leading-tight mb-0.5">{item.name}</span>
                <span className="text-[10px] text-slate-400 mb-2">{item.unit}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const p = products.find(pr => pr.id === item.productId);
                    if (p) addToCart(p);
                  }}
                  className="w-full py-1.5 bg-secondary-container text-indigo-950 text-[10px] font-bold rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  + Reorder
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Essential Supplies grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-epilogue font-bold text-xl text-indigo-950">Essential Supplies</h3>
            <span className="material-symbols-outlined text-slate-400">filter_list</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <StickyCartBar />
      <BottomNav />
    </div>
  );
}
