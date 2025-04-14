import React, { ReactElement } from 'react';
import { tdStyle, totalRowStyle } from '../PivotBody/PivotBody.styles';

interface Props {
  groupTotalsByColumn: Record<string, number>;
  groupGrandTotal: number;
  columns: string[];
}

const TotalRow = ({
  groupTotalsByColumn,
  groupGrandTotal,
  columns,
}: Props): ReactElement => {
  return (
    <tr data-testid="total-row" style={totalRowStyle}>
      <td data-testid="total-row-label" style={tdStyle}>
        Total
      </td>
      {columns.map(columnName => (
        <td
          data-testid={`total-row-${columnName}`}
          key={columnName}
          style={tdStyle}
        >
          {groupTotalsByColumn[columnName]?.toLocaleString() || '-'}
        </td>
      ))}
      <td data-testid="total-row-ultimate-total" style={tdStyle}>
        {groupGrandTotal.toLocaleString()}
      </td>
    </tr>
  );
};

export default TotalRow;
