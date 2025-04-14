import React, { ReactElement } from 'react';
import { tdStyle, totalRowStyle } from '../PivotBody/PivotBody.styles';
import { useAppSelector } from '../../redux/store';
import { selectUniqueStates } from '../../redux/features/orders/ordersSelectors';

interface Props {
  groupTotalsByColumn: Record<string, number>;
  groupGrandTotal: number;
}

const TotalRow = ({
  groupTotalsByColumn,
  groupGrandTotal,
}: Props): ReactElement => {
  const usStates = useAppSelector(selectUniqueStates);

  return (
    <tr data-testid="total-row" style={totalRowStyle}>
      <td data-testid="total-row-label" style={tdStyle}>
        Total
      </td>
      {usStates.map(state => (
        <td data-testid={`total-row-${state}`} key={state} style={tdStyle}>
          {groupTotalsByColumn[state]?.toLocaleString() || '-'}
        </td>
      ))}
      <td data-testid="total-row-ultimate-total" style={tdStyle}>
        {groupGrandTotal.toLocaleString()}
      </td>
    </tr>
  );
};

export default TotalRow;
