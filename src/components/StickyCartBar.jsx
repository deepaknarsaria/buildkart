import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function StickyCartBar() {
  const navigate = useNavigate();
  const { totalQty, total } = useCart();

  if (totalQty === 0) return null;

  return (
    <div className="fixed bottom-[72px] left-0 w-full px-4 z-40 md:max-w-lg md:left-1/2 md:-translate-x-1/2">
      <button
        onClick={() => navigate('/cart')}
        className="w-full h-14 bg-indigo-950 text-white rounded-xl flex items-center justify-between px-6 shadow-xl transition-all active:scale-[0.98]"
      >
        <div className="flex items-center gap-3">
          <span className="bg-yellow-400 text-indigo-950 w-6 h-6 rounded flex items-center justify-center text-xs font-bold">
            {totalQty}
          </span>
          <span className="font-work-sans font-semibold text-sm tracking-wide">
            View Cart &nbsp;•&nbsp; ₹{total.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold">Proceed</span>
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </div>
      </button>
    </div>
  );
}
