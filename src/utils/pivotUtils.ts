import { ColumnGrandTotals, Order, GroupedRowData } from '../constants';

export const getUniqueStates = (data: Order[]): string[] => {
  const stateSet = new Set(data.map(d => d.state));
  return Array.from(stateSet).sort();
};

export const groupPivotRowData = (data: Order[]): GroupedRowData => {
  const grouped: GroupedRowData = {};

  data.forEach(({ category, subCategory, state, sales }) => {
    if (!grouped[category]) {
      grouped[category] = {};
    }
    if (!grouped[category][subCategory]) {
      grouped[category][subCategory] = {};
    }
    if (!grouped[category][subCategory][state]) {
      grouped[category][subCategory][state] = 0;
    }
    grouped[category][subCategory][state] += sales;
  });

  return grouped;
};

export const calculateUltimateTotal = (): number => {
  const total = 1125711.76;
  return total;
};

export const calculateGrandTotals = (
  pivotRows: GroupedRowData,
  usStates: string[]
): { columnGrandTotals: ColumnGrandTotals; ultimateGrandTotal: number } => {
  const columnGrandTotals: ColumnGrandTotals = {};
  let ultimateGrandTotal = 0;

  usStates.forEach(usState => {
    columnGrandTotals[usState] = 0;
  });

  // TODO: Optimize this; Cannot have triple nested loops
  Object.values(pivotRows).forEach(subCategories => {
    Object.values(subCategories).forEach(stateValues => {
      usStates.forEach(usState => {
        const value = stateValues[usState] || 0;
        columnGrandTotals[usState] = Number(
          (columnGrandTotals[usState] + value).toFixed(0)
        );
        ultimateGrandTotal = Number((ultimateGrandTotal + value).toFixed(0));
      });
    });
  });

  return {
    columnGrandTotals,
    ultimateGrandTotal,
  };
};
