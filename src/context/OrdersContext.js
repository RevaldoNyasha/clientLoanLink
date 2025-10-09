import React, { createContext, useContext, useMemo, useState } from 'react';

const OrdersContext = createContext();

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within an OrdersProvider');
  return ctx;
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const generateOrderId = () => `ord_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;

  const addOrder = (order) => {
    setOrders((prev) => [{ ...order, id: generateOrderId() }, ...prev]);
  };

  // Future: replace addOrder with API call, e.g. POST /api/credit-orders
  // Keep the shape stable so integration is straightforward.

  const value = useMemo(() => ({ orders, addOrder }), [orders]);

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
};


