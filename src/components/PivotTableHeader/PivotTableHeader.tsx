import React, { ReactElement, useMemo } from 'react';
import './PivotTableHeader.css';
import { Order } from '../../hooks/useFetchOrders';

interface PivotTableHeaderProps {
  orders: Order[];
}

const PivotTableHeader = ({ orders }: PivotTableHeaderProps): ReactElement => {
  const states = useMemo(() => {
    const statesSet = new Set<string>();

    orders.forEach(order => {
      order.state && statesSet.add(order.state);
    });

    return Array.from(statesSet).sort();
  }, [orders]);

  return (
    <thead>
      <tr className="pivot-table-header">
        <th className="pivot-table-header-cell">Category</th>
        <th className="pivot-table-header-cell">Sub-Category</th>
        {states.map(usState => (
          <th className="pivot-table-header-cell">{usState}</th>
        ))}
      </tr>
    </thead>
  );
};

export default PivotTableHeader;
