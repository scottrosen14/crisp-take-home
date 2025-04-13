import React, { ReactElement } from 'react';
import { categoryStyle, tdStyle, totalRowStyle } from './PivotBody.styles';

interface GroupRowProps {
  category: string;
  subCategories: Record<string, Record<string, number>>;
  usStates: string[];
  groupTotalsByColumn: Record<string, number>;
  groupGrandTotal: number;
}

const GroupRow = ({
  category,
  subCategories,
  usStates,
  groupTotalsByColumn,
  groupGrandTotal,
}: GroupRowProps): ReactElement => {
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
            {groupTotalsByColumn[state]?.toLocaleString() || '-'}
          </td>
        ))}
        <td style={{ ...tdStyle, ...totalRowStyle }}>
          {groupGrandTotal.toLocaleString()}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default GroupRow;
