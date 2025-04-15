import { RootState } from '../../store';
import {
  getUniqueColumns,
  groupPivotRowData,
  calculateGroupTotals,
  calculateGrandTotals,
} from '../../../utils/pivotUtils';
import { selectActiveColumnConfig } from '../pivotConfig/pivotConfigSelectors';

export const selectOrders = (state: RootState) => state.ordersReducer.orders;
export const selectLoading = (state: RootState) => state.ordersReducer.loading;
export const selectError = (state: RootState) => state.ordersReducer.error;

export const selectUniqueColumns = (state: RootState) => {
  const columnConfig = selectActiveColumnConfig(state);
  if (!columnConfig) return [];
  return getUniqueColumns(state.ordersReducer.orders, columnConfig);
};

export const selectPivotRows = (state: RootState) => {
  const columnConfig = selectActiveColumnConfig(state);
  if (!columnConfig) return {};
  return groupPivotRowData(state.ordersReducer.orders, columnConfig);
};

export const selectGroupTotals = (
  rootState: RootState,
  subGroups: Record<string, Record<string, number>>
) => {
  const columns = selectUniqueColumns(rootState);
  return calculateGroupTotals(columns, subGroups);
};

export const selectGrandTotals = (columnName: RootState) => {
  const pivotRows = selectPivotRows(columnName);
  const columns = selectUniqueColumns(columnName);
  return calculateGrandTotals(pivotRows, columns);
};
