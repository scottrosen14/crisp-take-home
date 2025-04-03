import { useState, useEffect } from 'react';

export interface Order {
  id: string;
  date: string;
  customer: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
  status: string;
  region: string;
}

export const useFetchOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('/sales-orders.json');
        
        if (!response.ok) {
          throw new Error(`Error: Unable to fetch orders`);
        }
        
        const data: Order[] = await response.json();
        setOrders(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : `Error: Unable to fetch orders`);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};
