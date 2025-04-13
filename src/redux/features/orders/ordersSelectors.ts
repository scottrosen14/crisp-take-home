import { RootState } from '../../store';
import {
  getUniqueStates,
  groupPivotRowData,
  calculateGroupTotals,
  calculateGrandTotals,
} from '../../../utils/pivotUtils';

export const selectOrders = (state: RootState) => state.ordersReducer.orders;
export const selectLoading = (state: RootState) => state.ordersReducer.loading;
export const selectError = (state: RootState) => state.ordersReducer.error;

export const selectUniqueStates = (state: RootState) =>
  getUniqueStates(state.ordersReducer.orders);
export const selectPivotRows = (state: RootState) =>
  groupPivotRowData(state.ordersReducer.orders);

export const selectGroupTotals = (
  state: RootState,
  category: string,
  subCategories: Record<string, Record<string, number>>
) => {
  const states = selectUniqueStates(state);
  return calculateGroupTotals(states, subCategories);
};

export const selectGrandTotals = (state: RootState) => {
  const pivotRows = selectPivotRows(state);
  const states = selectUniqueStates(state);
  return calculateGrandTotals(pivotRows, states);
};
