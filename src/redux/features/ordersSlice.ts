import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order, GroupedRowData } from '../../constants/constants';
import { fetchOrders } from '../../api/ordersApi';
import {
  getUniqueStates,
  groupPivotRowData,
  calculateGrandTotals,
  calculateGroupTotals,
} from '../../utils/pivotUtils';
import { RootState } from '../store';

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

// Selectors
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectLoading = (state: RootState) => state.orders.loading;
export const selectError = (state: RootState) => state.orders.error;

// Memoized selectors for pivot data
export const selectUniqueStates = (state: RootState) =>
  getUniqueStates(state.orders.orders);
export const selectPivotRows = (state: RootState) =>
  groupPivotRowData(state.orders.orders);

// Selectors for group totals
export const selectGroupTotals = (
  state: RootState,
  category: string,
  subCategories: Record<string, Record<string, number>>
) => {
  const states = selectUniqueStates(state);
  return calculateGroupTotals(states, subCategories);
};

// Selectors for grand totals
export const selectGrandTotals = (state: RootState) => {
  const pivotRows = selectPivotRows(state);
  const states = selectUniqueStates(state);
  return calculateGrandTotals(pivotRows, states);
};

export default ordersSlice.reducer;
