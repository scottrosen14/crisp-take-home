import React, { ReactElement } from 'react';
import {
  headerRowStyle,
  productsHeaderStyle,
  statesHeaderStyle,
  columnHeaderStyle,
} from './PivotHeader.styles';
import { useAppSelector } from '../../redux/store';
import { selectUniqueStates } from '../../redux/features/ordersSlice';

const PivotHeader = (): ReactElement => {
  const states = useAppSelector(selectUniqueStates);

  return (
    <thead>
      <tr style={headerRowStyle}>
        <th colSpan={2} style={productsHeaderStyle}>
          PRODUCTS
        </th>
        <th style={statesHeaderStyle}>STATES</th>
        <th colSpan={states.length + 1} style={productsHeaderStyle}></th>
      </tr>
      <tr>
        <th style={columnHeaderStyle}>Category</th>
        <th style={columnHeaderStyle}>Sub-Category</th>
        {states.map(state => (
          <th key={state} style={columnHeaderStyle}>
            {state}
          </th>
        ))}
        <th style={columnHeaderStyle}>Total</th>
      </tr>
    </thead>
  );
};

export default PivotHeader;
