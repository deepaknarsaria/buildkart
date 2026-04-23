import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import CartItemRow from '../components/CartItemRow';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, totalQty, subtotal, deliveryFee, handlingFee, savings, total } = useCart();

  return (
    <div className="bg-background min-h-screen font-work-sans text-on-surface">
      <Navbar title="Your Cart" subtitle={`${totalQty} items`} />

      <main className="max-w-[1200px] mx-auto px-4 pt-24 pb-48">
        {/* Express delivery banner */}
        <div className="bg-tertiary-container text-on-tertiary-container rounded-xl p-4 flex items-center gap-3 mb-6 shadow-sm border border-tertiary/20">
          <span className="material-symbols-outlined text-tertiary font-bold">bolt</span>
          <p className="font-work-sans font-bold text-sm">⚡ Delivered in under 20 minutes</p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="material-symbols-outlined text-7xl text-slate-200 mb-4">shopping_cart</span>
            <h3 className="font-epilogue font-bold text-xl text-indigo-950 mb-2">Your cart is empty</h3>
            <p className="text-slate-500 mb-6">Add construction materials to get started</p>
            <button
              onClick={() => navigate('/home')}
              className="bg-yellow-400 text-indigo-950 font-bold px-8 py-3 rounded-xl hover:bg-yellow-500 active:scale-95 transition-all"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Items */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-epilogue font-bold text-xl text-indigo-950">
                  Your Materials ({totalQty})
                </h2>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-outline-variant shadow-sm">
                  <span
                    className="material-symbols-outlined text-secondary text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    Verified Suppliers
                  </span>
                </div>
              </div>

              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>

            {/* Price summary */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgba(46,16,101,0.08)] border border-slate-100">
                <h2 className="font-epilogue font-bold text-xl text-indigo-950 mb-6">Price Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span className="text-base">Items Total ({totalQty} items)</span>
                    <span className="font-semibold text-on-surface">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span className="text-base">Delivery Fee</span>
                    {deliveryFee === 0 ? (
                      <span className="font-bold text-tertiary">FREE</span>
                    ) : (
                      <span className="font-semibold text-on-tertiary-container">₹{deliveryFee}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span className="text-base">Handling &amp; Loading</span>
                    <span className="font-semibold">₹{handlingFee}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between items-center text-green-700">
                      <span className="text-base">Bulk Savings</span>
                      <span className="font-bold">–₹{savings.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                    <span className="font-epilogue font-bold text-lg text-indigo-950">Final Total</span>
                    <span className="font-epilogue font-bold text-2xl text-indigo-950">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Savings callout */}
                {savings > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-on-primary-container text-sm mt-0.5">savings</span>
                      <div>
                        <p className="text-xs font-bold text-on-primary-container uppercase tracking-wide">
                          Bulk Savings Applied
                        </p>
                        <p className="text-[11px] text-on-surface-variant mt-0.5">
                          You've saved ₹{savings.toLocaleString('en-IN')} on this order via contract pricing.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => navigate('/checkout')}
                  className="hidden md:flex w-full py-4 bg-yellow-400 hover:bg-yellow-500 active:scale-95 transition-all rounded-xl text-indigo-950 font-epilogue font-bold text-lg shadow-lg shadow-yellow-400/20 items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
                <p className="hidden md:block text-center text-[10px] uppercase tracking-widest text-slate-400 mt-4 font-bold">
                  Secure SSL Encrypted Payment
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile sticky CTA */}
      {items.length > 0 && (
        <div className="md:hidden fixed bottom-[72px] left-0 w-full p-4 bg-white/90 backdrop-blur-md border-t border-slate-100 z-40">
          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-yellow-400 active:scale-95 transition-all rounded-xl text-indigo-950 font-epilogue font-bold text-lg shadow-lg shadow-yellow-400/20"
          >
            Checkout · ₹{total.toLocaleString('en-IN')}
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
