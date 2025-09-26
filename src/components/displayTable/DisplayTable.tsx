import React from "react";
import { useCalculateTableCounts } from "../../hooks/useCalculateTableCounts";
import "./DisplayTable.css";

const DisplayTable: React.FC = () => {
  const stateCounts = useCalculateTableCounts();

  return (
    <div className="display-table-container">
      <h2>Company Counts per State</h2>
      <table className="display-table">
        <thead>
          <tr>
            <th>State</th>
            <th>Name</th>
            <th>Company Count</th>
          </tr>
        </thead>
        <tbody>
          {stateCounts.map((state) => (
            <tr key={state.state}>
              <td>{state.state}</td>
              <td>{state.name}</td>
              <td>{state.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;