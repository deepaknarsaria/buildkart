import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, updateQuantity, items } = useCart();
  const cartItem = items.find(i => i.product.id === product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleInc = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, cartItem.quantity + 1);
  };

  const handleDec = (e) => {
    e.stopPropagation();
    updateQuantity(product.id, cartItem.quantity - 1);
  };

  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(46,16,101,0.04)] border border-slate-50 flex flex-col group cursor-pointer"
    >
      {/* Image area */}
      <div className="relative aspect-square bg-slate-50 p-4">
        {product.badge && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-indigo-950 text-[10px] font-black px-2 py-0.5 rounded-full z-10 uppercase tracking-wide">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Stock status */}
        <div className="flex items-center gap-1 mb-1">
          <div className={`w-1.5 h-1.5 rounded-full ${product.stock === 'in-stock' ? 'bg-green-500' : 'bg-orange-500'}`} />
          <span className={`text-[10px] font-bold uppercase ${product.stock === 'in-stock' ? 'text-green-600' : 'text-orange-600'}`}>
            {product.stock === 'in-stock' ? 'In Stock' : 'Low Stock'}
          </span>
        </div>

        {/* Name */}
        <h4 className="font-work-sans font-semibold text-[13px] text-slate-800 line-clamp-2 leading-snug" style={{ minHeight: '2.5rem' }}>
          {product.name}
        </h4>
        <span className="text-[10px] text-slate-400 mb-2 mt-0.5 uppercase tracking-wide">
          {product.unit}
        </span>

        {/* Price + stepper/add button */}
        <div className="mt-auto flex items-end justify-between">
          <div>
            <span className="font-epilogue font-bold text-[20px] text-indigo-950 leading-none block">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-slate-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          </div>

          {cartItem ? (
            <div
              className="flex items-center gap-1 bg-indigo-950 rounded-lg px-1 py-1"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleDec}
                className="w-7 h-7 flex items-center justify-center rounded-md text-white hover:bg-white/10 active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>
              <span className="font-epilogue font-bold text-white text-sm min-w-[18px] text-center">
                {cartItem.quantity}
              </span>
              <button
                onClick={handleInc}
                className="w-7 h-7 flex items-center justify-center rounded-md text-white hover:bg-white/10 active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all active:scale-95 shadow-sm bg-yellow-400 hover:bg-yellow-500 text-indigo-950"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          )}
        </div>

        {/* Discount badge */}
        {discount > 0 && (
          <span className="text-[10px] text-tertiary font-bold mt-1">{discount}% OFF</span>
        )}
      </div>
    </div>
  );
}
