import React, { ReactElement } from 'react';
import { GroupedRowData } from '../../constants';
import {
  calculateGrandTotals,
  calculateGroupTotals,
} from '../../utils/pivotUtils';
import GroupRow from './GroupRow';
import GrandTotalRow from './GrandTotalRow';

interface Props {
  pivotRows: GroupedRowData;
  usStates: string[];
}

const PivotBody = ({ pivotRows, usStates }: Props): ReactElement => {
  const { columnGrandTotals, ultimateGrandTotal } = calculateGrandTotals(
    pivotRows,
    usStates
  );

  return (
    <tbody>
      {Object.entries(pivotRows).map(([category, subCategories]) => {
        const { groupTotalsByColumn, groupGrandTotal } = calculateGroupTotals(
          usStates,
          subCategories
        );

        return (
          <GroupRow
            key={category}
            category={category}
            subCategories={subCategories}
            usStates={usStates}
            groupTotalsByColumn={groupTotalsByColumn}
            groupGrandTotal={groupGrandTotal}
          />
        );
      })}

      <GrandTotalRow
        columnGrandTotals={columnGrandTotals}
        ultimateGrandTotal={ultimateGrandTotal}
        usStates={usStates}
      />
    </tbody>
  );
};

export default PivotBody;
