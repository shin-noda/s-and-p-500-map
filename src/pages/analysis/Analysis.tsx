// /pages/analysis/Analysis.tsx
// components
import AnalysisIntroduction from "../../components/analysisIntroduction/AnalysisIntroduction";
import AnalysisTable from "../../components/analysisTable/AnalysisTable";
import AnalysisNeighbourMatrix from "../../components/analysisNeighbourMatrix/AnalysisNeighbourMatrix";
import AnalysisMoranEquation from "../../components/analysisMoranEquation/AnalysisMoranEquation";
import AnalysisComputeMean from "../../components/analysisComputeMean/AnalysisComputeMean";
import AnalysisCalculateWeight from "../../components/analysisCalculateWeight/AnalysisCalculateWeight";
import AnalysisNumeratorMatrix from "../../components/analysisNumeratorMatrix/AnalysisNumeratorMatrix";
import AnalysisCalculateDenominator from "../../components/analysisCalculateDenominator/AnalysisCalculateDenominator";
import AnalysisCalculateI from "../../components/analysisCalculateI/AnalysisCalculateI";
import AnalysisInterpretation from "../../components/analysisInterpretation/AnalysisInterpretation";
import AnalysisQuestion from "../../components/analysisQuestion/AnalysisQuestion";
import AnalysisConclusion from "../../components/analysisConclusion/AnalysisConclusion";

// hooks
import { useAnalysis } from "../../hooks/useAnalysis";

// css
import "./Analysis.css";

const Analysis = () => {
  // Use the custom hook to get everything needed
  const {
    neighbors,
    values,
    stateLabels,
    numerator,
    denominator,
    totalW,
    N,
    moransI
  } = useAnalysis({
    property: "CENSUSAREA",
  });

  return (
    <div className="analysis-container">
      <h1 className="analysis-title">Spatial Analysis</h1>

      <AnalysisIntroduction />

      <AnalysisQuestion />

      <AnalysisMoranEquation />

      <AnalysisTable />

      <AnalysisComputeMean />

      <AnalysisNeighbourMatrix neighbors={neighbors} stateLabels={stateLabels} />

      <AnalysisCalculateWeight neighbors={neighbors} stateLabels={stateLabels} />

      <AnalysisNumeratorMatrix neighbors={neighbors} values={values} stateLabels={stateLabels} />

      <AnalysisCalculateDenominator values={values} />
      
      <AnalysisCalculateI
        numerator={numerator}
        denominator={denominator}
        totalWeight={totalW}
        numStates={N}
      />

      <AnalysisInterpretation moransI={moransI} />

      <AnalysisConclusion />

    </div>
  );
};

export default Analysis;