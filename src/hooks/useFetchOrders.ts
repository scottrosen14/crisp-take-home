import { useEffect, useState } from 'react';
import { Order } from '../constants';

// TODO: Write tests for the useFetchOrders hook to ensure it handles loading, success, and error states correctly.

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
        setError(
          err instanceof Error ? err.message : `Error: Unable to fetch orders`
        );
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
};
