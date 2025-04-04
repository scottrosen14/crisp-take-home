import React from 'react';

interface Props {
  states: string[];
}

const thStyle: React.CSSProperties = {
  backgroundColor: '#008885',
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: 600,
  color: '#FFFFFF',
};

const PivotTableHeader: React.FC<Props> = ({ states }) => {
  return (
    <thead>
      <tr style={{ backgroundColor: '#1e2a78', color: 'white' }}>
        <th
          colSpan={2}
          style={{ padding: '10px', textAlign: 'left', fontSize: '14px', fontWeight: 'bold' }}
        >
          PRODUCTS
        </th>
        <th
          style={{
            padding: '10px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            position: 'sticky',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          STATES
        </th>
        <th
          colSpan={states.length + 1}
          style={{ padding: '10px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}
        >
        </th>
      </tr>
      <tr>
        <th style={thStyle}>Category</th>
        <th style={thStyle}>Sub-Category</th>
        {states.map(state => (
          <th key={state} style={thStyle}>
            {state}
          </th>
        ))}
        <th style={thStyle}>Total</th>
      </tr>
    </thead>
  );
};

export default PivotTableHeader;
