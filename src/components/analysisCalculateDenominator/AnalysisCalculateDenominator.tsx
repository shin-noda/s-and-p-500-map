import { MathJax, MathJaxContext } from "better-react-mathjax";
import "./AnalysisCalculateDenominator.css"; // reuse the same css

interface AnalysisCalculateDenominatorProps {
  values: number[];       // x_i values
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

const AnalysisCalculateDenominator = ({ values }: AnalysisCalculateDenominatorProps) => {
  const N = values.length;
  if (N === 0) return null;

  // Step 1: compute mean
  const mean = values.reduce((sum, v) => sum + v, 0) / N;

  // Step 2: compute squared deviations
  const squaredDeviations = values.map((v) => (v - mean) ** 2);
  const totalDenominator = squaredDeviations.reduce((a, b) => a + b, 0);

  return (
    <MathJaxContext version={3} config={config}>
      <div className="analysis-calc-weight">
        <h2 className="analysis-subtitle">Calculate Denominator</h2>

        <p>
          Compute the denominator:{" "}
          <MathJax inline dynamic>{"$\\sum_i (x_i - \\overline{x})^2$"}</MathJax>
        </p>

        <p>Squared deviations for each value:</p>
        <div className="row-sums">
          <MathJax inline dynamic>{"$[$"}</MathJax>
          {squaredDeviations.map((val, i) => (
            <span key={i}>
              <MathJax inline dynamic>{`$${val}$`}</MathJax>
              {i < squaredDeviations.length - 1 ? " + " : ""}
              {(i + 1) % 4 === 0 ? <br /> : ""}
            </span>
          ))}
          <MathJax inline dynamic>{"$]$"}</MathJax>
        </div>

        <p className="analysis-subsubtitle">
          Total Denominator <MathJax inline dynamic>{"$\\sum_i (x_i - \\overline{x})^2 = $"}</MathJax>
        </p>
        <MathJax dynamic>{`$${totalDenominator}$`}</MathJax>
      </div>
    </MathJaxContext>
  );
};

export default AnalysisCalculateDenominator;