import { Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen.jsx';
import HomeScreen from './pages/HomeScreen.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import TrackingPage from './pages/TrackingPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SupplierDashboard from './pages/SupplierDashboard.jsx';
import DeliveryDashboard from './pages/DeliveryDashboard.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/supplier" element={<SupplierDashboard />} />
      <Route path="/delivery" element={<DeliveryDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
