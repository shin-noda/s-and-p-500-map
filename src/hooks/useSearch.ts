import { useState, useMemo, useEffect } from "react";
import type { Company } from "../types/company";

export const useSearch = (companies: Company[], delay = 300) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce the query
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), delay);
    return () => clearTimeout(handler);
  }, [query, delay]);

  const filteredCompanies = useMemo(() => {
    if (!debouncedQuery) return companies;

    const lowerQuery = debouncedQuery.toLowerCase();
    return companies.filter(
      (c) =>
        c.Security.toLowerCase().includes(lowerQuery) ||
        c.Symbol.toLowerCase().includes(lowerQuery) ||
        c.GICS_Sector.toLowerCase().includes(lowerQuery) ||
        c.GICS_Sub_Industry.toLowerCase().includes(lowerQuery)
    );
  }, [debouncedQuery, companies]);

  return {
    query,
    setQuery,
    filteredCompanies,
  };
};