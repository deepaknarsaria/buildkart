import { createContext, useContext, useState } from 'react';

const RoleContext = createContext(null);

export const ROLES = {
  user: { id: 'user', label: 'Contractor', icon: 'engineering', color: 'bg-indigo-950 text-white', homePath: '/home' },
  supplier: { id: 'supplier', label: 'Supplier', icon: 'store', color: 'bg-secondary text-white', homePath: '/supplier' },
  delivery: { id: 'delivery', label: 'Delivery', icon: 'local_shipping', color: 'bg-tertiary text-white', homePath: '/delivery' },
};

export function RoleProvider({ children }) {
  const [currentRole, setCurrentRole] = useState('user');

  return (
    <RoleContext.Provider value={{ currentRole, setCurrentRole, roleInfo: ROLES[currentRole] }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => useContext(RoleContext);
