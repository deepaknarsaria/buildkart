import { useRole } from '../context/RoleContext';
import { USER_PROFILE_IMAGE } from '../data/products';
import { SUPPLIER_PROFILE_IMAGE, DELIVERY_PARTNER_PROFILE_IMAGE } from '../data/mockData';
import RoleSwitcher from './RoleSwitcher';

const ROLE_CONFIG = {
  user: {
    title: 'Select Delivery Site',
    subtitle: 'Jubilee Hills, Sector 4...',
    image: USER_PROFILE_IMAGE,
    iconStyle: 'text-yellow-400',
    squareBadge: false,
  },
  supplier: {
    title: 'Select Delivery Site',
    subtitle: 'Main Warehouse – BLR-01',
    image: SUPPLIER_PROFILE_IMAGE,
    iconStyle: 'text-on-primary-container',
    squareBadge: true,
  },
  delivery: {
    title: 'Select Delivery Site',
    subtitle: 'Active · On Route',
    image: DELIVERY_PARTNER_PROFILE_IMAGE,
    iconStyle: 'text-yellow-400',
    squareBadge: false,
  },
};

export default function Navbar() {
  const { currentRole } = useRole();
  const cfg = ROLE_CONFIG[currentRole] ?? ROLE_CONFIG.user;

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-16 bg-white border-b-2 border-slate-100 shadow-[0_4px_20px_rgba(46,16,101,0.04)]">
      {/* Left: location */}
      <div className="flex items-center gap-2 min-w-0">
        {cfg.squareBadge ? (
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-container text-on-primary-container flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">location_on</span>
          </div>
        ) : (
          <span className={`material-symbols-outlined flex-shrink-0 ${cfg.iconStyle}`}>location_on</span>
        )}
        <div className="flex flex-col min-w-0">
          <span className="font-epilogue font-bold tracking-tight text-indigo-950 text-sm leading-tight truncate">
            {cfg.title}
          </span>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-tight truncate">
            {cfg.subtitle}
          </span>
        </div>
      </div>

      {/* Right: role switcher + avatar */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <RoleSwitcher />
        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-yellow-400 flex-shrink-0">
          <img
            src={cfg.image}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.parentElement.innerHTML =
                '<div class="w-full h-full bg-indigo-950 flex items-center justify-center"><span class="material-symbols-outlined text-white text-sm">person</span></div>';
            }}
          />
        </div>
      </div>
    </header>
  );
}
