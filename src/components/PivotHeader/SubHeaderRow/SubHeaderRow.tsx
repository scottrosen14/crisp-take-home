import React, { ReactElement } from 'react';
import { columnHeaderStyle } from '../PivotHeader.styles';
import { useAppSelector } from '../../../redux/store';
import { selectUniqueColumns } from '../../../redux/features/orders/ordersSelectors';

const SubHeaderRow = (): ReactElement => {
  const columns: string[] = useAppSelector(selectUniqueColumns);

  return (
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
  );
};

export default SubHeaderRow;
