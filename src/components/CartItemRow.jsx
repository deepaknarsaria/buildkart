import { useCart } from '../context/CartContext';

export default function CartItemRow({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="bg-white p-4 rounded-xl shadow-[0_4px_20px_rgba(46,16,101,0.04)] border border-slate-100 flex gap-4">
      {/* Image */}
      <div className="w-24 h-24 bg-surface-container rounded-lg flex-shrink-0 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-1"
        />
      </div>

      {/* Details */}
      <div className="flex-grow flex flex-col justify-between min-w-0">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-work-sans font-semibold text-on-surface text-base leading-snug line-clamp-2">
              {product.name}
            </h3>
            <button
              onClick={() => removeFromCart(product.id)}
              className="flex-shrink-0 material-symbols-outlined text-outline hover:text-error transition-colors cursor-pointer text-[22px]"
            >
              delete
            </button>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">{product.unit}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="font-epilogue font-bold text-[20px] text-indigo-950 leading-none">
              ₹{(product.price * quantity).toLocaleString('en-IN')}
            </span>
            {quantity > 1 && (
              <span className="text-[11px] text-slate-400 block mt-0.5">
                ₹{product.price.toLocaleString('en-IN')} × {quantity}
              </span>
            )}
          </div>

          {/* Quantity stepper */}
          <div className="flex items-center bg-surface-container rounded-lg p-1 border border-outline-variant">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="w-9 h-9 flex items-center justify-center text-on-primary-container font-bold hover:bg-white rounded-md transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>
            <span className="w-10 text-center font-work-sans font-semibold text-sm">{quantity}</span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="w-9 h-9 flex items-center justify-center text-on-primary-container font-bold hover:bg-white rounded-md transition-all active:scale-90"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
