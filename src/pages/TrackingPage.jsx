import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';
import OrderTracker from '../components/OrderTracker';
import { useCart } from '../context/CartContext';
import { TRACKING_MAP_IMAGE } from '../data/products';

const STATUS_MESSAGES = {
  placed: 'Order Placed',
  confirmed: 'Order Confirmed',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered!',
};

export default function TrackingPage() {
  const navigate = useNavigate();
  const { order, updateOrderStatus, updateEta } = useCart();
  const [eta, setEta] = useState(order?.etaMinutes ?? 15);

  // Progress order status automatically for demo
  useEffect(() => {
    if (!order) return;

    if (order.status === 'placed') {
      const t = setTimeout(() => updateOrderStatus('confirmed'), 2500);
      return () => clearTimeout(t);
    }
    if (order.status === 'confirmed') {
      const t = setTimeout(() => updateOrderStatus('out_for_delivery'), 6000);
      return () => clearTimeout(t);
    }
  }, [order?.status]);

  // Countdown ETA (1 min per 4 seconds for demo)
  useEffect(() => {
    if (order?.status !== 'out_for_delivery' && order?.status !== 'delivered') return;
    if (eta <= 0) {
      updateOrderStatus('delivered');
      return;
    }
    const t = setInterval(() => {
      setEta(prev => {
        const next = prev - 1;
        updateEta(next);
        if (next <= 0) {
          updateOrderStatus('delivered');
          clearInterval(t);
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(t);
  }, [order?.status]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-8">
        <span className="material-symbols-outlined text-7xl text-slate-200 mb-4">local_shipping</span>
        <h3 className="font-epilogue font-bold text-xl text-indigo-950 mb-2">No active orders</h3>
        <p className="text-slate-500 mb-6">Place an order to track it here</p>
        <button
          onClick={() => navigate('/home')}
          className="bg-yellow-400 text-indigo-950 font-bold px-8 py-3 rounded-xl active:scale-95 transition-all"
        >
          Shop Now
        </button>
      </div>
    );
  }

  const isDelivered = order.status === 'delivered';
  const currentStatusMsg = STATUS_MESSAGES[order.status] ?? 'Processing';

  return (
    <div className="bg-background min-h-screen font-work-sans text-on-surface">
      <Navbar title="Order Tracking" subtitle={`#${order.id}`} />

      <main className="pt-16 pb-24 max-w-[1200px] mx-auto">
        {/* Hero status */}
        <section className="px-4 py-4">
          <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(46,16,101,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-outline-variant/20">
            <div>
              <span className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-widest">
                Order ID: #{order.id}
              </span>
              {isDelivered ? (
                <h1 className="font-epilogue font-bold text-2xl text-green-600 mt-1">
                  ✓ Delivered Successfully!
                </h1>
              ) : (
                <h1 className="font-epilogue font-bold text-2xl text-on-surface mt-1">
                  {order.status === 'out_for_delivery'
                    ? `Arriving in ${eta} min${eta !== 1 ? 's' : ''}`
                    : currentStatusMsg}
                </h1>
              )}
              <p className="text-sm text-on-surface-variant mt-0.5">{currentStatusMsg}</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-primary-container text-on-primary-container px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[18px]">call</span>
                Call Courier
              </button>
              <button className="bg-surface-container-high text-on-surface px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Message
              </button>
            </div>
          </div>
        </section>

        {/* Main dashboard */}
        <section className="px-4 grid grid-cols-1 md:grid-cols-12 gap-4 py-2">
          {/* Map + Progress */}
          <div className="md:col-span-8 flex flex-col gap-4">
            {/* Live Map */}
            <div className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(46,16,101,0.04)] relative h-[360px] md:h-[420px]">
              {/* Live badge */}
              <div className="absolute top-4 left-4 z-10 bg-tertiary text-white px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                </span>
                <span className="font-bold text-xs">Live Tracking</span>
              </div>

              {/* Map image */}
              <img
                src={TRACKING_MAP_IMAGE}
                alt="Live map"
                className="w-full h-full object-cover grayscale opacity-60"
                style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
              />

              {/* Truck icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className={`bg-secondary p-2.5 rounded-full shadow-xl transition-all ${order.status === 'out_for_delivery' ? 'animate-bounce' : ''}`}>
                    <span
                      className="material-symbols-outlined text-white text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      local_shipping
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-yellow-400 w-4 h-4 rounded-full border-2 border-white" />
                </div>
              </div>

              {/* Destination pin */}
              <div className="absolute top-1/4 right-1/3">
                <div className="bg-on-surface p-2 rounded-full shadow-xl">
                  <span className="material-symbols-outlined text-white text-[18px]">home_pin</span>
                </div>
              </div>

              {/* ETA badge */}
              <div className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-2xl border border-slate-100 flex items-center gap-4">
                <div className="bg-primary-container p-2.5 rounded-lg">
                  <span className="material-symbols-outlined text-on-primary-container">timer</span>
                </div>
                <div>
                  <p className="text-on-surface-variant text-[11px] font-bold uppercase tracking-wide">
                    {isDelivered ? 'Delivered at' : 'Est. Arrival'}
                  </p>
                  <p className="font-epilogue font-bold text-xl text-on-surface leading-tight">
                    {isDelivered
                      ? new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                      : `${eta} min${eta !== 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Progress */}
            <OrderTracker status={order.status} />
          </div>

          {/* Side info */}
          <div className="md:col-span-4 flex flex-col gap-4">
            {/* Courier card */}
            <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(46,16,101,0.04)] border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary/20 flex-shrink-0">
                  <img
                    src={order.courier?.image}
                    alt={order.courier?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.parentElement.classList.add('bg-slate-200', 'flex', 'items-center', 'justify-center');
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-work-sans font-bold text-on-surface text-base">
                    {order.courier?.name ?? 'Your Courier'}
                  </h4>
                  <div className="flex items-center gap-1 text-yellow-500 mt-0.5">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="font-bold text-sm">{order.courier?.rating}</span>
                    <span className="text-on-surface-variant text-xs ml-1">
                      ({order.courier?.reviews} orders)
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="text-center flex-1">
                  <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wide">Vehicle</p>
                  <p className="font-work-sans font-bold text-on-surface text-sm">{order.courier?.vehicle}</p>
                </div>
                <div className="w-px h-8 bg-slate-100" />
                <div className="text-center flex-1">
                  <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wide">Plate</p>
                  <p className="font-work-sans font-bold text-on-surface text-sm">{order.courier?.plate}</p>
                </div>
              </div>
            </div>

            {/* Order items */}
            <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(46,16,101,0.04)] border border-slate-100">
              <h3 className="font-epilogue font-bold text-xl mb-4 text-on-surface">Order Items</h3>
              <div className="flex flex-col gap-2">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-epilogue font-bold text-on-primary-container text-sm">
                        {String(item.quantity).padStart(2, '0')}×
                      </span>
                      <span className="font-work-sans font-semibold text-on-surface text-sm">
                        {item.product.shortName ?? item.product.name}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                      chevron_right
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t-2 border-dashed border-slate-100 flex justify-between items-center">
                <span className="text-on-surface-variant font-bold text-sm">Total (incl. tax)</span>
                <span className="font-epilogue font-bold text-xl text-on-surface">
                  ₹{order.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Delivery address */}
            <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(46,16,101,0.04)] border border-slate-100">
              <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wide mb-2">
                Delivering To
              </p>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-on-primary-container flex-shrink-0">business</span>
                <div>
                  <p className="font-work-sans font-bold text-on-surface text-sm">
                    {order.address?.label ?? 'Site Alpha'}
                  </p>
                  <p className="text-on-surface-variant text-xs mt-0.5">
                    {order.address?.address ?? '452 Industrial Estate, Gurugram'}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivered CTA */}
            {isDelivered && (
              <button
                onClick={() => navigate('/home')}
                className="w-full py-4 bg-yellow-400 text-indigo-950 font-epilogue font-bold text-lg rounded-xl active:scale-95 transition-all shadow-lg"
              >
                Shop Again
              </button>
            )}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
