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

type NestedGroup = {
  [key: string]: NestedGroup | ColumnValues;
};

export const groupPivotRowData = (
  orders: Order[],
  columnFilter: keyof Order,
  rowFilters: (keyof Order)[]
): GroupedRowData => {
  const grouped: NestedGroup = {};

  orders.forEach((order: Order) => {
    let currentGroup = grouped;

    rowFilters.forEach((rowFilter: keyof Order, index: number) => {
      if (index === rowFilters.length - 1) {
        const row = String(order[rowFilter]);
        currentGroup[row] = currentGroup[row] || {};

        const column = String(order[columnFilter]);
        currentGroup[row][column] = currentGroup[row][column] || 0;
        currentGroup[row][column] =
          Math.round(
            ((currentGroup[row][column] as number) + order.sales) * 100
          ) / 100;
      } else {
        const rowGroup = String(order[rowFilter]);
        currentGroup[rowGroup] = currentGroup[rowGroup] || {};
        currentGroup = currentGroup[rowGroup] as NestedGroup;
      }
    });
  });

  return grouped as GroupedRowData;
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
        columnGrandTotals[columnName] = columnGrandTotals[columnName] + value;
        ultimateGrandTotal = ultimateGrandTotal + value;
      });
    });
  });

  // Round only at the final step
  const roundedColumnGrandTotals: ColumnGrandTotals = {};
  Object.entries(columnGrandTotals).forEach(([key, value]) => {
    roundedColumnGrandTotals[key] = Math.round(value);
  });

  return {
    columnGrandTotals: roundedColumnGrandTotals,
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
