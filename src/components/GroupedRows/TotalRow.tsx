import React, { ReactElement } from 'react';
import { tdStyle, totalRowStyle } from '../PivotBody/PivotBody.styles';
import { useAppSelector } from '../../redux/store';
import { selectUniqueStates } from '../../redux/features/ordersSlice';

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
    <tr style={totalRowStyle}>
      <td style={tdStyle}>Total</td>
      {usStates.map(state => (
        <td key={state} style={tdStyle}>
          {groupTotalsByColumn[state]?.toLocaleString() || '-'}
        </td>
      ))}
      <td style={tdStyle}>{groupGrandTotal.toLocaleString()}</td>
    </tr>
  );
};

export default TotalRow;
