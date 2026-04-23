import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useRole } from '../context/RoleContext';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = useCart();
  const { currentRole } = useRole();

  const TAB_CONFIG = {
    user: [
      { label: 'Home', icon: 'home', path: '/home' },
      { label: 'Orders', icon: 'package_2', path: order ? '/tracking' : '/cart' },
      { label: 'Profile', icon: 'person', path: '/profile' },
    ],
    supplier: [
      { label: 'Dashboard', icon: 'dashboard', path: '/supplier' },
      { label: 'Orders', icon: 'receipt_long', path: '/supplier' },
      { label: 'Profile', icon: 'person', path: '/profile' },
    ],
    delivery: [
      { label: 'Dashboard', icon: 'dashboard', path: '/delivery' },
      { label: 'Deliveries', icon: 'local_shipping', path: '/delivery' },
      { label: 'Profile', icon: 'person', path: '/profile' },
    ],
  };

  const tabs = TAB_CONFIG[currentRole] ?? TAB_CONFIG.user;

  const activeFor = (tab) => {
    if (currentRole === 'user' && tab.label === 'Orders') {
      return (
        location.pathname === '/cart' ||
        location.pathname === '/checkout' ||
        location.pathname === '/tracking'
      );
    }
    return location.pathname === tab.path;
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-white border-t-2 border-slate-100 shadow-[0_-4px_20px_rgba(46,16,101,0.06)] rounded-t-2xl">
      {tabs.map((tab) => {
        const active = activeFor(tab);
        return (
          <button
            key={tab.label}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center justify-center px-5 py-1.5 rounded-lg transition-transform active:scale-90 ${
              active ? 'bg-yellow-400 text-indigo-950' : 'text-slate-400 hover:text-yellow-500'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">{tab.icon}</span>
            <span className="font-epilogue text-[11px] font-bold uppercase tracking-wider mt-0.5">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
