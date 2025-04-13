import React, { ReactElement } from 'react';
import { useAppSelector } from '../../redux/store';
import {
  selectGrandTotals,
  selectUniqueStates,
  selectPivotRows,
} from '../../redux/features/ordersSlice';
import GroupedRows from '../GroupedRows/GroupedRows';
import GrandTotalRow from '../GrandTotalRow/GrandTotalRow';

const PivotBody = (): ReactElement => {
  const usStates = useAppSelector(selectUniqueStates);
  const pivotRows = useAppSelector(selectPivotRows);
  const { columnGrandTotals, ultimateGrandTotal } =
    useAppSelector(selectGrandTotals);

  return (
    <tbody>
      {Object.entries(pivotRows).map(([category, subCategories]) => (
        <GroupedRows
          key={category}
          category={category}
          subCategories={subCategories}
        />
      ))}

      <GrandTotalRow
        columnGrandTotals={columnGrandTotals}
        ultimateGrandTotal={ultimateGrandTotal}
      />
    </tbody>
  );
};

export default PivotBody;
