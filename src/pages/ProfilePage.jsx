import { useCart } from '../context/CartContext';
import { USER_PROFILE, ORDER_HISTORY } from '../data/mockData';
import { USER_PROFILE_IMAGE, DELIVERY_ADDRESSES } from '../data/products';
import BottomNav from '../components/BottomNav';
import Navbar from '../components/Navbar';

const STATUS_CONFIG = {
  delivered: { label: 'Delivered', bg: 'bg-green-100', text: 'text-green-700' },
  in_transit: { label: 'In Transit', bg: 'bg-blue-100', text: 'text-blue-700' },
  pending: { label: 'Pending', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  cancelled: { label: 'Cancelled', bg: 'bg-red-100', text: 'text-red-700' },
};

export default function ProfilePage() {
  const { order } = useCart();

  const formatAmount = (n) =>
    '₹' + n.toLocaleString('en-IN');

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Navbar />

      <div className="pt-16">
        {/* Profile Hero */}
        <div className="bg-indigo-950 px-4 pt-6 pb-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-400 flex-shrink-0">
              <img
                src={USER_PROFILE_IMAGE}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.parentElement.innerHTML =
                    '<div class="w-full h-full bg-primary-container flex items-center justify-center"><span class="material-symbols-outlined text-indigo-950 text-2xl">person</span></div>';
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-epilogue font-bold text-white text-lg leading-tight truncate">
                {USER_PROFILE.name}
              </h1>
              <p className="text-yellow-300 text-xs font-work-sans mt-0.5">{USER_PROFILE.role}</p>
              <p className="text-slate-400 text-xs font-work-sans truncate">{USER_PROFILE.company}</p>
            </div>
            <button className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-white text-[20px]">edit</span>
            </button>
          </div>

          {/* Stats Row */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: 'Total Orders', value: USER_PROFILE.totalOrders },
              { label: 'Total Spent', value: formatAmount(USER_PROFILE.totalSpent) },
              { label: 'Member Since', value: 'Jan 2024' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
                <p className="font-epilogue font-bold text-white text-base leading-tight">{s.value}</p>
                <p className="text-slate-400 text-[10px] font-work-sans uppercase tracking-wider mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pull-up card */}
        <div className="-mt-4 rounded-t-3xl bg-slate-50 pt-2">

          {/* Contact Info */}
          <section className="mx-4 mt-4 bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-slate-100">
              <h2 className="font-epilogue font-bold text-indigo-950 text-sm">Contact Information</h2>
            </div>
            {[
              { icon: 'phone', label: 'Phone', value: USER_PROFILE.phone },
              { icon: 'mail', label: 'Email', value: USER_PROFILE.email },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 last:border-0">
                <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-indigo-950 text-[18px]">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-slate-400 font-work-sans uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-work-sans font-bold text-on-surface truncate">{item.value}</p>
                </div>
                <button>
                  <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
                </button>
              </div>
            ))}
          </section>

          {/* Saved Addresses */}
          <section className="mx-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-epilogue font-bold text-indigo-950 text-sm">Saved Addresses</h2>
              <button className="flex items-center gap-1 text-xs font-bold text-yellow-600">
                <span className="material-symbols-outlined text-[14px]">add</span>
                Add New
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {DELIVERY_ADDRESSES.map((addr) => (
                <div
                  key={addr.id}
                  className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${
                    addr.isDefault ? 'border-yellow-400' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-indigo-950 text-[18px]">
                        {addr.type === 'Home' ? 'home' : 'location_city'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-work-sans font-bold text-sm text-on-surface">{addr.label}</p>
                        {addr.isDefault && (
                          <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-work-sans mt-0.5 leading-relaxed">{addr.address}</p>
                    </div>
                    <button>
                      <span className="material-symbols-outlined text-slate-400 text-[18px]">more_vert</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Order History */}
          <section className="mx-4 mt-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-epilogue font-bold text-indigo-950 text-sm">Order History</h2>
              <button className="text-xs font-bold text-yellow-600">View All</button>
            </div>
            <div className="flex flex-col gap-3">
              {/* Active order if present */}
              {order && (
                <div className="bg-indigo-950 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-yellow-400 text-[18px]">local_shipping</span>
                      <p className="font-epilogue font-bold text-white text-sm">#{order.id}</p>
                    </div>
                    <span className="bg-yellow-400 text-indigo-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Active
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs font-work-sans">Out for delivery · ETA {order.etaMinutes} min</p>
                </div>
              )}

              {ORDER_HISTORY.map((o) => {
                const sc = STATUS_CONFIG[o.status] ?? STATUS_CONFIG.pending;
                return (
                  <div key={o.id} className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-epilogue font-bold text-indigo-950 text-sm">#{o.id}</p>
                      <span className={`${sc.bg} ${sc.text} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide`}>
                        {sc.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-work-sans mb-2">{o.date}</p>
                    <p className="text-xs text-slate-600 font-work-sans truncate">
                      {o.items.join(' · ')}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                      <p className="font-epilogue font-bold text-indigo-950 text-sm">{formatAmount(o.total)}</p>
                      <button className="flex items-center gap-1 text-xs font-bold text-yellow-600">
                        Reorder
                        <span className="material-symbols-outlined text-[14px]">refresh</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Settings & Logout */}
          <section className="mx-4 mt-4 mb-4 bg-white rounded-2xl overflow-hidden shadow-sm">
            {[
              { icon: 'notifications', label: 'Notifications', sub: 'Order updates, offers' },
              { icon: 'help', label: 'Help & Support', sub: '24/7 support available' },
              { icon: 'security', label: 'Privacy & Security', sub: 'Manage your data' },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-slate-500 text-[18px]">{item.icon}</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-work-sans font-bold text-sm text-on-surface">{item.label}</p>
                  <p className="text-[10px] text-slate-400">{item.sub}</p>
                </div>
                <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
              </button>
            ))}
          </section>

          <div className="mx-4 mb-6">
            <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-red-100 bg-red-50 text-red-600">
              <span className="material-symbols-outlined text-[20px]">logout</span>
              <span className="font-work-sans font-bold text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
