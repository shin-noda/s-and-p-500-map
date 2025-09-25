// src/components/Map/CompanyMarker.tsx
import { Marker, Popup } from "react-leaflet";
import type { Company } from "../../types/company";

type Props = {
  company: Company;
};

export default function CompanyMarker({ company }: Props) {
  return (
    <Marker position={[company.Latitude, company.Longitude]}>
      <Popup>
        <div style={{ textAlign: "center" }}>
          <img
            src={`/logos/${company.Symbol}.png`} 
            alt={`${company.Security} logo`}
            style={{ width: "50px", height: "50px", objectFit: "contain", marginBottom: "8px" }}
          />
          <div>
            <strong>{company.Security}</strong> ({company.Symbol})
          </div>
          <div>
            {company["GICS_Sector"]} – {company["GICS_Sub_Industry"]}
          </div>
          <div>📍 {company.Address}</div>
        </div>
      </Popup>
    </Marker>
  );
}
