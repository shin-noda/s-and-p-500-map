import { useState, useMemo, useEffect } from "react";
import { useMoransI } from "../../hooks/useMoransI";
import MatrixViewer from "../../components/matrixViewer/MatrixViewer";
import DisplayTable from "../../components/displayTable/DisplayTable"; 
import type { FeatureCollection } from "geojson";
import { feature } from "topojson-client";
import "./Analysis.css";

const Analysis = () => {
  const [selectedProperty] = useState("CENSUSAREA");
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);

  const emptyGeoJSON: FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };

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

  const { moransI, neighbors } = useMoransI({
    geojson: geojson ?? emptyGeoJSON,
    valueProperty: selectedProperty,
    contiguity: "queen",
    debug: false,
  });


  // Optional: labels for states
  const stateLabels = geojson?.features.map((f) => f.properties?.NAME || "");

  // Convert neighbors to symmetric 0/1 matrix for MatrixViewer
  const weightMatrix = useMemo(() => {
    const N = neighbors.length;
    const matrix: number[][] = Array.from({ length: N }, () =>
      Array(N).fill(0)
    );
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

      <div className="analysis-intro">
        <h2>Introduction</h2>
        <p>
          We are going to analyze the headquarters of S&amp;P 500 companies. In this project, we aim to understand how clustered or evenly distributed the companies are.
        </p>
        <p>
          Looking at the map, you can see that some areas, like Silicon Valley or New York, have clear clusters of companies, while other regions, such as much of the western US, appear more uniformly distributed on a macro scale.
        </p>
        <p>
          To quantify clustering or uniformity, we use <strong>Moran’s I</strong>. Moran’s I measures how clustered or dispersed a dataset is. Its value ranges from -1 to 1: a negative value indicates a dispersed (uniform) pattern, a positive value indicates a clustered pattern, and a value close to zero indicates a random pattern.
        </p>
        <p>
          For this analysis, we use queen contiguity to construct the neighbor matrix, as it provides a comprehensive view of neighboring relationships between regions.
        </p>
        <p>
          <strong>Note: </strong> Alaska, Hawaii, and the District of Columbia are not included in the table or neighbor matrix. Alaska and Hawaii are not contiguous with the mainland United States, making neighbor definitions (queen/rook contiguity) impractical. District of Columbia is very small and has only a few neighbors, which could distort the calculation.
        </p>
      </div>

      <div className="analysis-table">
        <h2 className="analysis-subtitle">How many headquarters are there in each state?</h2>
        <p>
          First, we are going to count how many headquarters are in each state.
        </p>
        <p>
          <strong>Note: </strong> Companies such as Lululemon have headquarters in Canada, so they are not included. Also, companies like Accenture have headquarters in Ireland, but their branch in Chicago is counted as a headquarters.
        </p>
        <DisplayTable />
        <p>After counting them all up, we get 497 companies.</p>
      </div>

      <h2 className="analysis-subtitle">Neighbour Matrix</h2>
      Next, we are going to calculate the neighbor matrix of states (only 48 states for this project). The matrix is 48 × 48 in size and is symmetrical. This matrix shows which states touch each other. Non-zero values indicate neighbors used in calculating Moran's I. <br />
      <br />
      For example, if you look at the 4th column (Colorado) and 2nd row (Arizona), the value is 1. This means that Colorado and Arizona are neighbors. Also, the 1st row and column (Alabama) is 0, because a state cannot be a neighbor to itself. <br />
      <br />
      {weightMatrix.length > 0 ? (
        <MatrixViewer matrix={weightMatrix} labels={stateLabels} />
      ) : (
        <p>No neighbor data available.</p>
      )}

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