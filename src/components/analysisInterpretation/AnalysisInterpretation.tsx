import "./AnalysisInterpretation.css";

interface AnalysisInterpretationProps {
  moransI: number; // the computed Moran's I value
}

const AnalysisInterpretation: React.FC<AnalysisInterpretationProps> = ({ moransI }) => {
  let interpretation = "";
  let color = "";

  // Interpret Moran's I
  if (moransI < -0.5) {
    interpretation = "Strong negative spatial autocorrelation (checkerboard / dispersed pattern).";
    color = "#EF4444"; // red
  } else if (moransI < -0.1) {
    interpretation = "Moderate negative spatial autocorrelation (some dispersion).";
    color = "#F87171"; // light red
  } else if (moransI < 0.1) {
    interpretation = "Near zero, indicating a mostly random spatial pattern.";
    color = "#FBBF24"; // amber
  } else if (moransI < 0.5) {
    interpretation = "Moderate positive spatial autocorrelation (some clustering).";
    color = "#34D399"; // light green
  } else {
    interpretation = "Strong positive spatial autocorrelation (high clustering).";
    color = "#059669"; // green
  }

  return (
    <div className="analysis-interpretation">
      <h2 className="analysis-subtitle">Interpretation of Moran&apos;s I</h2>
      <p>
        Computed Moran&apos;s I value: <span className="morans-value" style={{ color }}>{moransI.toFixed(3)}</span>
      </p>
      <p className="interpretation-text">{interpretation}</p>

      <div className="scale-legend">
        <div className="legend-item" style={{ backgroundColor: "#EF4444" }}>-1: Strong negative (dispersed)</div>
        <div className="legend-item" style={{ backgroundColor: "#F87171" }}>-0.5 to -0.1: Moderate negative</div>
        <div className="legend-item" style={{ backgroundColor: "#FBBF24" }}>≈0: Random</div>
        <div className="legend-item" style={{ backgroundColor: "#34D399" }}>0.1 to 0.5: Moderate positive (clustering)</div>
        <div className="legend-item" style={{ backgroundColor: "#059669" }}>1: Strong positive (high clustering)</div>
      </div>
    </div>
  );
};

export default AnalysisInterpretation;