import React, { ReactElement } from 'react';
import { grandTotalRowStyle, tdStyle } from './PivotBody.styles';

interface GrandTotalRowProps {
  columnGrandTotals: Record<string, number>;
  ultimateGrandTotal: number;
  usStates: string[];
}

// TODO: Review to locale string
const GrandTotalRow = ({
  columnGrandTotals,
  ultimateGrandTotal,
  usStates,
}: GrandTotalRowProps): ReactElement => {
  return (
    <tr style={grandTotalRowStyle}>
      <td colSpan={2} style={{ ...tdStyle, ...grandTotalRowStyle }}>
        Grand Total
      </td>
      {usStates.map(usState => (
        <td key={usState} style={{ ...tdStyle, ...grandTotalRowStyle }}>
          {columnGrandTotals[usState]?.toLocaleString() || '-'}
        </td>
      ))}
      <td style={{ ...tdStyle, ...grandTotalRowStyle }}>
        {ultimateGrandTotal.toLocaleString()}
      </td>
    </tr>
  );
};

export default GrandTotalRow;
