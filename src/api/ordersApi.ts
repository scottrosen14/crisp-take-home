import { Order } from '../constants/constants';

export const fetchOrders = async (): Promise<Order[]> => {
  const res = await fetch('/sales-orders.json');
  if (!res.ok) {
    throw new Error('Unable to fetch orders');
  }
  return await res.json();
};
