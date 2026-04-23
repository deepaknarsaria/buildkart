import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole, ROLES } from '../context/RoleContext';

export default function RoleSwitcher() {
  const { currentRole, setCurrentRole } = useRole();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (roleId) => {
    setCurrentRole(roleId);
    setOpen(false);
    navigate(ROLES[roleId].homePath);
  };

  const role = ROLES[currentRole];
  const roleBg = currentRole === 'user' ? 'bg-indigo-950' : currentRole === 'supplier' ? 'bg-secondary' : 'bg-tertiary';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className={`flex items-center gap-1.5 ${roleBg} text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide transition-all active:scale-95`}
      >
        <span className="material-symbols-outlined text-[14px]">{role.icon}</span>
        <span>{role.label}</span>
        <span className="material-symbols-outlined text-[14px]">{open ? 'expand_less' : 'expand_more'}</span>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-[60] min-w-[180px]">
          <div className="px-4 pt-3 pb-2 border-b border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Switch Role</p>
          </div>
          {Object.values(ROLES).map((r) => {
            const active = r.id === currentRole;
            const bg = r.id === 'user' ? 'bg-indigo-950' : r.id === 'supplier' ? 'bg-secondary' : 'bg-tertiary';
            return (
              <button
                key={r.id}
                onClick={() => handleSelect(r.id)}
                className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-slate-50 transition-colors ${active ? 'bg-slate-50' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                  <span className="material-symbols-outlined text-white text-[16px]">{r.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-work-sans font-bold text-sm text-on-surface">{r.label}</p>
                  <p className="text-[10px] text-slate-400">
                    {r.id === 'user' ? 'Customer view' : r.id === 'supplier' ? 'Manage inventory' : 'Manage deliveries'}
                  </p>
                </div>
                {active && (
                  <span className="material-symbols-outlined text-green-500 text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
