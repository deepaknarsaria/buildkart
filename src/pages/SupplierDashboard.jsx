import { useState } from 'react';
import {
  SUPPLIER_STATS,
  SUPPLIER_INCOMING_ORDERS,
  SUPPLIER_INVENTORY,
  SUPPLIER_INVENTORY_IMAGES,
} from '../data/mockData';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

const UNITS = ['bag', 'ton', 'unit', 'bucket', 'box', 'litre', 'kg', 'meter'];
const CATEGORIES = [
  { label: 'Cement', icon: 'inventory_2', image: SUPPLIER_INVENTORY_IMAGES.cement },
  { label: 'Steel', icon: 'construction', image: SUPPLIER_INVENTORY_IMAGES.steel },
  { label: 'Bricks', icon: 'home_work', image: SUPPLIER_INVENTORY_IMAGES.bricks },
  { label: 'Paint', icon: 'format_paint', image: SUPPLIER_INVENTORY_IMAGES.cement },
  { label: 'Other', icon: 'category', image: SUPPLIER_INVENTORY_IMAGES.cement },
];

const EMPTY_FORM = { name: '', price: '', unit: 'bag', category: 'Cement', inStock: true };

function AddProductModal({ onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = () => {
    if (!form.name.trim()) { setError('Product name is required.'); return; }
    if (!form.price || isNaN(parseFloat(form.price)) || parseFloat(form.price) <= 0) {
      setError('Enter a valid price.'); return;
    }
    const cat = CATEGORIES.find((c) => c.label === form.category);
    onAdd({
      id: 'si' + Date.now(),
      name: form.name.trim(),
      price: parseFloat(form.price),
      unit: form.unit,
      inStock: form.inStock,
      image: cat?.image ?? SUPPLIER_INVENTORY_IMAGES.cement,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Sheet */}
      <div
        className="relative w-full max-w-lg bg-white rounded-t-3xl px-4 pt-5 pb-8 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-5" />

        <div className="flex items-center justify-between mb-5">
          <h2 className="font-epilogue font-bold text-indigo-950 text-lg">Add New Product</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-500 text-[18px]">close</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500 text-[16px]">error</span>
            <p className="text-red-600 text-xs font-work-sans">{error}</p>
          </div>
        )}

        {/* Category picker */}
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Category</p>
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.label}
              onClick={() => set('category', c.label)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl border-2 transition-colors ${
                form.category === c.label
                  ? 'border-indigo-950 bg-primary-container'
                  : 'border-slate-100 bg-white'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${form.category === c.label ? 'text-indigo-950' : 'text-slate-400'}`}>
                {c.icon}
              </span>
              <span className={`text-[10px] font-bold ${form.category === c.label ? 'text-indigo-950' : 'text-slate-400'}`}>
                {c.label}
              </span>
            </button>
          ))}
        </div>

        {/* Product Name */}
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Product Name</p>
        <input
          type="text"
          value={form.name}
          onChange={(e) => { set('name', e.target.value); setError(''); }}
          placeholder="e.g. UltraTech OPC 53 Grade"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm font-work-sans text-on-surface outline-none focus:border-indigo-400 mb-4"
        />

        {/* Price + Unit row */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Price (₹)</p>
            <input
              type="number"
              value={form.price}
              onChange={(e) => { set('price', e.target.value); setError(''); }}
              placeholder="0"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm font-work-sans text-on-surface outline-none focus:border-indigo-400"
            />
          </div>
          <div className="w-32">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Unit</p>
            <select
              value={form.unit}
              onChange={(e) => set('unit', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm font-work-sans text-on-surface outline-none focus:border-indigo-400"
            >
              {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        {/* In Stock toggle */}
        <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 mb-6">
          <div>
            <p className="font-work-sans font-bold text-sm text-on-surface">Available in Stock</p>
            <p className="text-[10px] text-slate-400">Mark as in-stock on listing</p>
          </div>
          <button
            onClick={() => set('inStock', !form.inStock)}
            className={`w-11 h-6 rounded-full transition-colors relative ${form.inStock ? 'bg-green-500' : 'bg-slate-300'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.inStock ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-2xl bg-indigo-950 text-white font-epilogue font-bold text-sm active:scale-95 transition-transform"
        >
          Add to Inventory
        </button>
      </div>
    </div>
  );
}

const PAYMENT_ICON = { 'Cash on delivery': 'payments', Prepaid: 'verified', UPI: 'account_balance_wallet', Card: 'credit_card' };

function StatCard({ label, value, icon, accent, sub }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex-1">
      <div className={`w-9 h-9 rounded-xl ${accent} flex items-center justify-center mb-3`}>
        <span className="material-symbols-outlined text-[20px] text-white">{icon}</span>
      </div>
      <p className="font-epilogue font-bold text-indigo-950 text-lg leading-tight">{value}</p>
      {sub && <p className="text-[10px] font-bold text-green-600 uppercase tracking-wide">{sub}</p>}
      <p className="text-[10px] text-slate-400 font-work-sans uppercase tracking-wider mt-0.5">{label}</p>
    </div>
  );
}

export default function SupplierDashboard() {
  const [orders, setOrders] = useState(SUPPLIER_INCOMING_ORDERS);
  const [inventory, setInventory] = useState(SUPPLIER_INVENTORY);
  const [acceptedIds, setAcceptedIds] = useState(new Set());
  const [rejectedIds, setRejectedIds] = useState(new Set());
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddProduct = (product) => {
    setInventory((prev) => [product, ...prev]);
  };

  const accept = (id) => {
    setAcceptedIds((prev) => new Set([...prev, id]));
    setRejectedIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
  };

  const reject = (id) => {
    setRejectedIds((prev) => new Set([...prev, id]));
    setAcceptedIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
  };

  const toggleStock = (id) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, inStock: !item.inStock } : item))
    );
  };

  const updatePrice = (id, val) => {
    const n = parseFloat(val);
    if (isNaN(n)) return;
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, price: n } : item))
    );
  };

  const fmt = (n) => '₹' + n.toLocaleString('en-IN');

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} onAdd={handleAddProduct} />
      )}
      <Navbar />

      <div className="pt-16 px-4">

        {/* Dashboard Header */}
        <div className="py-4">
          <p className="text-[10px] text-slate-400 font-work-sans uppercase tracking-widest">Good Morning</p>
          <h1 className="font-epilogue font-bold text-indigo-950 text-xl leading-tight">Supplier Dashboard</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard
            label="Today's Revenue"
            value={fmt(SUPPLIER_STATS.todayRevenue)}
            sub={SUPPLIER_STATS.revenueChange}
            icon="trending_up"
            accent="bg-indigo-950"
          />
          <StatCard
            label="Active Orders"
            value={`${SUPPLIER_STATS.activeOrders}`}
            sub={`${SUPPLIER_STATS.urgentOrders} urgent`}
            icon="package_2"
            accent="bg-secondary"
          />
          <StatCard
            label="Warehouse Capacity"
            value={`${SUPPLIER_STATS.capacityUsed}%`}
            icon="warehouse"
            accent="bg-tertiary"
          />
          <StatCard
            label="Pending Payout"
            value={fmt(SUPPLIER_STATS.pendingPayout)}
            icon="account_balance"
            accent="bg-green-600"
          />
        </div>

        {/* Incoming Orders */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-epilogue font-bold text-indigo-950 text-base">Incoming Orders</h2>
            <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              {orders.filter((o) => o.urgent).length} urgent
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {orders.map((order) => {
              const accepted = acceptedIds.has(order.id);
              const rejected = rejectedIds.has(order.id);
              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm border-l-4 ${
                    order.urgent ? 'border-red-400' : 'border-transparent'
                  }`}
                >
                  {order.urgent && (
                    <div className="bg-red-50 px-4 py-1.5 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-red-500 text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}>priority_high</span>
                      <p className="text-[10px] font-bold text-red-600 uppercase tracking-wide">Urgent Order</p>
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-indigo-950 text-[22px]">{order.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-epilogue font-bold text-indigo-950 text-sm">{order.id}</p>
                          <span className="text-[10px] text-slate-400 font-work-sans">·</span>
                          <span className="text-[10px] text-slate-400 font-work-sans">{order.eta}</span>
                        </div>
                        <p className="text-xs text-slate-600 font-work-sans mt-0.5 leading-relaxed">{order.description}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="material-symbols-outlined text-slate-400 text-[12px]">location_on</span>
                          <p className="text-[10px] text-slate-400 font-work-sans truncate">{order.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                      <div>
                        <p className="font-epilogue font-bold text-indigo-950 text-base">{fmt(order.amount)}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-slate-400 text-[12px]">
                            {PAYMENT_ICON[order.payment] ?? 'payments'}
                          </span>
                          <p className="text-[10px] text-slate-400 font-work-sans">{order.payment}</p>
                        </div>
                      </div>

                      {accepted ? (
                        <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-2 rounded-xl">
                          <span className="material-symbols-outlined text-[16px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          <span className="text-xs font-bold">Accepted</span>
                        </div>
                      ) : rejected ? (
                        <div className="flex items-center gap-1.5 bg-red-100 text-red-600 px-3 py-2 rounded-xl">
                          <span className="material-symbols-outlined text-[16px]">cancel</span>
                          <span className="text-xs font-bold">Rejected</span>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => reject(order.id)}
                            className="px-3 py-2 rounded-xl border-2 border-slate-200 text-slate-500 text-xs font-bold active:scale-95 transition-transform"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => accept(order.id)}
                            className="px-3 py-2 rounded-xl bg-indigo-950 text-white text-xs font-bold active:scale-95 transition-transform"
                          >
                            Accept
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Inventory Management */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-epilogue font-bold text-indigo-950 text-base">Inventory</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1 bg-indigo-950 text-white px-3 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[14px]">add</span>
              Add Product
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {inventory.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="flex items-center gap-3 p-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.parentElement.innerHTML =
                          '<div class="w-full h-full flex items-center justify-center"><span class="material-symbols-outlined text-slate-400 text-2xl">inventory_2</span></div>';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-work-sans font-bold text-sm text-on-surface truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wide">per {item.unit}</p>
                    <div className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.inStock ? 'bg-green-500' : 'bg-red-400'}`} />
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleStock(item.id)}
                    className={`w-11 h-6 rounded-full transition-colors flex-shrink-0 relative ${
                      item.inStock ? 'bg-green-500' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        item.inStock ? 'translate-x-[22px]' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Price Editor */}
                <div className="mx-4 mb-4 flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2">
                  <p className="text-[10px] text-slate-400 font-work-sans uppercase tracking-wide">Price</p>
                  <div className="flex items-center gap-1">
                    <span className="font-epilogue font-bold text-indigo-950 text-sm">₹</span>
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => updatePrice(item.id, e.target.value)}
                      className="w-20 bg-transparent font-epilogue font-bold text-indigo-950 text-sm text-right outline-none"
                    />
                    <span className="text-slate-400 text-[10px] font-work-sans">/{item.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <BottomNav />
    </div>
  );
}
