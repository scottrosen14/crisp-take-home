import React, { ReactElement } from 'react';
import './PivotHeader.css';

interface Props {
  states: string[];
}

const PivotHeader = ({ states }: Props): ReactElement => {
  return (
    <thead>
      <tr className="pivot-table-header-row">
        <th colSpan={2} className="products-header">
          PRODUCTS
        </th>
        <th className="states-header">STATES</th>
        <th colSpan={states.length + 1} className="products-header"></th>
      </tr>
      <tr>
        <th className="column-header">Category</th>
        <th className="column-header">Sub-Category</th>
        {states.map(state => (
          <th key={state} className="column-header">
            {state}
          </th>
        ))}
        <th className="column-header">Total</th>
      </tr>
    </thead>
  );
};

export default PivotHeader;
