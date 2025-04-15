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
  columnName: string,
  rowConfigs: string[]
): GroupedRowData => {
  const grouped: NestedGroup = {};

  orders.forEach(order => {
    let currentGroup = grouped;

    rowConfigs.forEach((config, index) => {
      const value = String(order[config as keyof Order]);

      if (index === rowConfigs.length - 1) {
        // Last level - add the column values
        if (!currentGroup[value]) {
          currentGroup[value] = {};
        }
        const columnValue = String(order[columnName as keyof Order]);
        if (!(currentGroup[value] as ColumnValues)[columnValue]) {
          (currentGroup[value] as ColumnValues)[columnValue] = 0;
        }
        (currentGroup[value] as ColumnValues)[columnValue] =
          Math.round(
            ((currentGroup[value] as ColumnValues)[columnValue] + order.sales) *
              100
          ) / 100;
      } else {
        // Intermediate level - create nested structure
        if (!currentGroup[value]) {
          currentGroup[value] = {};
        }
        currentGroup = currentGroup[value] as NestedGroup;
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
