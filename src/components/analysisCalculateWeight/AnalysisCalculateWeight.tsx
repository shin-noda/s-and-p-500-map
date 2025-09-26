import { MathJax, MathJaxContext } from "better-react-mathjax";
import "./AnalysisCalculateWeight.css";

interface AnalysisCalculateWeightProps {
  neighbors: number[][];
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

const AnalysisCalculateWeight: React.FC<AnalysisCalculateWeightProps> = ({ neighbors }) => {
  const N = neighbors.length;

  // Detect if neighbors is a full NxN weight matrix
  const isWeightMatrix =
    N > 0 &&
    neighbors.every(
      (row) =>
        Array.isArray(row) &&
        row.length === N &&
        row.every((v) => v === 0 || v === 1)
    );

  // Row sums = number of neighbors per state
  const rowSums = isWeightMatrix
    ? neighbors.map((row) => row.reduce((acc, v) => acc + v, 0))
    : neighbors.map((row) => (Array.isArray(row) ? row.length : 0));

  const totalW = rowSums.reduce((a, b) => a + b, 0);

  return (
    <MathJaxContext version={3} config={config}>
      <div className="analysis-calc-weight">
        <h2 className="analysis-subtitle">Calculate Weight</h2>

        <p>
          For the weight matrix: <br />
          - Diagonal = 0 (no self-weight) <br />
          - Symmetric matrix
        </p>

        <h3 className="analysis-subsubtitle">
          Total Weight <MathJax inline dynamic>{`$W$`}</MathJax>
        </h3>
        <MathJax hideUntilTypeset="first" dynamic>
          {`$$W = \\sum_i \\sum_j w_{ij}$$`}
        </MathJax>

        <p>Summing the neighbors for each state (row sums):</p>

        <div className="counts-array">
          <MathJax inline dynamic>{"$W = $"}</MathJax>
          {rowSums.map((val, i) => (
            <span key={i}>
              <MathJax inline dynamic>{`$${val}$`}</MathJax>
              {i < rowSums.length - 1 ? " + " : ""}
              {(i + 1) % 25 === 0 ? <br /> : ""}
            </span>
          ))}
          <span> = </span>
          <MathJax inline dynamic>{`$${totalW}$`}</MathJax>
        </div>
      </div>
    </MathJaxContext>
  );
};

export default AnalysisCalculateWeight;