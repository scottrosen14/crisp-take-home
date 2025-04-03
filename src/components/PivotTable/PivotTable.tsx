import React from 'react';
import Header from './Header';
import Row from './Row';
import Cell from './Cell';
import { Order } from '../../hooks/useFetchOrders';

interface PivotTableProps {
  orders: Order[];
}

export const PivotTable = ({ orders }: PivotTableProps) => {
  return (
    <div className="pivot-table">
      <Header />
      {/* TODO: Map through data to create rows */}
    </div>
  );
};

export default PivotTable; 