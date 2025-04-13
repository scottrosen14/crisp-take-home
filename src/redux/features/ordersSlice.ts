import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../constants/constants';
import { fetchOrders } from '../../api/ordersApi';

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

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

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrdersThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrdersThunk.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.orders = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.orders = [];
      });
  },
});

export default ordersSlice.reducer;
