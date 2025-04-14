import React, { ReactElement } from 'react';
import { tdStyle, totalRowStyle } from '../../PivotBody/PivotBody.styles';

interface Props {
  groupTotalsByColumn: Record<string, number>;
  groupGrandTotal: number;
  columns: string[];
}

const GroupTotalRow = ({
  groupTotalsByColumn,
  groupGrandTotal,
  columns,
}: Props): ReactElement => {
  return (
    <tr data-testid="group-total-row" style={totalRowStyle}>
      <td data-testid="group-total-row-label" style={tdStyle}>
        Total
      </td>
      {columns.map(columnName => (
        <td
          data-testid={`group-total-row-${columnName}-value`}
          key={columnName}
          style={tdStyle}
        >
          {groupTotalsByColumn[columnName]?.toLocaleString() || '-'}
        </td>
      ))}
      <td data-testid="group-total-row-end-total" style={tdStyle}>
        {groupGrandTotal.toLocaleString()}
      </td>
    </tr>
  );
};

export default GroupTotalRow;
