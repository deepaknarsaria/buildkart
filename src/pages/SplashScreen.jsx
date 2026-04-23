import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/home'), 2600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#2c0050] p-4 overflow-hidden">
      {/* Glowing blobs */}
      <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-secondary opacity-20 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary-container opacity-10 blur-[150px] pointer-events-none" />

      {/* Tech grid overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#7b41b3" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
        {/* Logo icon */}
        <div className="mb-10 p-6 bg-primary-container rounded-3xl shadow-[0_20px_50px_rgba(112,93,0,0.3)] flex items-center justify-center hover:scale-105 transition-transform duration-500">
          <span
            className="material-symbols-outlined text-[64px] text-[#2c0050]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48" }}
          >
            construction
          </span>
        </div>

        {/* Branding */}
        <div className="mb-16 space-y-3">
          <h1 className="font-epilogue text-[56px] font-black text-primary-container tracking-tighter leading-none">
            BuildFast
          </h1>
          <p className="text-secondary-fixed-dim uppercase tracking-widest font-semibold text-sm">
            Materials in minutes
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-full px-8 space-y-4">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary-container rounded-full splash-progress shimmer shadow-[0_0_15px_rgba(255,215,0,0.4)]" />
          </div>
          <div className="flex items-center justify-center gap-2 text-secondary-fixed-dim">
            <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            <span className="text-sm font-semibold">Initializing dispatch...</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 w-full text-center">
        <p className="text-secondary-fixed-dim/40 text-[10px] uppercase tracking-widest font-bold">
          Contractor Grade Infrastructure
        </p>
      </div>
    </div>
  );
}
