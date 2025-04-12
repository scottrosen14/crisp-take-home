import React, { ReactElement } from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const PivotTableRow = ({ className, children }: Props): ReactElement => {
  return <tr className={className}>{children}</tr>;
};

export default PivotTableRow;
