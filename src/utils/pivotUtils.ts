import {
  ColumnTotals,
  Order,
  GroupedRowData,
  SubGroup,
  GrandTotals,
} from '../constants/constants';

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

export const calculateGrandTotals = (
  pivotRows: GroupedRowData,
  usStates: string[]
): { columnGrandTotals: GrandTotals; ultimateGrandTotal: number } => {
  const columnGrandTotals: GrandTotals = {};
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
        ultimateGrandTotal = ultimateGrandTotal + value;
      });
    });
  });

  return {
    columnGrandTotals: columnGrandTotals,
    ultimateGrandTotal: Number(ultimateGrandTotal.toFixed(0)),
  };
};

export const calculateGroupTotals = (
  usStates: string[],
  subCategories: SubGroup
): { groupTotalsByColumn: ColumnTotals; groupGrandTotal: number } => {
  const groupTotalsByColumn: ColumnTotals = {};
  let groupGrandTotal = 0;

  usStates.forEach(state => {
    groupTotalsByColumn[state] = 0;
  });

  Object.values(subCategories).forEach(stateValues => {
    usStates.forEach(state => {
      const value = stateValues[state] || 0;
      groupTotalsByColumn[state] += value;
      groupGrandTotal += value;
    });
  });

  return {
    groupTotalsByColumn,
    groupGrandTotal,
  };
};
