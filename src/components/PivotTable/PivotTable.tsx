import React, { useMemo } from 'react';
import { Order } from '../../hooks/useFetchOrders';
import PivotTableHeader from "../PivotTableHeader/PivotTableHeader";
import './PivotTable.css';

interface PivotTableProps {
  orders: Order[];
}

export const PivotTable = ({ orders }: PivotTableProps) => {
  return (
    <div className="pivot-table">
      <PivotTableHeader orders={orders} />
      {/* TODO: Map through data to create rows */}
    </div>
  );
};

export default PivotTable; 