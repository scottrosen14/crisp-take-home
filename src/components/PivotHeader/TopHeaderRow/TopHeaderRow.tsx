import React, { ReactElement } from 'react';
import {
  headerRowStyle,
  productsHeaderStyle,
  statesHeaderStyle,
} from '../PivotHeader.styles';
import { useAppSelector } from '../../../redux/store';
import { selectUniqueColumns } from '../../../redux/features/orders/ordersSelectors';

const TopHeaderRow = (): ReactElement => {
  const columns: string[] = useAppSelector(selectUniqueColumns);

  return (
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
  );
};

export default TopHeaderRow;
