# BuildFast — B2B Construction Materials App

A multi-role quick-commerce app for construction materials. Built with React + Vite + Tailwind CSS.

## Live Demo

> Deploy to Vercel for a shareable link (see [Deploy](#deploy) below)

---

## Roles

Switch roles using the pill button in the top navbar.

| Role | Description |
|------|-------------|
| **Contractor** | Browse products, manage cart, checkout, track orders |
| **Supplier** | Accept/reject orders, manage inventory, add products |
| **Delivery Partner** | View active deliveries, mark delivered, track earnings |

---

## Run Locally

```bash
git clone https://github.com/deepaknarsaria/buildkart.git
cd buildkart
npm install
npm run dev
```

Open **http://localhost:5173**

---

## Deploy

### Vercel (recommended)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project** → Import `buildkart`
3. Framework auto-detects as **Vite** — no config needed
4. Click **Deploy**

You'll get a public URL like `buildkart.vercel.app`.

### Netlify

1. Go to [netlify.com](https://netlify.com) → **Add new site** → Import from Git
2. Select the `buildkart` repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **Deploy**

---

## Tech Stack

- **React 18** — UI components
- **Vite 5** — build tool
- **Tailwind CSS 3** — styling with custom design tokens
- **React Router v6** — navigation
- **Context API** — cart state + role state

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Role-aware top bar with role switcher
│   ├── BottomNav.jsx       # Role-aware bottom navigation
│   ├── ProductCard.jsx     # Product card with inline +/- stepper
│   ├── RoleSwitcher.jsx    # Dropdown to switch between roles
│   ├── CartItemRow.jsx     # Cart item with quantity controls
│   ├── OrderTracker.jsx    # Order status progress bar
│   └── StickyCartBar.jsx   # Floating cart summary bar
├── context/
│   ├── CartContext.jsx     # Cart state + order management
│   └── RoleContext.jsx     # Active role state
├── data/
│   ├── products.js         # 8 construction products + demo data
│   └── mockData.js         # Supplier, delivery, and user mock data
└── pages/
    ├── SplashScreen.jsx
    ├── HomeScreen.jsx
    ├── ProductDetail.jsx
    ├── CartPage.jsx
    ├── CheckoutPage.jsx
    ├── TrackingPage.jsx
    ├── ProfilePage.jsx
    ├── SupplierDashboard.jsx
    └── DeliveryDashboard.jsx
```

---

## Demo Walkthrough

### Contractor role
- Cart is pre-filled with Cement ×5, Bricks ×1, Steel ×10
- Active order #BF-902341 is already out for delivery with live ETA countdown
- Browse products → use **+/−** buttons directly on cards to adjust quantity
- Go to Cart → Checkout → track live order status

### Supplier role
- Dashboard shows today's revenue, active orders, capacity, and pending payout
- **Incoming Orders** — tap Accept or Reject on each order
- **Inventory** — edit prices inline, toggle stock on/off
- **Add Product** button opens a form to add new items to inventory

### Delivery Partner role
- Earnings summary with weekly goal progress
- Active delivery shows pickup → dropoff route with map
- Tap **Mark Delivered** to complete a delivery
- Performance insights: on-time rate, rating, avg distance
