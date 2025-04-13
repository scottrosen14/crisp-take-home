import React, { ReactElement, useMemo } from 'react';
import { Order } from '../../constants';
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
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <PivotHeader states={states} />
        <PivotBody pivotRows={pivotRows} usStates={states} />
      </table>
    </div>
  );
};

export default PivotTable;
