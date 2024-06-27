import React, { useState } from "react";
import styled from 'styled-components';

import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";
import { SearchBarWrapper, SearchInputWrapper, Icon, Input, SearchButton } from "./SearchBar.style";

interface SearchBarProps {
  onSearch: (keyword: string, year: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");

  const handleSearch = () => {
    onSearch(keyword, year);
  };

  return (
    <SearchBarWrapper>
      <SearchInputWrapper>
        <Icon src={SearchIcon} alt="Search Icon" />
        <Input 
          type="text" 
          placeholder="Keyword" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </SearchInputWrapper>
      <SearchInputWrapper>
        <Icon src={CalendarIcon} alt="Calendar Icon" />
        <Input 
          type="number" 
          placeholder="Year of release" 
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </SearchInputWrapper>
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchBarWrapper>
  );
}


export default SearchBar;
