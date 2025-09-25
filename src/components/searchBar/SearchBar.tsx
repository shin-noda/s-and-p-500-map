import React, { type ChangeEvent } from "react";

// css
import "./SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      className="search-bar"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;
