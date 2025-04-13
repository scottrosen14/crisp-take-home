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

export interface SubGroup {
  [subGroup: string]: ColumnTotals;
}

export interface GroupedRowData {
  [group: string]: SubGroup;
}

export interface ColumnTotals {
  [column: string]: number;
}

export type GrandTotals = ColumnTotals;
