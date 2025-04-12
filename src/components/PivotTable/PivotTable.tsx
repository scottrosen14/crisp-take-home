import React, { useMemo } from 'react';
import { Order } from '../../constants';
import PivotBody from '../PivotBody/PivotBody';
import PivotHeader from '../PivotHeader/PivotHeader';

interface PivotData {
  [category: string]: {
    [subCategory: string]: number;
  };
}

interface Props {
  data: Order[];
}

const PivotTable: React.FC<Props> = ({ data }) => {
  const states = useMemo(() => {
    const stateSet = new Set(data.map(d => d.state));
    return Array.from(stateSet).sort();
  }, [data]);

  const pivotRows = useMemo(() => {
    const grouped: {
      [category: string]: {
        [subCategory: string]: {
          [state: string]: number;
        };
      };
    } = {};

    data.forEach(({ category, subCategory, state, sales }) => {
      if (!grouped[category]) grouped[category] = {};
      if (!grouped[category][subCategory]) grouped[category][subCategory] = {};
      if (!grouped[category][subCategory][state]) {
        grouped[category][subCategory][state] = 0;
      }
      grouped[category][subCategory][state] += sales;
    });

    return grouped;
  }, [data]);

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
