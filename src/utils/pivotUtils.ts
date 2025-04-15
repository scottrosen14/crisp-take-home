import {
  ColumnValues,
  Order,
  GroupedRowData,
  Group,
  ColumnGrandTotals,
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
  groupedRows: GroupedRowData,
  columns: string[]
): { columnGrandTotals: ColumnGrandTotals; ultimateGrandTotal: number } => {
  const columnGrandTotals: ColumnGrandTotals = {};
  let ultimateGrandTotal = 0;

  columns.forEach((columnName: string) => {
    columnGrandTotals[columnName] = 0;
  });

  // TODO: Optimize this; Cannot have triple nested loops
  Object.values(groupedRows).forEach((group: Group) => {
    Object.values(group).forEach((columnValues: ColumnValues) => {
      columns.forEach(columnName => {
        const value = columnValues[columnName] || 0;
        columnGrandTotals[columnName] = Number(
          (columnGrandTotals[columnName] + value).toFixed(0)
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
  columns: string[],
  subGroups: Group
): { groupedTotalsByColumn: ColumnValues; groupGrandTotal: number } => {
  const groupTotalsByColumn: ColumnValues = {};
  let groupGrandTotal = 0;

  columns.forEach(state => {
    groupTotalsByColumn[state] = 0;
  });

  Object.values(subGroups).forEach((columnValues: ColumnValues) => {
    columns.forEach((columnName: string) => {
      const value = columnValues[columnName] || 0;
      groupTotalsByColumn[columnName] += value;
      groupGrandTotal += value;
    });
  });

  return {
    groupedTotalsByColumn: groupTotalsByColumn,
    groupGrandTotal: Math.round(groupGrandTotal),
  };
};
