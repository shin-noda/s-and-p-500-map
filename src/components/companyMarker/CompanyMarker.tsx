// src/components/companyMarker/CompanyMarker.tsx
import { Marker, Popup } from "react-leaflet";
import type { Company } from "../../types/company";

interface Props {
  company: Company;
}

export default function CompanyMarker({ company }: Props) {
  const base = import.meta.env.BASE_URL;

  return (
    <Marker position={[company.Latitude, company.Longitude]}>
      <Popup>
        <div style={{ textAlign: "center" }}>
          <img
            src={`${base}logos/${company.Symbol}.png`}
            alt={company.Symbol}
            width={40}
            height={40}
            style={{ marginBottom: 5 }}
          />
          <div>
            <strong>{company.Security}</strong> ({company.Symbol})<br />
            {company.GICS_Sector} - {company.GICS_Sub_Industry}<br />
            📍 {company.Address}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}