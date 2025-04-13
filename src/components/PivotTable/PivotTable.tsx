import React, { ReactElement } from 'react';
import PivotBody from '../PivotBody/PivotBody';
import PivotHeader from '../PivotHeader/PivotHeader';
import { useAppSelector } from '../../redux/store';
import {
  selectUniqueStates,
  selectPivotRows,
} from '../../redux/features/ordersSlice';

const PivotTable = (): ReactElement => {
  const states = useAppSelector(selectUniqueStates);
  const pivotRows = useAppSelector(selectPivotRows);

  return (
    <div
      style={{
        padding: '5px',
        backgroundColor: 'white',
        borderRadius: '8px',
        width: '100%',
        overflowX: 'auto',
      }}
    >
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          fontFamily: 'Arial, sans-serif',
          padding: '8px',
          border: '1px solid #ddd',
          backgroundColor: '#ffffff',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        }}
      >
        <PivotHeader />
        <PivotBody />
      </table>
    </div>
  );
};

export default PivotTable;
