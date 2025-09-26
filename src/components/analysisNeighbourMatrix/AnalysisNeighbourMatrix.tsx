// src/components/analysisNeighbourMatrix/AnalysisNeighbourMatrix.tsx
import { useMemo } from "react";

// components
import MatrixViewer from "../matrixViewer/MatrixViewer";

// css
import "./AnalysisNeighbourMatrix.css";

interface AnalysisNeighbourMatrixProps {
  neighbors: number[][];
  stateLabels?: string[];
}

const AnalysisNeighbourMatrix: React.FC<AnalysisNeighbourMatrixProps> = ({
  neighbors,
  stateLabels = [],
}) => {
  // Convert neighbors to symmetric 0/1 matrix for MatrixViewer
  const weightMatrix = useMemo(() => {
    const N = neighbors.length;
    const matrix: number[][] = Array.from({ length: N }, () =>
      Array(N).fill(0)
    );
    for (let i = 0; i < N; i++) {
      for (const j of neighbors[i]) {
        matrix[i][j] = 1;
        matrix[j][i] = 1; // ensure symmetry
      }
    }
    return matrix;
  }, [neighbors]);

  return (
    <div className="analysis-neighbour-matrix">
      <h2 className="analysis-subtitle">Neighbour Matrix</h2>
      Next, we are going to calculate the neighbor matrix of states (only 48
      states for this project). The matrix is 48 × 48 in size and is symmetrical.
      This matrix shows which states touch each other. Non-zero values indicate
      neighbors used in calculating Moran's I. <br />
      <br />
      For example, if you look at the 4th column (Colorado) and 2nd row
      (Arizona), the value is 1. This means that Colorado and Arizona are
      neighbors. Also, the 1st row and column (Alabama) is 0, because a state
      cannot be a neighbor to itself. <br />
      <br />
      {weightMatrix.length > 0 ? (
        <MatrixViewer matrix={weightMatrix} labels={stateLabels} />
      ) : (
        <p>No neighbor data available.</p>
      )}
    </div>
  );
};

export default AnalysisNeighbourMatrix;