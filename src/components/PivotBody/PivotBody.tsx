import React, { ReactElement } from 'react';
import { useAppSelector } from '../../redux/store';
import {
  selectGrandTotals,
  selectUniqueStates,
  selectPivotRows,
} from '../../redux/features/orders/ordersSelectors';
import GroupedMetricRows from '../GroupedMeticRows/GroupedMetricRows';
import GrandTotalRow from '../GrandTotalRow/GrandTotalRow';
import { GroupedRowData, SubGroups } from '../../constants/constants';

type GroupedRowEntry = [string, SubGroups];

const PivotBody = (): ReactElement => {
  const columns: string[] = useAppSelector(selectUniqueStates);
  const groupedRowData: GroupedRowData = useAppSelector(selectPivotRows);
  const { columnGrandTotals, ultimateGrandTotal } =
    useAppSelector(selectGrandTotals);

  return (
    <tbody>
      {Object.entries(groupedRowData).map(
        ([groupName, subGroups]: GroupedRowEntry) => (
          <GroupedMetricRows
            key={groupName}
            groupName={groupName}
            subGroups={subGroups}
            columns={columns}
          />
        )
      )}

      <GrandTotalRow
        columnGrandTotals={columnGrandTotals}
        ultimateGrandTotal={ultimateGrandTotal}
      />
    </tbody>
  );
};

export default PivotBody;
