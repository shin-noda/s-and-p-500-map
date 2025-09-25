import { BrowserRouter } from "react-router-dom";

// components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Map from "./components/map/Map";

// hooks
import { useSearch } from "./hooks/useSearch";

// data
import companiesData from "../public/data/companies.json";

// types
import type { Company } from "./types/company";

// css
import "./App.css";

const App = () => {
  const { setQuery, filteredCompanies } = useSearch(
    companiesData as Company[]
  );

  return (
    <BrowserRouter basename="/s-and-p-500-map">
      <div className="app">
        {/* Pass the search query handler to Header */}
        <Header onSearch={setQuery} />

        <main className="main-content">
          {/* Pass filtered companies to Map */}
          <Map companies={filteredCompanies} />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;