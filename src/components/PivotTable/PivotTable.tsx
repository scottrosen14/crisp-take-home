import React, {useEffect, useMemo, useState} from 'react';
import { Order } from '../../hooks/useFetchOrders';
import PivotTableHeader from '../PivotTableHeader/PivotTableHeader';
import './PivotTable.css';
import { OrderFields } from '../../constants';

interface PivotTableProps {
  orders: Order[];
}

export const PivotTable = ({ orders }: PivotTableProps) => {
  const [filters, setFilters] = useState<string[]>([OrderFields.Category, OrderFields.SubCategory]);

  return (
    <div className="pivot-table">
      <PivotTableHeader orders={orders} />
      {/* TODO: Map through data to create rows */}
    </div>
  );
};

export default PivotTable;
