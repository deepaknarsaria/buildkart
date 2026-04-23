// ─── Supplier ────────────────────────────────────────────────────────────────

export const SUPPLIER_PROFILE_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCA5HaXVX2unkNVxs4A6mwOZCNAE7GjlDrcs9fq-zEdc-G0ndakC9jraHZrRSUT8Guh2ZjBJI9FNbsceOVt0wWqnDpwfnuTRtoTix_QDrGjw9JGXGQTe9dnTc-MS66XjB9Wtk3GwlZ8cYUKBD-1ffU3XTbKT4_DWTf_UxT3GX4r0QzosQRP8wXsyF_MY11Z93rT93Eutf6yhVIQyBk5eoQtKR129fFByrIq_r355K0n8PDfb7DAfFuNmfv4ISo8YvdRES4s0StYSwbP';

export const DELIVERY_PARTNER_PROFILE_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAOCrwBkEcL-E4MRoLRXypxIA7dxX6bg64QAOCqoo_RVq2xntyQ4bdbuiTV2c4_ruY6HhwRPs6D7aTyazmWoqFMmmwFtAHocolWL_2RuZdV0D2KAGIJbVI6MSp1M2mBA_JLZsSO9FXa4RB3bc0faXL9SKUWDcSpkzHdRWcs70ka3w2YijNiiWYO8cAjcex9Dw1DiwDG725AawWOVIivSYRsBT2e73KYBzqQZBafVnJrNudLQMmegWxKsTdS2-nz0vq7jkavjCSozsDo';

export const DELIVERY_ROUTE_MAP =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB9ZxLZf8iGEZocuxgok8t5zkZfD2NNKeO7mBXoxNWVQLsWiw_AtdVusQZDAq4D6BeZfyHB0sv2KBar43eT-wSVZnCBq1MjGFmbW2k-L0WkU_-1abdViZ0ncrc5ocvneJi78M3qsjdeJDS7C7595FpOS_SWptKZJ7nv334T-Fo87fLWDmPKDmVpZGD-MKXOiqQVZnSlxXmrqp-vJ7VguN4kO_wXfsw_12rx6hjaIqJ6lfgunTr5Bs3_bDs7BfLeR5WOdmnwMXxJ1vb2';

export const SUPPLIER_INVENTORY_IMAGES = {
  cement:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCrbVwQL3_LhtB4AnEFNMu4QOGvsSZBhvzxTtMsSIFEdz6n09Tm_vra7dc9wURpKoDdiLZGuLnVu4Xgp9QWNfC1cH9QqslsTPVcQlkclwVFrx3w69DOkbcHRV9Rwv3D84REt4gP75v7hOYgYRXslTrgv86OtKSsZWpXUtTOKNcYkW9yzJ1xjjdW8Pyi4XSCT0u3eguPKXR8IXaDw7L62BddfM4AIU0vUKr4MS0q4OWSjYLeWZxa40ize2iyltvY_q-gHqYx3HChB4aC',
  steel:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCguzwhHZifrFZi6L7Hjl7imgV6khdDT_zCbpIU1oUm_cY0mVNZcD8zq92EvLpKT2DZYZfM1qMYpyfO7-ZrnCjjI35G9omnRT7VpY3Ec-YJtz_MFfoazUi4YkQhm69yHQxXhJt2LJhAJZW9NVfdQBcqkNAEyzNqik_gI5qr6M_DLMDXwtLBJKniL79iXBz7BLArXRPt6xEZQiVRwh93Mb17fhtNOC_YtTaQh0JlpW8_9OT6-JYFyOVJngovkvGtiFp1EeV015DC6lRW',
  bricks:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDQdNAHOb3zCqd1vMmazzXh9Q13F41TnSwW3NEeDqTDx9M5vJtmeQZa4OQr4pi9p6ct-3l0351OPr39Nfsb6IAqPUhVrFsWaqeoPQfuQttIjXwNf__28eBG1h_cr0sY3tFnSregi4_RBkSY2JxLFpb8-z0MEU8MfGobfM9QCquRKhjmTn9kc46YNmYnpxoAQkLeO6ZgqyTOR4UWJEDb0ncDt8qDk_PnpZWeZAybtGDlYoHh6bMvJjAY-8m0Bc5hpEdssVw8okRAE4XF',
};

export const SUPPLIER_STATS = {
  todayRevenue: 482900,
  revenueChange: '+12.5%',
  activeOrders: 24,
  urgentOrders: 8,
  capacityUsed: 70,
  pendingPayout: 1240000,
};

export const SUPPLIER_INCOMING_ORDERS = [
  {
    id: 'ORD-90231',
    description: '50× OPC 53 Grade Cement Bags',
    icon: 'package_2',
    eta: '45 mins',
    payment: 'Cash on delivery',
    location: 'HSR Layout, Sector 4',
    amount: 18500,
    urgent: true,
  },
  {
    id: 'ORD-90245',
    description: '2× High-Tensile Steel Rebar Bunches',
    icon: 'construction',
    eta: 'Instant',
    payment: 'Prepaid',
    location: 'Whitefield, ITPL Main Road',
    amount: 142000,
    urgent: false,
  },
  {
    id: 'ORD-90261',
    description: '200× First Class Red Bricks',
    icon: 'home_work',
    eta: '30 mins',
    payment: 'UPI',
    location: 'Koramangala, 5th Block',
    amount: 4800,
    urgent: false,
  },
  {
    id: 'ORD-90278',
    description: '10× Berger Wall Primer 20L',
    icon: 'format_paint',
    eta: '1 hr',
    payment: 'Card',
    location: 'Indiranagar, 12th Main',
    amount: 42500,
    urgent: true,
  },
];

export const SUPPLIER_INVENTORY = [
  { id: 'si1', name: 'UltraTech OPC 53', price: 385, unit: 'bag', inStock: true, image: SUPPLIER_INVENTORY_IMAGES.cement },
  { id: 'si2', name: 'TMT Rebar 12mm', price: 72000, unit: 'ton', inStock: true, image: SUPPLIER_INVENTORY_IMAGES.steel },
  { id: 'si3', name: 'Red Clay Bricks', price: 8.5, unit: 'unit', inStock: false, image: SUPPLIER_INVENTORY_IMAGES.bricks },
  { id: 'si4', name: 'Berger Wall Primer', price: 4250, unit: 'bucket', inStock: true, image: SUPPLIER_INVENTORY_IMAGES.cement },
];

// ─── Delivery Partner ─────────────────────────────────────────────────────────

export const DELIVERY_EARNINGS = {
  today: 2450,
  completedOrders: 12,
  avgTimeMinutes: 24,
  rating: 4.9,
  weeklyGoal: 10,
  weeklyCompleted: 8,
};

export const DELIVERY_ASSIGNMENTS = [
  {
    id: 'DEL-001',
    status: 'active',
    pickup: { name: 'Elite ReadyMix Concrete Plant', address: 'Unit 4, Sector 18, Industrial Area' },
    dropoff: { name: 'Skyline Residency Site B', address: 'Opp. Central Park, Block C, Ghatkopar' },
    item: { name: 'High-Tensile Steel Rods', qty: '50 Units', weight: '450kg' },
    fare: 350,
    eta: 18,
  },
  {
    id: 'DEL-002',
    status: 'pending',
    pickup: { name: 'BuildFast Central Hub', address: 'Plot 7, MIDC Phase 2, Andheri East' },
    dropoff: { name: 'Green Valley Constructions', address: 'Gate 3, Survey No. 12, Powai' },
    item: { name: 'Birla Premium Cement Bags', qty: '20 Bags', weight: '1000kg' },
    fare: 280,
    eta: 35,
  },
  {
    id: 'DEL-003',
    status: 'completed',
    pickup: { name: 'JK Cement Depot', address: 'NH-48, Kilometer 24, Thane' },
    dropoff: { name: 'Metro Rail Infra Site', address: 'Underground Station, CL-07, Dadar' },
    item: { name: 'Waterproof Cement Mix', qty: '30 Bags', weight: '1500kg' },
    fare: 420,
    eta: 0,
  },
];

// ─── User Profile ─────────────────────────────────────────────────────────────

export const USER_PROFILE = {
  name: 'Rajesh Kumar',
  phone: '+91 98765 43210',
  email: 'rajesh.kumar@buildco.in',
  role: 'Senior Contractor',
  company: 'BuildCo Infrastructure Pvt. Ltd.',
  memberSince: 'January 2024',
  totalOrders: 47,
  totalSpent: 8_42_500,
  image: null,
};

export const ORDER_HISTORY = [
  {
    id: 'BF-902341',
    date: 'Today, 10:30 AM',
    status: 'delivered',
    items: ['Birla Cement ×5', 'Red Bricks ×1', 'TMT Steel ×10'],
    total: 18720,
  },
  {
    id: 'BF-891204',
    date: 'Yesterday, 3:15 PM',
    status: 'delivered',
    items: ['Berger Primer ×2', 'JK Wall Putty ×4'],
    total: 13220,
  },
  {
    id: 'BF-880133',
    date: '20 Apr, 11:00 AM',
    status: 'delivered',
    items: ['TMT Steel Bars ×20', 'Havells Cable ×3'],
    total: 33520,
  },
  {
    id: 'BF-871055',
    date: '17 Apr, 9:00 AM',
    status: 'delivered',
    items: ['Birla Cement ×10', 'Teak Planks ×5'],
    total: 21750,
  },
];
