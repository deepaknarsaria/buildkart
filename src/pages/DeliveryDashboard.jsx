import { useState } from 'react';
import { DELIVERY_EARNINGS, DELIVERY_ASSIGNMENTS, DELIVERY_ROUTE_MAP } from '../data/mockData';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

const STATUS_STYLES = {
  active: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Active' },
  pending: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Pending' },
  completed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Completed' },
};

export default function DeliveryDashboard() {
  const [assignments, setAssignments] = useState(DELIVERY_ASSIGNMENTS);
  const [markedIds, setMarkedIds] = useState(new Set());

  const markDelivered = (id) => {
    setMarkedIds((prev) => new Set([...prev, id]));
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'completed' } : a))
    );
  };

  const activeDelivery = assignments.find((a) => a.status === 'active');
  const weeklyPct = Math.round((DELIVERY_EARNINGS.weeklyCompleted / DELIVERY_EARNINGS.weeklyGoal) * 100);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Navbar />

      <div className="pt-16">
        {/* Earnings Hero — dark card */}
        <div className="bg-indigo-950 px-4 pt-6 pb-10">
          <p className="text-[10px] text-slate-400 font-work-sans uppercase tracking-widest mb-1">Today's Earnings</p>
          <p className="font-epilogue font-bold text-white text-4xl leading-none">
            ₹{DELIVERY_EARNINGS.today.toLocaleString('en-IN')}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: 'Completed', value: DELIVERY_EARNINGS.completedOrders, icon: 'task_alt' },
              { label: 'Avg Time', value: `${DELIVERY_EARNINGS.avgTimeMinutes}m`, icon: 'timer' },
              { label: 'Rating', value: DELIVERY_EARNINGS.rating, icon: 'star' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
                <span className="material-symbols-outlined text-yellow-400 text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                <p className="font-epilogue font-bold text-white text-lg leading-tight mt-1">{s.value}</p>
                <p className="text-slate-400 text-[10px] font-work-sans uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Weekly Goal Progress */}
          <div className="mt-4 bg-white/10 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white text-xs font-work-sans font-bold">Weekly Goal</p>
              <p className="text-yellow-400 text-xs font-epilogue font-bold">
                {DELIVERY_EARNINGS.weeklyCompleted}/{DELIVERY_EARNINGS.weeklyGoal} orders
              </p>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all"
                style={{ width: `${weeklyPct}%` }}
              />
            </div>
            <p className="text-slate-400 text-[10px] font-work-sans mt-1">{weeklyPct}% of weekly target</p>
          </div>
        </div>

        {/* Pull-up section */}
        <div className="-mt-4 rounded-t-3xl bg-slate-50 pt-4 px-4">

          {/* Active Delivery Card */}
          {activeDelivery && (
            <section className="mb-5">
              <h2 className="font-epilogue font-bold text-indigo-950 text-base mb-3">Active Delivery</h2>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                {/* Map */}
                <div className="h-36 bg-slate-100 relative overflow-hidden">
                  <img
                    src={DELIVERY_ROUTE_MAP}
                    alt="Route Map"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-indigo-950/90 rounded-lg px-2 py-1">
                    <span className="material-symbols-outlined text-yellow-400 text-[14px]">local_shipping</span>
                    <span className="text-white text-[10px] font-bold">ETA {activeDelivery.eta} min</span>
                  </div>
                </div>

                <div className="p-4">
                  {/* Route */}
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0" />
                      <div className="w-0.5 flex-1 bg-slate-200 my-1" style={{ minHeight: 24 }} />
                      <div className="w-3 h-3 rounded-full bg-indigo-950 flex-shrink-0" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between gap-3">
                      <div>
                        <p className="text-[10px] text-green-600 font-bold uppercase tracking-wide">Pickup</p>
                        <p className="font-work-sans font-bold text-sm text-on-surface">{activeDelivery.pickup.name}</p>
                        <p className="text-[10px] text-slate-400 font-work-sans">{activeDelivery.pickup.address}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wide">Dropoff</p>
                        <p className="font-work-sans font-bold text-sm text-on-surface">{activeDelivery.dropoff.name}</p>
                        <p className="text-[10px] text-slate-400 font-work-sans">{activeDelivery.dropoff.address}</p>
                      </div>
                    </div>
                  </div>

                  {/* Item Info */}
                  <div className="mt-3 bg-slate-50 rounded-xl px-3 py-2.5 flex items-center justify-between">
                    <div>
                      <p className="font-work-sans font-bold text-sm text-on-surface">{activeDelivery.item.name}</p>
                      <p className="text-[10px] text-slate-400 font-work-sans">{activeDelivery.item.qty} · {activeDelivery.item.weight}</p>
                    </div>
                    <p className="font-epilogue font-bold text-indigo-950 text-base">₹{activeDelivery.fare}</p>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 text-xs font-bold active:scale-95 transition-transform">
                      <span className="material-symbols-outlined text-[18px]">support_agent</span>
                      Support
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 text-xs font-bold active:scale-95 transition-transform">
                      <span className="material-symbols-outlined text-[18px]">report_problem</span>
                      Report Issue
                    </button>
                    <button
                      onClick={() => markDelivered(activeDelivery.id)}
                      className="flex-[2] flex items-center justify-center gap-1.5 py-3 rounded-xl bg-indigo-950 text-white text-xs font-bold active:scale-95 transition-transform"
                    >
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      Mark Delivered
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* All Assignments */}
          <section className="mb-6">
            <h2 className="font-epilogue font-bold text-indigo-950 text-base mb-3">All Assignments</h2>
            <div className="flex flex-col gap-3">
              {assignments.map((a) => {
                const sc = STATUS_STYLES[a.status] ?? STATUS_STYLES.pending;
                return (
                  <div
                    key={a.id}
                    className={`bg-white rounded-2xl p-4 shadow-sm ${a.status === 'completed' ? 'opacity-70' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-epilogue font-bold text-indigo-950 text-sm">{a.id}</p>
                      <span className={`${sc.bg} ${sc.text} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide`}>
                        {sc.label}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <div className="flex flex-col items-center pt-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0" />
                        <div className="w-px flex-1 bg-slate-200 my-1" style={{ minHeight: 20 }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between gap-2">
                        <div>
                          <p className="text-xs font-work-sans font-bold text-on-surface truncate">{a.pickup.name}</p>
                          <p className="text-[10px] text-slate-400 font-work-sans truncate">{a.pickup.address}</p>
                        </div>
                        <div>
                          <p className="text-xs font-work-sans font-bold text-on-surface truncate">{a.dropoff.name}</p>
                          <p className="text-[10px] text-slate-400 font-work-sans truncate">{a.dropoff.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-[16px]">inventory_2</span>
                        <p className="text-xs text-slate-500 font-work-sans">{a.item.name}</p>
                      </div>
                      <p className="font-epilogue font-bold text-indigo-950 text-sm">₹{a.fare}</p>
                    </div>

                    {a.status === 'pending' && !markedIds.has(a.id) && (
                      <button
                        onClick={() => markDelivered(a.id)}
                        className="mt-3 w-full py-2.5 rounded-xl bg-indigo-950 text-white text-xs font-bold active:scale-95 transition-transform"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Performance Insights */}
          <section className="mb-6">
            <h2 className="font-epilogue font-bold text-indigo-950 text-base mb-3">Performance Insights</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'On-Time Rate', value: '97%', icon: 'schedule', color: 'bg-green-100 text-green-700' },
                { label: 'Acceptance Rate', value: '89%', icon: 'thumb_up', color: 'bg-blue-100 text-blue-700' },
                { label: 'Avg Distance', value: '8.4 km', icon: 'route', color: 'bg-purple-100 text-purple-700' },
                { label: 'Customer Score', value: '4.9★', icon: 'star', color: 'bg-yellow-100 text-yellow-700' },
              ].map((m) => (
                <div key={m.label} className="bg-white rounded-2xl p-4 shadow-sm">
                  <span className={`inline-flex w-8 h-8 rounded-lg items-center justify-center ${m.color} mb-2`}>
                    <span className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}>{m.icon}</span>
                  </span>
                  <p className="font-epilogue font-bold text-indigo-950 text-lg">{m.value}</p>
                  <p className="text-[10px] text-slate-400 font-work-sans uppercase tracking-wide">{m.label}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      <BottomNav />
    </div>
  );
}
