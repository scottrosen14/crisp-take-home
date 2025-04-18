import React, { ReactElement } from 'react';
import { useAppSelector } from '../../redux/store';
import {
  selectGrandTotals,
  selectUniqueColumns,
  selectPivotRows,
} from '../../redux/features/orders/ordersSelectors';
import GroupRows from '../GroupRows/GroupRows';
import GrandTotalRow from '../GrandTotalRow/GrandTotalRow';
import { GroupedRowData, Group } from '../../constants/constants';

type GroupedRowEntry = [string, Group];

const PivotBody = (): ReactElement => {
  const columns: string[] = useAppSelector(selectUniqueColumns);
  const groupedRowData: GroupedRowData = useAppSelector(selectPivotRows);
  const { columnGrandTotals, ultimateGrandTotal } =
    useAppSelector(selectGrandTotals);

  return (
    <tbody>
      {Object.entries(groupedRowData).map(
        ([groupName, subGroups]: GroupedRowEntry) => (
          <GroupRows
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
