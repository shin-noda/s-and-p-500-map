import React, { useState, useMemo } from "react";
import { useMoransI } from "../../hooks/useMoransI";
import MatrixViewer from "../../components/matrixViewer/MatrixViewer";
import DisplayTable from "../../components/displayTable/DisplayTable"; // <-- import the table
import type { FeatureCollection } from "geojson";
import "./Analysis.css";

// Example: import your US states GeoJSON
import usStatesData from "../../../public/data/us_states_5m.json";

const Analysis: React.FC = () => {
  const [selectedProperty] = useState("CENSUSAREA");

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
        <h2>Introduction</h2>
        We are going to analyze the headquarters of S&P 500 companies. In this project, we aim to understand how clustered or evenly distributed the companies are.<br/>
        <br/>
        Looking at the map, you can see that some areas, like Silicon Valley or New York, have clear clusters of companies, while other regions, such as much of the western US, appear more uniformly distributed on a macro scale. <br/>
        <br/>
        To quantify clustering or uniformity, we use <strong>Moran’s I</strong>. Moran’s I measures how clustered or dispersed a dataset is. Its value ranges from -1 to 1: a negative value indicates a dispersed (uniform) pattern, a positive value indicates a clustered pattern, and a value close to zero indicates a random pattern. <br/>
        <br/>
        For this analysis, we use queen contiguity to construct the neighbor matrix, as it provides a comprehensive view of neighboring relationships between regions. <br/>
        <br/>
        <strong>Note: </strong><br/>
        For the purpose of Moran’s I analysis, Alaska, Hawaii, and the District of Columbia are not included in the table or neighbor matrix. <br/>
        Alaska and Hawaii are not contiguous with the mainland United States, making neighbor definitions (queen/rook contiguity) impractical. <br/>
        District of Columbia is very small and has only a few neighbors, which could distort the calculation.
      </p>

      
      <p className="analysis-table">
        <h2 className="analysis-subtitle">How many headquarters are there in each state?</h2>

        First, we are going to count how many headquarters are in each state. <br/>
        <br/>
        <strong>Note: </strong><br/>
        Companies such as Lululemon have headquarters in Canada, so they are not included. Also, companies like Accenture have headquarters in Ireland, but their branch in Chicago is counted as a headquarters. <br/>
        <br/>

        {/* Display Company Counts Table */}
        <DisplayTable />

        <br/>
        After counting them all up, we get 497 companies.
      </p>

      <h2 className="analysis-subtitle">Neighbour Matrix</h2>
      Next, we are going to calculate the neighbor matrix of states (only 48 states for this project). The matrix is 48 × 48 in size and is symmetrical. This matrix shows which states touch each other. Non-zero values indicate neighbors used in calculating Moran's I. <br/>
      <br/>
      For example, if you look at the 4th column (Colorado) and 2nd row (Arizona), the value is 1. This means that Colorado and Arizona are neighbors. Also, the 1st row and column (Alabama) is 0, because a state cannot be a neighbor to itself. <br/>
      <br/>

      {weightMatrix.length > 0 ? (
        <MatrixViewer matrix={weightMatrix} labels={stateLabels} />
      ) : (
        <p>No neighbor data available.</p>
      )}

      <div className="analysis-fun">
        <p>
          
        </p>
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

    </div>
  );
};

export default Analysis;