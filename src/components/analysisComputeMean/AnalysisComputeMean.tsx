import { useMemo } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import "./AnalysisComputeMean.css";

// hook to get counts dynamically
import { useCalculateTableCounts } from "../../hooks/useCalculateTableCounts";

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

const AnalysisComputeMean = () => {
  const stateCounts = useCalculateTableCounts();
  const N = stateCounts.length;

  const total = useMemo(() => stateCounts.reduce((sum, c) => sum + c.count, 0), [stateCounts]);
  const mean = total / N;

  // const countsStr = stateCounts.map(c => c.count).join(", ");

  return (
    <MathJaxContext version={3} config={config}>
      <div className="analysis-compute-mean">
        <h2 className="analysis-subtitle">Compute the Mean</h2>
        <p>The formula for the mean is:</p>
        <MathJax hideUntilTypeset="first" dynamic>
          {`$$\\overline{x} = \\frac{1}{N} \\sum_{i=1}^{N} x_i$$`}
        </MathJax>

        <p>Using the company counts per state, the counts array is:</p>
        <div className="counts-array">
            <MathJax inline dynamic>{"$[$"}</MathJax>
            {stateCounts.map((c, i) => (
                <span key={c.state}>
                <MathJax inline dynamic>{`$${c.count}$`}</MathJax>
                {i < stateCounts.length - 1 ? ", " : ""}
                {(i + 1) % 34 === 0 ? <br /> : ""}
                </span>
            ))}
            <MathJax inline dynamic>{"$]$"}</MathJax>
        </div>
        <br/>
        
        <p>Then:</p>
        <MathJax hideUntilTypeset="first" dynamic>
          {`$$\\overline{x} = \\frac{${total}}{${N}} = ${mean.toFixed(2)}$$`}
        </MathJax>
      </div>
    </MathJaxContext>
  );
};

export default AnalysisComputeMean;