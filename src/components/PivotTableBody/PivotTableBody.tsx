import React from 'react';

interface Props {
  pivotRows: {
    [category: string]: {
      [subCategory: string]: {
        [state: string]: number;
      };
    };
  };
  states: string[];
}

const tdStyle: React.CSSProperties = {
  padding: '10px 14px',
  border: '1px solid #ddd',
};

const categoryStyle: React.CSSProperties = {
  fontWeight: 500,
  backgroundColor: '#fafafa',
};

const totalRowStyle: React.CSSProperties = {
  fontWeight: 600,
  backgroundColor: '#f0f0f0',
};

const grandTotalRowStyle: React.CSSProperties = {
  fontWeight: 700,
  backgroundColor: '#e0e0e0',
  fontSize: '1.05em',
};

const PivotTableBody: React.FC<Props> = ({ pivotRows, states }) => {
  // Calculate grand totals across all categories
  const grandTotals: { [state: string]: number } = {};
  let grandTotal = 0;
  
  // Initialize grand totals
  states.forEach(state => {
    grandTotals[state] = 0;
  });
  
  // Calculate grand totals
  Object.values(pivotRows).forEach(subCategories => {
    Object.values(subCategories).forEach(stateValues => {
      states.forEach(state => {
        const value = stateValues[state] || 0;
        grandTotals[state] += value;
        grandTotal += value;
      });
    });
  });

  return (
    <tbody>
      {Object.entries(pivotRows).map(([category, subCategories]) => {
        // Calculate category totals for each state
        const categoryTotals: { [state: string]: number } = {};
        let categoryGrandTotal = 0;

        // Initialize totals
        states.forEach(state => {
          categoryTotals[state] = 0;
        });

        // Calculate totals
        Object.values(subCategories).forEach(stateValues => {
          states.forEach(state => {
            const value = stateValues[state] || 0;
            categoryTotals[state] += value;
            categoryGrandTotal += value;
          });
        });

        return (
          <React.Fragment key={category}>
            {Object.entries(subCategories).map(([subCategory, stateValues], index) => {
              // Calculate row total
              const rowTotal = states.reduce((sum, state) => sum + (stateValues[state] || 0), 0);

              return (
                <tr key={`${category}-${subCategory}`}>
                  {index === 0 && (
                    <td
                      style={{ ...tdStyle, ...categoryStyle }}
                      rowSpan={Object.keys(subCategories).length + 1} // +1 for the total row
                    >
                      {category}
                    </td>
                  )}
                  <td style={tdStyle}>{subCategory}</td>
                  {states.map(state => (
                    <td key={state} style={tdStyle}>
                      {stateValues[state]?.toLocaleString() || '-'}
                    </td>
                  ))}
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{rowTotal.toLocaleString()}</td>
                </tr>
              );
            })}

            {/* Category total row */}
            <tr style={totalRowStyle}>
              <td style={{ ...tdStyle, ...totalRowStyle }}>Total</td>
              {states.map(state => (
                <td key={state} style={{ ...tdStyle, ...totalRowStyle }}>
                  {categoryTotals[state]?.toLocaleString() || '-'}
                </td>
              ))}
              <td style={{ ...tdStyle, ...totalRowStyle }}>
                {categoryGrandTotal.toLocaleString()}
              </td>
            </tr>
          </React.Fragment>
        );
      })}
      
      {/* Grand total row */}
      <tr style={grandTotalRowStyle}>
        <td 
          colSpan={2} 
          style={{ ...tdStyle, ...grandTotalRowStyle }}
        >
          Grand Total
        </td>
        {states.map(state => (
          <td key={state} style={{ ...tdStyle, ...grandTotalRowStyle }}>
            {grandTotals[state]?.toLocaleString() || '-'}
          </td>
        ))}
        <td style={{ ...tdStyle, ...grandTotalRowStyle }}>
          {grandTotal.toLocaleString()}
        </td>
      </tr>
    </tbody>
  );
};

export default PivotTableBody;
