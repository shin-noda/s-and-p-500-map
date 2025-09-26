import { MathJax, MathJaxContext } from "better-react-mathjax";
import MatrixViewer from "../matrixViewer/MatrixViewer";
import "./AnalysisNumeratorMatrix.css";

interface AnalysisNumeratorMatrixProps {
  neighbors: number[][]; // adjacency list or weight matrix
  values: number[];       // x_i for each state
  stateLabels?: string[];
}

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  }
};

const AnalysisNumeratorMatrix: React.FC<AnalysisNumeratorMatrixProps> = ({
  neighbors,
  values,
  stateLabels
}) => {
  const N = values.length;
  if (N === 0 || neighbors.length === 0) return null;

  // Compute the mean of values
  const mean = values.reduce((sum, v) => sum + v, 0) / N;

  // Detect whether neighbors is a full weight matrix
  const isWeightMatrix = neighbors.every(
    (row) => Array.isArray(row) && row.length === N && row.every((v) => v === 0 || v === 1)
  );

  // Build NxN numerator matrix
  const numeratorMatrix: number[][] = Array.from({ length: N }, (_, i) =>
    Array.from({ length: N }, (_, j) => {
      const w_ij = isWeightMatrix
        ? neighbors[i][j]
        : Array.isArray(neighbors[i]) && neighbors[i].includes(j)
        ? 1
        : 0;

      return w_ij * (values[i] - mean) * (values[j] - mean);
    })
  );

  // Compute total numerator
  const totalNumerator = numeratorMatrix.flat().reduce((sum, v) => sum + v, 0);

  return (
    <MathJaxContext version={3} config={config}>
      <div className="analysis-numerator-matrix">
        <h2 className="analysis-subtitle">Numerator Matrix</h2>

        <p>
          Compute the numerator:{" "}Numerator 
          <MathJax inline dynamic>
            {` $ = \\sum_i \\sum_j w_{ij} (x_i - \\overline{x}) (x_j - \\overline{x})$`}
          </MathJax>
        </p>

        <p>
            Matrix values for each pair:{" "}
            <MathJax inline dynamic>
                {`$w_{ij} \\cdot (x_i - \\overline{x}) \\cdot (x_j - \\overline{x})$`}
            </MathJax>
        </p><br/>

        <MatrixViewer matrix={numeratorMatrix} labels={stateLabels} />

        <p style={{ marginTop: 12, fontWeight: "bold" }}>
          Numerator<MathJax inline dynamic>{` $= ${totalNumerator}$`}</MathJax>
        </p>
      </div>
    </MathJaxContext>
  );
};

export default AnalysisNumeratorMatrix;