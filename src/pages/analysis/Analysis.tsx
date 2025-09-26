// /pages/analysis/Analysis.tsx
import React, { useState, useMemo } from "react";
import { useMoransI } from "../../utils/useMoransI";
import MatrixViewer from "../../components/matrixViewer/MatrixViewer";
import type { FeatureCollection } from "geojson";
import "./Analysis.css";

// Example: import your US states GeoJSON
import usStatesData from "../../../public/data/us_states_5m.json";

const Analysis: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState("CENSUSAREA");

  const { moransI, neighbors } = useMoransI({
    geojson: usStatesData as FeatureCollection,
    valueProperty: selectedProperty,
    contiguity: "queen",
    debug: false,
  });

  // Optional: labels for states
  const stateLabels = (usStatesData as FeatureCollection).features.map(
    (f) => f.properties?.NAME || ""
  );

  // Convert neighbors to symmetric 0/1 matrix for MatrixViewer
  const weightMatrix = useMemo(() => {
    const N = neighbors.length;
    const matrix: number[][] = Array.from({ length: N }, () => Array(N).fill(0));
    for (let i = 0; i < N; i++) {
      for (const j of neighbors[i]) {
        matrix[i][j] = 1;
        matrix[j][i] = 1; // ensure symmetry
      }
    }
    return matrix;
  }, [neighbors]);

  return (
    <div className="analysis-container">
      <h1 className="analysis-title">Spatial Analysis</h1>

      <p className="analysis-intro">
        Here we explore Moran's I for US states using the <strong>{selectedProperty}</strong> property.
      </p>

      <div>
        <label htmlFor="property-select">Select value property: </label>
        <select
          id="property-select"
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
        >
          <option value="CENSUSAREA">CENSUSAREA</option>
          {/* Add other numeric properties if available */}
        </select>
      </div>

      <h2 className="analysis-subtitle">Moran's I</h2>
      {isNaN(moransI) ? (
        <p>Could not compute Moran's I (check data).</p>
      ) : (
        <p>
          Moran's I: <strong>{moransI.toFixed(4)}</strong>{" "}
          {moransI > 0
            ? "(some clustering)"
            : moransI < 0
            ? "(some dispersion)"
            : "(random pattern)"}
        </p>
      )}

      <h2 className="analysis-subtitle">Neighbour Matrix</h2>
      {weightMatrix.length > 0 ? (
        <MatrixViewer matrix={weightMatrix} labels={stateLabels} />
      ) : (
        <p>No neighbor data available.</p>
      )}

      <div className="analysis-fun">
        <p>
          Fun fact: this matrix shows which states touch each other. Non-zero values
          indicate neighbors used in calculating Moran's I!
        </p>
      </div>
    </div>
  );
};

export default Analysis;