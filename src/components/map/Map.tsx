// src/components/Map/Map.tsx
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";

// components
import CompanyMarker from "../companyMarker/CompanyMarker";

// types
import type { FeatureCollection } from "geojson";
import type { Company } from "../../types/company";

// css
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [usStates, setUsStates] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    const base = import.meta.env.BASE_URL;

    // Load companies
    fetch(`${base}data/companies.json`)
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("Error loading companies.json:", err));

    // Load US states GeoJSON
    fetch(`${base}data/us_states_5m.json`)
      .then((res) => res.json())
      .then((data) => setUsStates(data))
      .catch((err) => console.error("Error loading us_states_5m.json:", err));
  }, []);

  // Compute bounds to fit all companies
  const bounds =
    companies.length > 0
      ? companies.map((c) => [c.Latitude, c.Longitude] as [number, number])
      : undefined;

  return (
    <MapContainer
      center={[37.8, -96]} // Rough center of the US
      zoom={5}
      style={{ 
        height: "100vh", 
        width: "100%",
      }}
      bounds={bounds} // auto-fit all markers
    >
      {/* Hide OpenStreetMap tiles (just use polygon) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        opacity={0}
      />

      {/* US states polygon */}
      {usStates && (
        <GeoJSON
          data={usStates}
          style={{
            fillColor: "#f2f2f2", // US is grey
            color: "#999",
            weight: 1,
            fillOpacity: 1.0,
          }}
        />
      )}

      {/* Company markers */}
      {companies.map((company) => (
        <CompanyMarker key={company.Symbol} company={company} />
      ))}
    </MapContainer>
  );
};

export default Map;