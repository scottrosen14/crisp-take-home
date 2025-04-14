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
  groupName: string;
  subGroup: Record<string, Record<string, number>>;
}

const GroupedRows = ({
  groupName: group,
  subGroup,
}: GroupRowProps): ReactElement => {
  const usStates = useAppSelector(selectUniqueStates);
  const { groupTotalsByColumn, groupGrandTotal } = useAppSelector(state =>
    selectGroupTotals(state, group, subGroup)
  );

  return (
    <React.Fragment key={group}>
      {Object.entries(subGroup).map(([subCategory, stateValues], index) => {
        console.log(subCategory);
        const rowTotal = usStates.reduce(
          (sum, state) => sum + (stateValues[state] || 0),
          0
        );

        return (
          <tr
            key={`${group}-${subCategory}`}
            data-testid={`${group}-${subCategory}-grouped-row`}
          >
            {index === 0 && (
              <td
                data-testid={`${group}-${subCategory}-group-label`}
                style={{ ...tdStyle, ...categoryStyle }}
                rowSpan={Object.keys(subGroup).length + 1}
              >
                {group}
              </td>
            )}
            <td
              data-testid={`${group}-${subCategory}-subgroup-label`}
              style={tdStyle}
            >
              {subCategory}
            </td>
            {usStates.map(state => (
              <td
                data-testid={`${group}-${subCategory}-${state}-value`}
                key={state}
                style={tdStyle}
              >
                {stateValues[state]?.toLocaleString() || '-'}
              </td>
            ))}
            <td
              data-testid={`${group}-${subCategory}-row-total`}
              style={{ ...tdStyle, fontWeight: 500 }}
            >
              {rowTotal.toLocaleString()}
            </td>
          </tr>
        );
      })}

      <TotalRow
        groupTotalsByColumn={groupTotalsByColumn}
        groupGrandTotal={groupGrandTotal}
      />
    </React.Fragment>
  );
};

export default GroupedRows;
