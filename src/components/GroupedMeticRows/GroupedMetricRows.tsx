import React, { ReactElement } from 'react';
import {
  categoryStyle as groupStyle,
  tdStyle,
  totalRowStyle,
} from '../PivotBody/PivotBody.styles';
import TotalRow from './TotalRow';
import { useAppSelector } from '../../redux/store';
import { selectGroupTotals } from '../../redux/features/orders/ordersSelectors';
import { SubGroups, ColumnMetrics } from '../../constants/constants';

interface Props {
  groupName: string;
  subGroups: SubGroups;
  columns: string[];
}

type SubGroupEntry = [string, ColumnMetrics];

const GroupedMetricRows = ({
  groupName,
  subGroups,
  columns,
}: Props): ReactElement => {
  const { groupTotalsByColumn, groupGrandTotal } = useAppSelector(state =>
    selectGroupTotals(state, groupName, subGroups)
  );

  return (
    <React.Fragment key={groupName}>
      {Object.entries(subGroups).map(
        ([subGroupName, columnMetrics]: SubGroupEntry, index) => {
          const rowTotal = columns.reduce(
            (sum: number, columnName: string) =>
              sum + (columnMetrics[columnName] || 0),
            0
          );

          return (
            <tr
              key={`${groupName}-${subGroupName}`}
              data-testid={`${groupName}-${subGroupName}-grouped-row`}
            >
              {index === 0 && (
                <td
                  data-testid={`${groupName}-${subGroupName}-group-name`}
                  style={{ ...tdStyle, ...groupStyle }}
                  rowSpan={Object.keys(subGroups).length + 1}
                >
                  {groupName}
                </td>
              )}
              <td
                data-testid={`${groupName}-${subGroupName}-subgroup-name`}
                style={tdStyle}
              >
                {subGroupName}
              </td>
              {columns.map(state => (
                <td
                  data-testid={`${groupName}-${subGroupName}-${state}-metric`}
                  key={state}
                  style={tdStyle}
                >
                  {columnMetrics[state]?.toLocaleString() || '-'}
                </td>
              ))}
              <td
                data-testid={`${groupName}-${subGroupName}-row-total`}
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
        columns={columns}
      />
    </React.Fragment>
  );
};

export default GroupedMetricRows;
