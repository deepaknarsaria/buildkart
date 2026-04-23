const STEPS = [
  { key: 'placed', label: 'Placed', icon: 'receipt_long' },
  { key: 'confirmed', label: 'Confirmed', icon: 'check_circle' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: 'local_shipping' },
  { key: 'delivered', label: 'Delivered', icon: 'inventory_2' },
];

const STATUS_ORDER = ['placed', 'confirmed', 'out_for_delivery', 'delivered'];

export default function OrderTracker({ status }) {
  const currentIdx = STATUS_ORDER.indexOf(status);

  const progressPercent = currentIdx <= 0 ? 0
    : currentIdx >= STATUS_ORDER.length - 1 ? 100
    : (currentIdx / (STATUS_ORDER.length - 1)) * 100;

  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(46,16,101,0.04)] border border-slate-100">
      <h3 className="font-epilogue font-bold text-[22px] mb-8 text-on-surface">Order Progress</h3>

      <div className="relative flex justify-between items-start">
        {/* Track background */}
        <div className="absolute top-5 left-0 w-full h-1 bg-surface-container-high z-0" />
        {/* Active track */}
        <div
          className="absolute top-5 left-0 h-1 bg-yellow-400 z-0 transition-all duration-700"
          style={{ width: `${progressPercent}%` }}
        />

        {STEPS.map((step, idx) => {
          const done = idx < currentIdx;
          const active = idx === currentIdx;
          const pending = idx > currentIdx;

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center gap-2 flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-500 ${
                  done
                    ? 'bg-yellow-400 text-indigo-950'
                    : active
                    ? 'bg-yellow-400 text-indigo-950 ring-4 ring-yellow-100'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {done ? (
                  <span className="material-symbols-outlined text-[20px]">check</span>
                ) : (
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {step.icon}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] font-work-sans font-semibold text-center leading-tight max-w-[60px] ${
                  pending ? 'text-on-surface-variant' : 'text-on-surface'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
