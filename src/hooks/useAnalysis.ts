// /hooks/useAnalysis.ts
import { useState, useEffect, useMemo } from "react";
import { feature } from "topojson-client";

// hooks
import { useMoransI } from "./useMoransI";
import { useCalculateTableCounts } from "./useCalculateTableCounts";

// types
import type { FeatureCollection } from "geojson";

interface UseAnalysisOptions {
  property?: string; // default to "CENSUSAREA"
  contiguity?: "queen" | "rook";
  debug?: boolean;
}

export const useAnalysis = ({
  property = "CENSUSAREA",
  contiguity = "queen",
  debug = false,
}: UseAnalysisOptions = {}) => {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);

  const emptyGeoJSON: FeatureCollection = useMemo(
    () => ({ type: "FeatureCollection", features: [] }),
    []
  );

  // Fetch TopoJSON and convert to GeoJSON
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

        const geo = feature(
          topoData,
          topoData.objects.us_states_5m
        ) as unknown as FeatureCollection;

        setGeojson(geo);
      })
      .catch((err) => console.error("Failed to load topojson", err));
  }, []);

  // Compute neighbors
  const { neighbors: rawNeighbors } = useMoransI({
    geojson: geojson ?? emptyGeoJSON,
    valueProperty: property,
    contiguity,
    debug,
  });

  const neighbors: number[][] = useMemo(() => rawNeighbors ?? [], [rawNeighbors]);

  // Values from state counts
  const stateCounts = useCalculateTableCounts();
  const values = useMemo(() => stateCounts.map((s) => s.count), [stateCounts]);
  const N = values.length;

  // Optional state labels
  const stateLabels = useMemo(
    () => geojson?.features.map((f) => f.properties?.NAME || ""),
    [geojson]
  );

  // Mean
  const mean = useMemo(
    () => (N > 0 ? values.reduce((sum, v) => sum + v, 0) / N : 0),
    [values, N]
  );

  // Numerator matrix
  const numeratorMatrix: number[][] = useMemo(() => {
    return Array.from({ length: N }, (_, i) =>
      Array.from({ length: N }, (_, j) => {
        const w_ij = Array.isArray(neighbors[i]) ? (neighbors[i].includes(j) ? 1 : 0) : 0;
        return w_ij * (values[i] - mean) * (values[j] - mean);
      })
    );
  }, [neighbors, values, mean, N]);

  // Total numerator
  const numerator = useMemo(
    () => numeratorMatrix.flat().reduce((sum, v) => sum + v, 0),
    [numeratorMatrix]
  );

  // Denominator
  const squaredDeviations = useMemo(() => values.map((v) => (v - mean) ** 2), [values, mean]);
  const denominator = useMemo(() => squaredDeviations.reduce((sum, v) => sum + v, 0), [squaredDeviations]);

  // Total weight
  const totalW = useMemo(() => neighbors.reduce((acc, row) => acc + (Array.isArray(row) ? row.length : 0), 0), [neighbors]);

  // Moran's I
  const moransI = useMemo(() => (totalW > 0 && denominator > 0 ? (N / totalW) * (numerator / denominator) : 0), [
    N,
    totalW,
    numerator,
    denominator,
  ]);

  return {
    geojson,
    neighbors,
    values,
    stateLabels,
    property,
    mean,
    numerator,
    denominator,
    totalW,
    N,
    numeratorMatrix,
    squaredDeviations,
    moransI, // <--- ready to use
  };
};