import { useState, useEffect } from "react";
import { feature } from "topojson-client";

// components
import AnalysisIntroduction from "../../components/analysisIntroduction/AnalysisIntroduction";
import AnalysisTable from "../../components/analysisTable/AnalysisTable";
import AnalysisNeighbourMatrix from "../../components/analysisNeighbourMatrix/AnalysisNeighbourMatrix";
import AnalysisMoranEquation from "../../components/analysisMoranEquation/AnalysisMoranEquation";
import AnalysisComputeMean from "../../components/analysisComputeMean/AnalysisComputeMean";
import AnalysisCalculateWeight from "../../components/analysisCalculateWeight/AnalysisCalculateWeight";
import AnalysisNumeratorMatrix from "../../components/analysisNumeratorMatrix/AnalysisNumeratorMatrix";

// hooks
import { useMoransI } from "../../hooks/useMoransI";
import { useCalculateTableCounts } from "../../hooks/useCalculateTableCounts";

// types
import type { FeatureCollection } from "geojson";

// css
import "./Analysis.css";

const Analysis = () => {
  const [selectedProperty] = useState("CENSUSAREA");
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  // Inside your Analysis component, before return
const stateCounts = useCalculateTableCounts();
const values = stateCounts.map((s) => s.count); // x_i values
  const emptyGeoJSON: FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };

  const { neighbors } = useMoransI({
    geojson: geojson ?? emptyGeoJSON,
    valueProperty: selectedProperty,
    contiguity: "queen",
    debug: false,
  });

  // Optional: labels for states
  const stateLabels = geojson?.features.map((f) => f.properties?.NAME || "");

  // Fetch TopoJSON and convert → GeoJSON
  useEffect(() => {
    const topoUrl = import.meta.env.BASE_URL + "data/us_states_5m.topojson";

    fetch(topoUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch TopoJSON: ${res.status}`);
        return res.json();
      })
      .then((topoData) => {
        if (!topoData.objects?.us_states_5m) {
          throw new Error("TopoJSON object 'us_states_5m' not found");
        }

        // Convert TopoJSON to GeoJSON (cast via unknown to satisfy TS)
        const geo = feature(
          topoData,
          topoData.objects.us_states_5m
        ) as unknown as FeatureCollection;

        setGeojson(geo);
      })
      .catch((err) => console.error("Failed to load topojson", err));
  }, []);

  return (
    <div className="analysis-container">
      <h1 className="analysis-title">Spatial Analysis</h1>

      <AnalysisIntroduction />

      <AnalysisMoranEquation />

      <AnalysisTable />

      <AnalysisComputeMean />

      <AnalysisNeighbourMatrix neighbors={neighbors} stateLabels={stateLabels} />

      <AnalysisCalculateWeight neighbors={neighbors} stateLabels={stateLabels} />

      <AnalysisNumeratorMatrix neighbors={neighbors} values={values} stateLabels={stateLabels} />

    </div>
  );
};

export default Analysis;