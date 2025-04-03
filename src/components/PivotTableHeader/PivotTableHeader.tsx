import React, {ReactElement, useMemo} from 'react';
import './PivotTableHeader.css';
import {Order} from "../../hooks/useFetchOrders";

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
    <tr className="pivot-table-header">
      {states.map(usState => (
          <th>{usState}</th>
      ))}
    </tr>
  );
};

export default PivotTableHeader; 