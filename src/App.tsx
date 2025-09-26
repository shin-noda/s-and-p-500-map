// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

// pages
import Map from "./components/map/Map";
import Analysis from "./pages/analysis/Analysis";
import About from "./pages/about/About";
import NotFound from "./pages/notFound/NotFound";

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
        <Header onSearch={setQuery} />

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={<Map companies={filteredCompanies} />}
            />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;