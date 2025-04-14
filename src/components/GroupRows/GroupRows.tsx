import React, { Fragment, ReactElement } from 'react';
import {
  categoryStyle as groupStyle,
  tdStyle,
  totalRowStyle,
} from '../PivotBody/PivotBody.styles';
import GroupTotalRow from './GroupTotalRow/GroupTotalRow';
import { useAppSelector } from '../../redux/store';
import { selectGroupTotals } from '../../redux/features/orders/ordersSelectors';
import { SubGroups, ColumnMetrics } from '../../constants/constants';

type SubGroupEntry = [string, ColumnMetrics];

interface Props {
  groupName: string;
  subGroups: SubGroups;
  columns: string[];
}

const GroupRows = ({ groupName, subGroups, columns }: Props): ReactElement => {
  const { groupTotalsByColumn, groupGrandTotal } = useAppSelector(state =>
    selectGroupTotals(state, groupName, subGroups)
  );

  return (
    <Fragment data-testid={`${groupName}-group-rows`} key={groupName}>
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
              {columns.map(columnName => (
                <td
                  data-testid={`${groupName}-${subGroupName}-${columnName}-metric`}
                  key={columnName}
                  style={tdStyle}
                >
                  {columnMetrics[columnName]?.toLocaleString() || '-'}
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

      <GroupTotalRow
        groupTotalsByColumn={groupTotalsByColumn}
        groupGrandTotal={groupGrandTotal}
        columns={columns}
      />
    </Fragment>
  );
};

export default GroupRows;
