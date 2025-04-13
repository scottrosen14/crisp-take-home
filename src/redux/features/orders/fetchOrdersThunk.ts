import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders } from '../../../api/ordersApi';

export const fetchOrdersThunk = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchOrders();
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Unable to fetch orders'
      );
    }
  }
);
