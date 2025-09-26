import { MathJax, MathJaxContext } from "better-react-mathjax";
import "./AnalysisCalculateI.css";

interface AnalysisCalculateIProps {
  numerator: number;
  denominator: number;
  totalWeight: number;
  numStates: number;
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

const AnalysisCalculateI: React.FC<AnalysisCalculateIProps> = ({
  numerator,
  denominator,
  totalWeight,
  numStates
}) => {
  if (numStates === 0 || totalWeight === 0 || denominator === 0) return null;

  const I = (numStates / totalWeight) * (numerator / denominator);

  return (
    <MathJaxContext version={3} config={config}>
      <div className="analysis-calc-weight">
        <h2 className="analysis-subtitle">Moran’s I</h2>

        <p>
          Plug into Moran’s I formula:
        </p>

        <MathJax dynamic>
          {`$$I = \\frac{N}{W} \\cdot \\frac{numerator}{denominator} = 
          \\frac{${numStates}}{${totalWeight}} \\cdot \\frac{${numerator}}{${denominator}}$$`}
        </MathJax>

        <p style={{ marginTop: 12, fontWeight: "bold" }}>
          <MathJax dynamic>
            {`$I = ${((numStates / totalWeight).toFixed(3))} \\cdot ${(numerator / denominator).toFixed(3)} = ${I.toFixed(4)}$`}
          </MathJax>
        </p>
      </div>
    </MathJaxContext>
  );
};

export default AnalysisCalculateI;