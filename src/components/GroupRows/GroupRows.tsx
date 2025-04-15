import React, { Fragment, ReactElement } from 'react';
import {
  categoryStyle as groupStyle,
  tdStyle,
  totalRowStyle,
} from '../PivotBody/PivotBody.styles';
import GroupTotalRow from './GroupTotalRow/GroupTotalRow';
import GroupMetricRows from './GroupMetricRows/GroupMetricRows';
import { useAppSelector } from '../../redux/store';
import { selectGroupTotals } from '../../redux/features/orders/ordersSelectors';
import { Group, ColumnMetrics } from '../../constants/constants';

interface Props {
  groupName: string;
  subGroups: Group;
  columns: string[];
}

const GroupRows = ({ groupName, subGroups, columns }: Props): ReactElement => {
  const { groupTotalsByColumn, groupGrandTotal } = useAppSelector(state =>
    selectGroupTotals(state, groupName, subGroups)
  );

  return (
    <Fragment data-testid={`${groupName}-group-rows`} key={groupName}>
      <GroupMetricRows
        groupName={groupName}
        subGroups={subGroups}
        columns={columns}
      />

      <GroupTotalRow
        groupTotalsByColumn={groupTotalsByColumn}
        groupGrandTotal={groupGrandTotal}
        columns={columns}
      />
    </Fragment>
  );
};

export default GroupRows;
