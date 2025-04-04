import React from "react";

interface PivotTableHeaderProps {
  states: string[];
}

const PivotTableHeader: React.FC<PivotTableHeaderProps> = ({ states }) => {
  return (
    <thead style={{ backgroundColor: "#1e2a78", color: "white" }}>
      <tr>
        <th style={{ padding: "10px", textAlign: "left" }}>Category</th>
        <th style={{ padding: "10px", textAlign: "left" }}>Sub-Category</th>
        {states.map((state) => (
          <th key={state} style={{ padding: "10px", textAlign: "center" }}>
            {state}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default PivotTableHeader;
