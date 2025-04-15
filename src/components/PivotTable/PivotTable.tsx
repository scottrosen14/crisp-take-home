import React, { ReactElement } from 'react';
import PivotBody from '../PivotBody/PivotBody';
import PivotHeader from '../PivotHeader/PivotHeader';
import { useAppSelector } from '../../redux/store';
import {
  selectUniqueStates,
  selectPivotRows,
} from '../../redux/features/orders/ordersSelectors';
import { containerStyles, tableStyles } from './PivotTable.styles';

const PivotTable = (): ReactElement => {
  return (
    <div style={containerStyles}>
      <table style={tableStyles}>
        <PivotHeader />
        <PivotBody />
      </table>
    </div>
  );
};

export default PivotTable;
