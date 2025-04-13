import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../../constants/constants';
import { fetchOrdersThunk } from './fetchOrdersThunk';

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
