import React, { useMemo } from 'react';
import { Order } from '../../constants';
import PivotBody from '../PivotBody/PivotBody';
import PivotHeader from '../PivotHeader/PivotHeader';
import { getUniqueStates, groupDataForPivot } from '../../utils/pivotTableUtils';

interface Props {
  data: Order[];
}

const PivotTable: React.FC<Props> = ({ data }) => {
  const states = useMemo(() => getUniqueStates(data), [data]);
  const pivotRows = useMemo(() => groupDataForPivot(data), [data]);

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: 'Arial, sans-serif' }}>
        <PivotHeader states={states} />
        <PivotBody pivotRows={pivotRows} states={states} />
      </table>
    </div>
  );
};

export default PivotTable;
