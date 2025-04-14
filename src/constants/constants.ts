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

export interface SubGroups {
  [subGroup: string]: ColumnMetrics;
}

export interface GroupedRowData {
  [group: string]: SubGroups;
}

export interface ColumnMetrics {
  [column: string]: number;
}

export type ColumnGrandTotals = ColumnMetrics;
