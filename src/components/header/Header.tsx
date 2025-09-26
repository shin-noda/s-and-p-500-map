import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

// components
import SearchBar from "../searchBar/SearchBar";

// css
import "./Header.css";

interface HeaderProps {
  onSearch?: (query: string) => void; // optional callback to pass search query up
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Only show search bar on the main page
  const showSearchBar = location.pathname === "/";

  return (
    <header className="header">
      <Link to="/" className="header-title">
        S&P 500 Map
      </Link>

      {showSearchBar && (
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search companies..."
        />
      )}

      <nav className="nav-links">
        <Link to="/analysis">Analysis</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
};

export default Header;