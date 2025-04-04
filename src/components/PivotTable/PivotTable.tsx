import React, { useMemo } from "react";
import {Order} from "../../constants";
import PivotTableBody from "../PivotTableBody/PivotTableBody";
import PivotTableHeader from "../PivotTableHeader/PivotTableHeader";

interface PivotData {
  [category: string]: {
    [subCategory: string]: number;
  };
}

interface Props {
  data: Order[];
}

const tableStyle: React.CSSProperties = {
  borderCollapse: "collapse",
  width: "80%",
  margin: "20px auto",
  fontFamily: "Arial, sans-serif",
};

const thStyle: React.CSSProperties = {
  backgroundColor: "#f4f4f4",
  padding: "12px 16px",
  border: "1px solid #ddd",
  textAlign: "left",
  fontWeight: 600,
};

const tdStyle: React.CSSProperties = {
  padding: "10px 14px",
  border: "1px solid #ddd",
};

const categoryStyle: React.CSSProperties = {
  fontWeight: 500,
  backgroundColor: "#fafafa",
};

const PivotTable: React.FC<Props> = ({ data }) => {
  // Get all unique states
  const states = useMemo(() => {
    const stateSet = new Set(data.map((d) => d.state));
    return Array.from(stateSet).sort();
  }, [data]);

  // Get pivot structure
  const pivotRows = useMemo(() => {
    const grouped: {
      [category: string]: {
        [subCategory: string]: {
          [state: string]: number;
        };
      };
    } = {};

    data.forEach(({ category, subCategory, state, sales }) => {
      if (!grouped[category]) grouped[category] = {};
      if (!grouped[category][subCategory]) grouped[category][subCategory] = {};
      if (!grouped[category][subCategory][state]) {
        grouped[category][subCategory][state] = 0;
      }
      grouped[category][subCategory][state] += sales;
    });

    return grouped;
  }, [data]);

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "Arial, sans-serif" }}>
        <PivotTableHeader states={states} />
        <PivotTableBody pivotRows={pivotRows} states={states} />
      </table>
    </div>
  );
};

export default PivotTable;
