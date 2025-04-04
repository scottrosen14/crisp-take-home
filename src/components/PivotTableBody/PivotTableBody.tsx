import React from "react";

interface PivotTableBodyProps {
  pivotRows: {
    [category: string]: {
      [subCategory: string]: {
        [state: string]: number;
      };
    };
  };
  states: string[];
}

const PivotTableBody: React.FC<PivotTableBodyProps> = ({ pivotRows, states }) => {
  return (
    <tbody>
      {Object.entries(pivotRows).map(([category, subs]) =>
        Object.entries(subs).map(([subCategory, stateSales], idx) => (
          <tr key={`${category}-${subCategory}`}>
            {idx === 0 && (
              <td
                rowSpan={Object.keys(subs).length}
                style={{
                  padding: "10px",
                  fontWeight: "bold",
                  backgroundColor: "#f4f4f4",
                  border: "1px solid #ddd",
                }}
              >
                {category}
              </td>
            )}
            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
              {subCategory}
            </td>
            {states.map((state) => (
              <td
                key={state}
                style={{
                  padding: "10px",
                  textAlign: "center",
                  border: "1px solid #ddd",
                }}
              >
                {stateSales[state] ? stateSales[state].toFixed(0) : 0}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default PivotTableBody; 