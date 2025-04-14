import React, { ReactElement } from 'react';
import TopHeaderRow from './TopHeaderRow/TopHeaderRow';
import SubHeaderRow from './SubHeaderRow/SubHeaderRow';

const PivotHeader = (): ReactElement => {
  return (
    <thead>
      <TopHeaderRow />
      <SubHeaderRow />
    </thead>
  );
};

export default PivotHeader;
