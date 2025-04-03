import { useState, useEffect } from 'react';

export interface Order {
  rowId: number;
  orderId: string;
  orderDate: string;
  shipDate: string;
  shipMode: string;
  customerId: string;
  customerName: string;
  segment: string;
  country: string;
  city: string;
  state: string;
  postalCode: number;
  region: string;
  productId: string;
  category: string;
  subCategory: string;
  productName: string;
  sales: number;
  quantity: number;
  discount: number;
  profit: number;
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
