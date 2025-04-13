import React, { ReactElement } from 'react';
import {
  categoryStyle,
  tdStyle,
  totalRowStyle,
} from '../PivotBody/PivotBody.styles';
import TotalRow from './TotalRow';
import { useAppSelector } from '../../redux/store';
import {
  selectUniqueStates,
  selectGroupTotals,
} from '../../redux/features/ordersSlice';

interface GroupRowProps {
  category: string;
  subCategories: Record<string, Record<string, number>>;
}

const GroupedRows = ({
  category,
  subCategories,
}: GroupRowProps): ReactElement => {
  const usStates = useAppSelector(selectUniqueStates);
  const { groupTotalsByColumn, groupGrandTotal } = useAppSelector(state =>
    selectGroupTotals(state, category, subCategories)
  );

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
      <TotalRow
        groupTotalsByColumn={groupTotalsByColumn}
        groupGrandTotal={groupGrandTotal}
      />
    </React.Fragment>
  );
};

export default GroupedRows;
