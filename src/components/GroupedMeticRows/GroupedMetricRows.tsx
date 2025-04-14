import React, { ReactElement } from 'react';
import {
  categoryStyle,
  tdStyle,
  totalRowStyle,
} from '../PivotBody/PivotBody.styles';
import TotalRow from './TotalRow';
import { useAppSelector } from '../../redux/store';
import {
  selectGroupTotals,
  selectUniqueStates,
} from '../../redux/features/orders/ordersSelectors';

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
            <tr
              key={`${category}-${subCategory}`}
              data-testid={`${category}-${subCategory}-grouped-row`}
            >
              {index === 0 && (
                <td
                  data-testid={`${category}-${subCategory}-group-label`}
                  style={{ ...tdStyle, ...categoryStyle }}
                  rowSpan={Object.keys(subCategories).length + 1}
                >
                  {category}
                </td>
              )}
              <td
                data-testid={`${category}-${subCategory}-subgroup-label`}
                style={tdStyle}
              >
                {subCategory}
              </td>
              {usStates.map(state => (
                <td
                  data-testid={`${category}-${subCategory}-${state}-value`}
                  key={state}
                  style={tdStyle}
                >
                  {stateValues[state]?.toLocaleString() || '-'}
                </td>
              ))}
              <td
                data-testid={`${category}-${subCategory}-row-total`}
                style={{ ...tdStyle, fontWeight: 500 }}
              >
                {rowTotal.toLocaleString()}
              </td>
            </tr>
          );
        }
      )}

      <TotalRow
        groupTotalsByColumn={groupTotalsByColumn}
        groupGrandTotal={groupGrandTotal}
      />
    </React.Fragment>
  );
};

export default GroupedRows;
