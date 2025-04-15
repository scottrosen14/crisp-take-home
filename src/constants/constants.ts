export interface Order {
  rowId: number;
  orderId: string;
  orderDate: string;
  shipDate: string;
  shipMode: string;
  customerId: string;
  customerName: string;
  segment: string;
  country: string;
  city: string;
  state: string;
  postalCode: number;
  region: string;
  productId: string;
  category: string;
  subCategory: string;
  productName: string;
  sales: number;
  quantity: number;
  discount: number;
  profit: number;
}

export interface Group {
  [subGroup: string]: ColumnValues;
}

export interface GroupedRowData {
  [group: string]: Group;
}

export interface ColumnValues {
  [column: string]: number;
}

export type ColumnGrandTotals = ColumnValues;
