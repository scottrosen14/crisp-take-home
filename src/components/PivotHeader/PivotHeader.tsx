import React, { ReactElement } from 'react';
import {
  headerRowStyle,
  productsHeaderStyle,
  statesHeaderStyle,
  columnHeaderStyle,
} from './PivotHeader.styles';
import { useAppSelector } from '../../redux/store';
import { selectUniqueStates } from '../../redux/features/orders/ordersSelectors';

const PivotHeader = (): ReactElement => {
  const columns: string[] = useAppSelector(selectUniqueStates);

  // TODO: Make these dynamic
  return (
    <thead>
      <tr data-testid="top-header-row" style={headerRowStyle}>
        <th
          data-testid="pivot-table-title"
          colSpan={2}
          style={productsHeaderStyle}
        >
          PRODUCTS
        </th>
        <th data-testid="column-header" style={statesHeaderStyle}>
          STATES
        </th>
        {/* TODO: Fix this styling; extra element */}
        <th
          data-testid="total-row-title"
          colSpan={columns.length + 1}
          style={productsHeaderStyle}
        ></th>
      </tr>
      <tr data-testid="sub-header-row">
        <th data-testid="group-header-title" style={columnHeaderStyle}>
          Category
        </th>
        <th data-testid="sub-group-header-title" style={columnHeaderStyle}>
          Sub-Category
        </th>
        {columns.map(columnName => (
          <th
            key={columnName}
            data-testid={`column-header-${columnName}`}
            style={columnHeaderStyle}
          >
            {columnName}
          </th>
        ))}
        <th data-testid="row-total-header" style={columnHeaderStyle}>
          Total
        </th>
      </tr>
    </thead>
  );
};

export default PivotHeader;
