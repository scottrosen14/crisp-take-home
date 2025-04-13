import React, { ReactElement, useMemo } from 'react';
import { Order } from '../../constants/constants';
import PivotBody from '../PivotBody/PivotBody';
import PivotHeader from '../PivotHeader/PivotHeader';
import { getUniqueStates, groupPivotRowData } from '../../utils/pivotUtils';

interface Props {
  data: Order[];
}

const PivotTable = ({ data }: Props): ReactElement => {
  const states = useMemo(() => getUniqueStates(data), [data]);
  const pivotRows = useMemo(() => groupPivotRowData(data), [data]);

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
        <PivotHeader states={states} />
        <PivotBody pivotRows={pivotRows} usStates={states} />
      </table>
    </div>
  );
};

export default PivotTable;
