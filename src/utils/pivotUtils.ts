import {
  ColumnValues,
  Order,
  GroupedRowData,
  Group,
  ColumnGrandTotals,
} from '../constants/constants';

export const getUniqueColumns = (data: Order[]): string[] => {
  const stateSet = new Set(data.map(d => d.state));
  return Array.from(stateSet).sort();
};

export const groupPivotRowData = (orders: Order[]): GroupedRowData => {
  const grouped: GroupedRowData = {};

  // TODO: these name will need to come from the pivot config state
  orders.forEach(({ category, subCategory, state, sales }) => {
    if (!grouped[category]) {
      grouped[category] = {};
    }
    if (!grouped[category][subCategory]) {
      grouped[category][subCategory] = {};
    }
    if (!grouped[category][subCategory][state]) {
      grouped[category][subCategory][state] = 0;
    }
    // Round at each addition to prevent floating-point precision errors
    grouped[category][subCategory][state] =
      Math.round((grouped[category][subCategory][state] + sales) * 100) / 100;
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

  Object.values(groupedRows).forEach((group: Group) => {
    Object.values(group).forEach((columnValues: ColumnValues) => {
      columns.forEach(columnName => {
        const value = columnValues[columnName] || 0;
        columnGrandTotals[columnName] = Math.round(
          columnGrandTotals[columnName] + value
        );
        ultimateGrandTotal = Math.round(ultimateGrandTotal + value);
      });
    });
  });

  return {
    columnGrandTotals: columnGrandTotals,
    ultimateGrandTotal: Math.round(ultimateGrandTotal),
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
      groupTotalsByColumn[columnName] = Math.round(
        groupTotalsByColumn[columnName] + value
      );
      groupGrandTotal += value;
    });
  });

  return {
    groupedTotalsByColumn: groupTotalsByColumn,
    groupGrandTotal: Math.round(groupGrandTotal),
  };
};
