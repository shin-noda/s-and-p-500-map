import { MathJax, MathJaxContext } from "better-react-mathjax";
import "./AnalysisMoranEquation.css";

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

const AnalysisMoranEquation = () => {
  return (
    <MathJaxContext version={3} config={config}>
      <div className="analysis-moran-equation">
        <h2 className="analysis-subtitle">Background</h2>
        <p>
          Moran’s I measures spatial autocorrelation. Essentially, it tells you
          whether similar values of a variable cluster together in space.
        </p>

        <h3 className="analysis-subsubtitle">Formula</h3>
        <MathJax hideUntilTypeset="first" dynamic>
          {`$$I = \\frac{N}{W} \\cdot \\frac{\\sum_i \\sum_j w_{ij} (x_i - \\overline{x})(x_j - \\overline{x})}{\\sum_i (x_i - \\overline{x})^2}$$`}
        </MathJax>

        <h3 className="analysis-subsubtitle">Where:</h3>
        <ul>
          <li>
            <MathJax inline dynamic>{`$N$`}</MathJax> = number of spatial units (e.g., polygons, counties)
          </li>
          <li>
            <MathJax inline dynamic>{`$x_i$`}</MathJax> = value of the variable at location i
          </li>
          <li>
            <MathJax inline dynamic>{`$\\overline{x}$`}</MathJax> = mean of the variable
          </li>
          <li>
            <MathJax inline dynamic>{`$w_{ij}$`}</MathJax> = spatial weight between i and j
          </li>
          <li>
            <MathJax inline dynamic>{`$W = \\sum_i \\sum_j w_{ij}$`}</MathJax> = sum of all spatial weights
          </li>
        </ul>

        <p>
          <b>Queen contiguity</b> means <MathJax inline dynamic>{`$w_{ij} = 1$`}</MathJax> if polygons i and j share any edge or vertex, otherwise <MathJax inline dynamic>{`$0$`}</MathJax>.
        </p>
      </div>
    </MathJaxContext>
  );
};

export default AnalysisMoranEquation;