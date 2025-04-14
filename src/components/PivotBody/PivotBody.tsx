import React, { ReactElement } from 'react';
import { useAppSelector } from '../../redux/store';
import {
  selectGrandTotals,
  selectUniqueStates,
  selectPivotRows,
} from '../../redux/features/orders/ordersSelectors';
import GroupedRows from '../GroupedMeticRows/GroupedMetricRows';
import GrandTotalRow from '../GrandTotalRow/GrandTotalRow';
import { GroupedRowData, SubGroup } from '../../constants/constants';

type GroupedRowEntry = [string, SubGroup];

const PivotBody = (): ReactElement => {
  const groupedRowData: GroupedRowData = useAppSelector(selectPivotRows);
  const { columnGrandTotals, ultimateGrandTotal } =
    useAppSelector(selectGrandTotals);

  return (
    <tbody>
      {Object.entries(groupedRowData).map(
        ([groupName, subGroup]: GroupedRowEntry) => (
          <GroupedRows
            key={groupName}
            groupName={groupName}
            subGroup={subGroup}
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
