import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import CompanyMarker from "../companyMarker/CompanyMarker";
import type { FeatureCollection } from "geojson";
import type { Company } from "../../types/company";
import "../../utils/leafletIcons";
import "leaflet/dist/leaflet.css";
import "./Map.css";

interface MapProps {
  companies: Company[];
}

const Map = ({ companies }: MapProps) => {
  const [usStates, setUsStates] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    const base = import.meta.env.BASE_URL;
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
    <div className="map-page-container">
      <MapContainer
        className="map-container"
        center={[37.8, -96]}
        zoom={4.5}
        bounds={bounds}
        scrollWheelZoom={true}
        
      >
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
              fillColor: "#f2f2f2",
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
    </div>
  );
};

export default Map;