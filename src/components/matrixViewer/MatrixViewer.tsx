// /components/matrixViewer/MatrixViewer.tsx
import React from "react";
import "./MatrixViewer.css";

interface MatrixViewerProps {
  matrix: number[][];
  labels?: string[]; // optional labels for rows/cols (like state names)
}

/**
 * MatrixViewer component
 * Renders a large adjacency/weight matrix in a scrollable table.
 */
const MatrixViewer: React.FC<MatrixViewerProps> = ({ matrix, labels }) => {
  if (!matrix || matrix.length === 0) {
    return <div className="matrix-empty">No matrix data available.</div>;
  }

  const n = matrix.length;

  return (
    <div className="matrix-container">
      <table className="matrix-table">
        <thead>
          <tr>
            <th className="sticky corner"></th>
            {Array.from({ length: n }).map((_, j) => (
              <th key={j} className="sticky top">
                {labels ? labels[j] : j}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              <th className="sticky left">
                {labels ? labels[i] : i}
              </th>
              {row.map((val, j) => (
                <td key={j} className={val !== 0 ? "active" : ""}>
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixViewer;