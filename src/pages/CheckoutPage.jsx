import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import { useCart } from '../context/CartContext';
import { DELIVERY_ADDRESSES, CHECKOUT_MAP_IMAGE } from '../data/products';

const PAYMENT_METHODS = [
  {
    id: 'upi',
    label: 'UPI (GPay, PhonePe, Paytm)',
    sublabel: 'Instant & Secure',
    icon: null,
    upiIcon: true,
  },
  {
    id: 'card',
    label: 'Credit / Debit Cards',
    sublabel: 'Visa, Mastercard, RuPay',
    icon: 'credit_card',
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    sublabel: 'Pay when material arrives',
    icon: 'payments',
  },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalQty, subtotal, deliveryFee, savings, total, placeOrder } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(DELIVERY_ADDRESSES[0].id);
  const [selectedPayment, setSelectedPayment] = useState('upi');

  const gst = Math.round(subtotal * 0.18);
  const checkoutTotal = subtotal + gst + (deliveryFee > 0 ? deliveryFee : 0);
  const addr = DELIVERY_ADDRESSES.find(a => a.id === selectedAddress);

  const handlePlaceOrder = () => {
    placeOrder(addr, selectedPayment);
    navigate('/tracking');
  };

  return (
    <div className="bg-surface font-work-sans text-on-surface min-h-screen">
      <Navbar title="Checkout" subtitle="Almost there!" />

      <main className="pt-20 pb-40 px-4 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: checkout journey */}
        <div className="lg:col-span-8 space-y-8 mt-4">
          {/* Step indicator */}
          <div className="flex items-center justify-between px-2">
            {['Address', 'Payment', 'Confirm'].map((step, idx) => {
              const active = idx === 1;
              const done = idx < 1;
              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm text-base ${
                        done
                          ? 'bg-primary-container text-on-primary-container'
                          : active
                          ? 'bg-indigo-950 text-white shadow-md'
                          : 'bg-surface-container-highest text-on-surface-variant'
                      }`}
                    >
                      {done ? <span className="material-symbols-outlined text-[18px]">check</span> : idx + 1}
                    </div>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        active ? 'text-indigo-950' : done ? 'text-on-surface' : 'text-on-surface-variant'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 -mt-6 ${done ? 'bg-primary-container' : 'bg-surface-container-highest'}`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Delivery Address */}
          <section className="bg-white rounded-xl shadow-[0_4px_20px_rgba(46,16,101,0.04)] overflow-hidden">
            <div className="p-6 border-b border-surface-container">
              <h2 className="font-epilogue font-bold text-xl text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-on-primary-container">pin_drop</span>
                Delivery Address
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Address list */}
              <div className="p-6 space-y-4">
                {DELIVERY_ADDRESSES.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => setSelectedAddress(a.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-colors relative ${
                      selectedAddress === a.id
                        ? 'border-primary-container bg-yellow-50'
                        : 'border-outline-variant hover:border-primary-container'
                    }`}
                  >
                    {selectedAddress === a.id && (
                      <span
                        className="absolute top-3 right-3 material-symbols-outlined text-on-primary-container text-[22px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    )}
                    <h4 className="font-work-sans font-bold text-on-surface text-sm">{a.label}</h4>
                    <p className="text-on-surface-variant text-xs mt-1">{a.address}</p>
                    <p className="text-on-surface-variant text-xs font-semibold mt-1">{a.phone}</p>
                  </div>
                ))}
                <button className="flex items-center gap-2 text-on-primary-container font-bold text-sm mt-1">
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  Add New Address
                </button>
              </div>

              {/* Map */}
              <div className="relative h-64 md:h-auto min-h-[200px] overflow-hidden">
                <img
                  src={CHECKOUT_MAP_IMAGE}
                  alt="Delivery map"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl flex items-center gap-3 shadow-lg">
                  <div className="bg-primary-container p-2 rounded-full">
                    <span className="material-symbols-outlined text-on-primary-container text-[18px]">
                      precision_manufacturing
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wide">
                      Current Drop Zone
                    </span>
                    <p className="text-sm font-bold text-on-surface">{addr?.dropZone}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Express delivery callout */}
          <section className="bg-yellow-50 border-2 border-primary-container rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary-container p-4 rounded-full shadow-inner">
                <span
                  className="material-symbols-outlined text-on-primary-container text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bolt
                </span>
              </div>
              <div>
                <h3 className="font-epilogue font-bold text-xl text-on-primary-container">
                  ⚡ Express Delivery
                </h3>
                <p className="text-on-primary-container/80 font-medium text-sm">
                  Guaranteed arrival in under 20 mins
                </p>
              </div>
            </div>
            <div className="bg-white px-4 py-2 rounded-full font-bold text-on-primary-container shadow-sm text-sm">
              Selected
            </div>
          </section>

          {/* Payment methods */}
          <section className="bg-white rounded-xl shadow-[0_4px_20px_rgba(46,16,101,0.04)] overflow-hidden">
            <div className="p-6 border-b border-surface-container">
              <h2 className="font-epilogue font-bold text-xl text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-on-primary-container">payments</span>
                Payment Method
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {PAYMENT_METHODS.map((pm) => (
                <div
                  key={pm.id}
                  onClick={() => setSelectedPayment(pm.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                    selectedPayment === pm.id
                      ? 'border-primary-container bg-yellow-50'
                      : 'border-surface-container hover:border-outline'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg border border-surface-container flex items-center justify-center p-2">
                      {pm.upiIcon ? (
                        <span className="font-epilogue font-black text-xs text-secondary">UPI</span>
                      ) : (
                        <span className="material-symbols-outlined text-on-surface-variant text-2xl">{pm.icon}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-work-sans font-bold text-on-surface text-sm">{pm.label}</h4>
                      <p className="text-xs text-on-surface-variant">{pm.sublabel}</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === pm.id ? 'border-on-primary-container' : 'border-surface-container'
                    }`}
                  >
                    {selectedPayment === pm.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-on-primary-container" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right: order summary */}
        <div className="lg:col-span-4">
          <aside className="sticky top-24 space-y-5">
            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-6">
              <h3 className="font-epilogue font-bold text-xl mb-6 pb-4 border-b border-surface-container">
                Order Summary
              </h3>

              {/* Item previews */}
              <div className="space-y-2 mb-4">
                {items.slice(0, 3).map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-on-surface truncate">{item.product.name}</p>
                      <p className="text-[11px] text-on-surface-variant">×{item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-on-surface">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
                {items.length > 3 && (
                  <p className="text-xs text-on-surface-variant text-center pt-1">
                    +{items.length - 3} more items
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-6 border-t pt-4">
                <div className="flex justify-between items-center text-on-surface-variant text-sm">
                  <span>Subtotal ({totalQty} items)</span>
                  <span className="font-semibold text-on-surface">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant text-sm">
                  <span>GST (18%)</span>
                  <span className="font-semibold text-on-surface">₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant text-sm">
                  <span>Delivery Fee</span>
                  <div className="flex items-center gap-2">
                    {deliveryFee > 0 ? (
                      <span className="font-semibold text-on-surface">₹{deliveryFee}</span>
                    ) : (
                      <>
                        <span className="line-through text-xs opacity-50">₹450</span>
                        <span className="text-tertiary font-bold">FREE</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end pt-4 border-t-2 border-dashed border-surface-container mb-6">
                <span className="font-work-sans font-bold text-base">Total Amount</span>
                <span className="font-epilogue font-bold text-3xl text-on-surface leading-none">
                  ₹{checkoutTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full py-5 bg-primary-container text-on-primary-container rounded-xl font-epilogue font-bold text-xl shadow-[0_10px_20px_-5px_rgba(255,215,0,0.4)] hover:shadow-lg active:scale-95 transition-all mb-4 flex items-center justify-center gap-3"
              >
                PLACE ORDER
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: 'verified_user', color: 'text-green-600', label: 'Secure Payments' },
                  { icon: 'verified', color: 'text-blue-600', label: 'Verified Suppliers' },
                ].map((badge) => (
                  <div key={badge.label} className="flex flex-col items-center p-3 bg-surface rounded-lg">
                    <span
                      className={`material-symbols-outlined ${badge.color} mb-1`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {badge.icon}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-on-surface-variant text-center leading-tight">
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gold tier note */}
            <div className="bg-indigo-950 text-white p-4 rounded-xl flex items-start gap-3">
              <span className="material-symbols-outlined text-yellow-400 flex-shrink-0">info</span>
              <p className="text-xs leading-relaxed">
                You've reached the{' '}
                <span className="text-yellow-400 font-bold">Gold Tier</span> bulk pricing for this
                order. Savings of ₹{savings.toLocaleString('en-IN')} applied.
              </p>
            </div>
          </aside>
        </div>
      </main>

      {/* Mobile CTA */}
      <div className="lg:hidden fixed bottom-[72px] left-0 w-full px-4 z-40">
        <button
          onClick={handlePlaceOrder}
          className="w-full py-4 bg-primary-container text-on-primary-container rounded-xl font-epilogue font-bold text-lg shadow-lg active:scale-95 transition-all"
        >
          PLACE ORDER · ₹{checkoutTotal.toLocaleString('en-IN')}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
