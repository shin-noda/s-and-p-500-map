// Define company type based on your JSON
export interface Company {
  Symbol: string;
  Security: string;
  GICS_Sector: string;
  GICS_Sub_Industry: string;
  Address: string;
  Latitude: number;
  Longitude: number;
  State: string;
  DateAdded: string;
}