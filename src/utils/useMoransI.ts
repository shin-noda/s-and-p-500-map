// useMoransI.ts
import { useMemo } from "react";
import * as turf from "@turf/turf";
import type {
  Feature,
  FeatureCollection,
  Polygon,
  MultiPolygon,
  GeoJsonProperties,
} from "geojson";

export type Contiguity = "queen" | "rook";

interface UseMoransIProps {
  geojson: FeatureCollection;
  valueProperty: string;
  contiguity?: Contiguity;
  debug?: boolean;
}

interface MoransIResult {
  moransI: number;
  neighbors: number[][];
}

/**
 * Custom hook to calculate Moran's I and return adjacency matrix.
 */
export function useMoransI({
  geojson,
  valueProperty,
  contiguity = "queen",
  debug = true,
}: UseMoransIProps): MoransIResult {
  return useMemo(() => {
    if (!geojson?.features) {
      if (debug) console.warn("GeoJSON not loaded yet.");
      return { moransI: NaN, neighbors: [] };
    }

    // Filter only Polygon or MultiPolygon features
    const features: Array<Feature<Polygon | MultiPolygon, GeoJsonProperties>> =
      geojson.features.filter(
        (f) =>
          f.geometry.type === "Polygon" ||
          f.geometry.type === "MultiPolygon"
      ) as Array<Feature<Polygon | MultiPolygon, GeoJsonProperties>>;

    const N = features.length;
    if (N === 0) {
      if (debug) console.warn("No polygons found in GeoJSON.");
      return { moransI: NaN, neighbors: [] };
    }

    // Precompute bounding boxes for fast neighbor checks
    const bboxes = features.map((f) => turf.bbox(f));

    // Build sparse neighbor lists
    const neighbors: number[][] = Array.from({ length: N }, () => []);

    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const intersectsBBox = !(
          bboxes[i][2] < bboxes[j][0] ||
          bboxes[i][0] > bboxes[j][2] ||
          bboxes[i][3] < bboxes[j][1] ||
          bboxes[i][1] > bboxes[j][3]
        );
        if (!intersectsBBox) continue;

        let isNeighbor = false;
        if (contiguity === "queen") {
          isNeighbor = turf.booleanTouches(features[i], features[j]);
        } else if (contiguity === "rook") {
          isNeighbor =
            turf.lineIntersect(
              turf.polygonToLine(features[i]),
              turf.polygonToLine(features[j])
            ).features.length > 0;
        }

        if (isNeighbor) {
          neighbors[i].push(j);
          neighbors[j].push(i);
        }
      }
    }

    if (debug) {
      console.log("Moran's I Debug Info:");
      console.log("Number of polygons:", N);
      console.log("Neighbor counts per polygon:", neighbors.map((n) => n.length));
    }

    // Extract values
    const x: number[] = features.map((f) => {
      const val = f.properties?.[valueProperty];
      return typeof val === "number" ? val : Number(val ?? NaN);
    });

    if (debug) console.log("Feature values:", x);

    if (x.some(isNaN)) {
      if (debug) console.warn(
        `Cannot compute Moran's I: some feature values are NaN for property "${valueProperty}".`
      );
      return { moransI: NaN, neighbors };
    }

    const xBar = x.reduce((a, b) => a + b, 0) / N;

    // Compute Moran's I
    let num = 0, den = 0, wSum = 0;
    for (let i = 0; i < N; i++) {
      den += (x[i] - xBar) ** 2;
      for (const j of neighbors[i]) {
        num += (x[i] - xBar) * (x[j] - xBar);
        wSum += 1;
      }
    }

    if (wSum === 0 || den === 0) {
      if (debug) console.warn("Cannot compute Moran's I: weights sum or denominator is zero.");
      return { moransI: 0, neighbors };
    }

    const moransI = (N / wSum) * (num / den);

    if (debug) console.log("Moran's I:", moransI);

    return { moransI, neighbors };
  }, [geojson, valueProperty, contiguity, debug]);
}