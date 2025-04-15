import React, { ReactElement } from 'react';
import {
  tdStyle,
  categoryStyle as groupStyle,
} from '../../PivotBody/PivotBody.styles';
import { ColumnValues } from '../../../constants/constants';

type SubGroupEntry = [string, ColumnValues];

interface Props {
  groupName: string;
  subGroups: Record<string, ColumnValues>;
  columns: string[];
}

const GroupMetricRows = ({
  groupName,
  subGroups,
  columns,
}: Props): ReactElement => {
  return (
    <>
      {Object.entries(subGroups).map(
        ([subGroupName, columnValues]: SubGroupEntry, index) => {
          const rowTotal = columns.reduce(
            (sum: number, columnName: string) =>
              sum + (columnValues[columnName] || 0),
            0
          );

          return (
            <tr
              key={`${groupName}-${subGroupName}`}
              data-testid={`${groupName}-${subGroupName}-group-metric-rows`}
            >
              {index === 0 && (
                <td
                  data-testid={`${groupName}-group-name`}
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
              {columns.map(columnName => {
                return (
                  <td
                    data-testid={`${groupName}-${subGroupName}-${columnName}-metric`}
                    key={columnName}
                    style={tdStyle}
                  >
                    {columnValues[columnName] === undefined
                      ? '-'
                      : Math.round(
                          columnValues[columnName]
                        )?.toLocaleString() || '-'}
                  </td>
                );
              })}
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
    </>
  );
};

export default GroupMetricRows;
