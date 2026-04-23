import { createContext, useContext, useReducer } from 'react';
import { products, DELIVERY_ADDRESSES, DEMO_COURIER } from '../data/products';

const CartContext = createContext(null);

const DEMO_ITEMS = [
  { product: products.find(p => p.id === 1), quantity: 5 },
  { product: products.find(p => p.id === 2), quantity: 1 },
  { product: products.find(p => p.id === 3), quantity: 10 },
].filter(i => i.product);

const DEMO_ORDER = {
  id: 'BF-902341',
  status: 'out_for_delivery',
  placedAt: Date.now() - 8 * 60 * 1000,
  items: DEMO_ITEMS,
  address: DELIVERY_ADDRESSES[0],
  paymentMethod: 'upi',
  total: 18720,
  savings: 1200,
  courier: DEMO_COURIER,
  etaMinutes: 15,
};

const initialState = {
  items: DEMO_ITEMS,
  order: DEMO_ORDER,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.items.find(i => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(i => i.product.id !== action.productId) };
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.product.id !== action.productId) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    }
    case 'PLACE_ORDER':
      return {
        ...state,
        order: {
          id: 'BF-' + Math.floor(Math.random() * 900000 + 100000),
          status: 'placed',
          placedAt: Date.now(),
          items: state.items,
          address: action.address,
          paymentMethod: action.paymentMethod,
          total: action.total,
          savings: action.savings,
          courier: DEMO_COURIER,
          etaMinutes: 20,
        },
        items: [],
      };
    case 'UPDATE_ORDER_STATUS':
      if (!state.order) return state;
      return { ...state, order: { ...state.order, status: action.status } };
    case 'UPDATE_ETA':
      if (!state.order) return state;
      return { ...state, order: { ...state.order, etaMinutes: Math.max(0, action.eta) } };
    default:
      return state;
  }
}

function calcTotals(items) {
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
  const deliveryFee = subtotal > 10000 ? 0 : 199;
  const handlingFee = 350;
  const savings = totalQty >= 10 ? 1200 : 0;
  const total = subtotal + deliveryFee + handlingFee - savings;
  return { subtotal, totalQty, deliveryFee, handlingFee, savings, total };
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totals = calcTotals(state.items);

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', product });
  const removeFromCart = (productId) => dispatch({ type: 'REMOVE_FROM_CART', productId });
  const updateQuantity = (productId, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  const placeOrder = (address, paymentMethod) =>
    dispatch({ type: 'PLACE_ORDER', address, paymentMethod, ...totals });
  const updateOrderStatus = (status) => dispatch({ type: 'UPDATE_ORDER_STATUS', status });
  const updateEta = (eta) => dispatch({ type: 'UPDATE_ETA', eta });

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        order: state.order,
        ...totals,
        addToCart,
        removeFromCart,
        updateQuantity,
        placeOrder,
        updateOrderStatus,
        updateEta,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
