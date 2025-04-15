import {
  ColumnValues,
  Order,
  GroupedRowData,
  Group,
  ColumnGrandTotals,
} from '../constants/constants';

export const getUniqueColumns = (
  data: Order[],
  columnName: string
): string[] => {
  const columnSet = new Set(
    data.map(d => String(d[columnName as keyof Order]))
  );
  return Array.from(columnSet).sort();
};

export const groupPivotRowData = (
  orders: Order[],
  columnName: string
): GroupedRowData => {
  const grouped: GroupedRowData = {};

  orders.forEach(order => {
    const category = order.category;
    const subCategory = order.subCategory;
    const columnValue = String(order[columnName as keyof Order]);
    const sales = order.sales;

    if (!grouped[category]) {
      grouped[category] = {};
    }
    if (!grouped[category][subCategory]) {
      grouped[category][subCategory] = {};
    }
    if (!grouped[category][subCategory][columnValue]) {
      grouped[category][subCategory][columnValue] = 0;
    }
    // Round at each addition to prevent floating-point precision errors
    grouped[category][subCategory][columnValue] =
      Math.round((grouped[category][subCategory][columnValue] + sales) * 100) /
      100;
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
