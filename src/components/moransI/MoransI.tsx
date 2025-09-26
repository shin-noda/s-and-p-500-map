// /components/moransI/MoransI.tsx
import React, { useState } from "react";
import { useMoransI } from "../../utils/useMoransI";
import type { FeatureCollection } from "geojson";
import MatrixViewer from "../matrixViewer/MatrixViewer";

interface MoransIProps {
  geojson: FeatureCollection;
  valueProperty: string;
  contiguity?: "queen" | "rook";
}

const MoransI: React.FC<MoransIProps> = ({
  geojson,
  valueProperty,
  contiguity = "queen",
}) => {
  const { moransI, neighbors } = useMoransI({ geojson, valueProperty, contiguity });

  const [showMatrix, setShowMatrix] = useState(false);

  return (
    <div className="morans-i">
      <h3>Moran's I</h3>
      <p>
        Contiguity: <strong>{contiguity}</strong>
      </p>
      <p>
        Value property: <strong>{valueProperty}</strong>
      </p>
      {isNaN(moransI) ? (
        <p style={{ color: "red" }}>Could not compute Moran's I (check data).</p>
      ) : (
        <p>
          Moran's I: <strong>{moransI.toFixed(4)}</strong>
        </p>
      )}

      <button onClick={() => setShowMatrix(!showMatrix)}>
        {showMatrix ? "Hide" : "Show"} Weight Matrix
      </button>

      {showMatrix && neighbors.length > 0 && (
        <MatrixViewer
          matrix={neighbors.map((row) => {
            // Convert neighbor indices to 1s and 0s
            const n = neighbors.length;
            const binaryRow = Array.from({ length: n }, (_, i) =>
              row.includes(i) ? 1 : 0
            );
            return binaryRow;
          })}
          labels={geojson.features.map((f) => f.properties?.NAME ?? "")}
        />
      )}
    </div>
  );
};

export default MoransI;