import React, { ReactElement } from 'react';
import { grandTotalRowStyle, tdStyle } from '../PivotBody/PivotBody.styles';
import { useAppSelector } from '../../redux/store';
import { selectUniqueColumns } from '../../redux/features/orders/ordersSelectors';

interface GrandTotalRowProps {
  columnGrandTotals: Record<string, number>;
  ultimateGrandTotal: number;
}

const GrandTotalRow = ({
  columnGrandTotals,
  ultimateGrandTotal,
}: GrandTotalRowProps): ReactElement => {
  const usStates = useAppSelector(selectUniqueColumns);

  return (
    <tr style={grandTotalRowStyle}>
      <td style={{ ...tdStyle, ...grandTotalRowStyle }} colSpan={2}>
        Grand Total
      </td>
      {usStates.map(state => (
        <td key={state} style={{ ...tdStyle, ...grandTotalRowStyle }}>
          {columnGrandTotals[state]?.toLocaleString() || '-'}
        </td>
      ))}
      <td
        id="ultimate-grand-total"
        style={{ ...tdStyle, ...grandTotalRowStyle }}
      >
        {ultimateGrandTotal.toLocaleString()}
      </td>
    </tr>
  );
};

export default GrandTotalRow;
