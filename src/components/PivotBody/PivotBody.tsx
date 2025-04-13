import React, { ReactElement } from 'react';
import {
  categoryStyle,
  grandTotalRowStyle,
  tdStyle,
  totalRowStyle,
} from './PivotBody.styles';
import { ColumnGrandTotals, GroupedRowData } from '../../constants';
import { calculateGrandTotals } from '../../utils/pivotUtils';

interface Props {
  pivotRows: GroupedRowData;
  usStates: string[];
}

const PivotBody = ({ pivotRows, usStates }: Props): ReactElement => {
  const { columnGrandTotals, ultimateGrandTotal } = calculateGrandTotals(
    pivotRows,
    usStates
  );

  return (
    <tbody>
      {Object.entries(pivotRows).map(([category, subCategories]) => {
        // Calculate category totals for each state
        const categoryTotals: { [state: string]: number } = {};
        let categoryGrandTotal = 0;

        // Initialize totals
        usStates.forEach(state => {
          categoryTotals[state] = 0;
        });

        // Calculate totals
        Object.values(subCategories).forEach(stateValues => {
          usStates.forEach(state => {
            const value = stateValues[state] || 0;
            categoryTotals[state] += value;
            categoryGrandTotal += value;
          });
        });

        return (
          <React.Fragment key={category}>
            {Object.entries(subCategories).map(
              ([subCategory, stateValues], index) => {
                // Calculate row total
                const rowTotal = usStates.reduce(
                  (sum, state) => sum + (stateValues[state] || 0),
                  0
                );

                return (
                  <tr key={`${category}-${subCategory}`}>
                    {index === 0 && (
                      <td
                        style={{ ...tdStyle, ...categoryStyle }}
                        rowSpan={Object.keys(subCategories).length + 1} // +1 for the total row
                      >
                        {category}
                      </td>
                    )}
                    <td style={tdStyle}>{subCategory}</td>
                    {usStates.map(state => (
                      <td key={state} style={tdStyle}>
                        {stateValues[state]?.toLocaleString() || '-'}
                      </td>
                    ))}
                    <td style={{ ...tdStyle, fontWeight: 500 }}>
                      {rowTotal.toLocaleString()}
                    </td>
                  </tr>
                );
              }
            )}

            {/* Category total row */}
            <tr style={totalRowStyle}>
              <td style={{ ...tdStyle, ...totalRowStyle }}>Total</td>
              {usStates.map(state => (
                <td key={state} style={{ ...tdStyle, ...totalRowStyle }}>
                  {categoryTotals[state]?.toLocaleString() || '-'}
                </td>
              ))}
              <td style={{ ...tdStyle, ...totalRowStyle }}>
                {categoryGrandTotal.toLocaleString()}
              </td>
            </tr>
          </React.Fragment>
        );
      })}

      {/* Grand total row */}
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
    </tbody>
  );
};

export default PivotBody;
