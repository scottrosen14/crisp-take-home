import React from "react";

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
  padding: "10px 14px",
  border: "1px solid #ddd",
};

const categoryStyle: React.CSSProperties = {
  fontWeight: 500,
  backgroundColor: "#fafafa",
};

const totalRowStyle: React.CSSProperties = {
  fontWeight: 600,
  backgroundColor: "#f0f0f0",
};

const PivotTableBody: React.FC<Props> = ({ pivotRows, states }) => {
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
                  {states.map((state) => (
                    <td key={state} style={tdStyle}>
                      {stateValues[state]?.toLocaleString() || "-"}
                    </td>
                  ))}
                  <td style={{ ...tdStyle, fontWeight: 500 }}>{rowTotal.toLocaleString()}</td>
                </tr>
              );
            })}
            
            {/* Category total row */}
            <tr style={totalRowStyle}>
              <td style={{ ...tdStyle, ...totalRowStyle }}>Total</td>
              {states.map((state) => (
                <td key={state} style={{ ...tdStyle, ...totalRowStyle }}>
                  {categoryTotals[state]?.toLocaleString() || "-"}
                </td>
              ))}
              <td style={{ ...tdStyle, ...totalRowStyle }}>{categoryGrandTotal.toLocaleString()}</td>
            </tr>
          </React.Fragment>
        );
      })}
    </tbody>
  );
};

export default PivotTableBody; 