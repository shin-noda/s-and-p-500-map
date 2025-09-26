import { useMemo } from "react";

// data
import statesData from "../../public/data/states.json";
import companiesData from "../../public/data/companies.json";

interface StateCount {
  state: string;
  name: string;
  count: number;
}

export const useCalculateTableCounts = (): StateCount[] => {
  return useMemo(() => {
    // Create a map of state counts
    const countsMap: Record<string, number> = {};

    companiesData.forEach((company) => {
      const state = company.State;
      countsMap[state] = (countsMap[state] || 0) + 1;
    });

    // Merge with states.json to ensure all states are represented
    const result: StateCount[] = statesData.map((stateObj) => ({
      state: stateObj.state,
      name: stateObj.name,
      count: countsMap[stateObj.state] || 0,
    }));

    return result;
  }, []);
};
