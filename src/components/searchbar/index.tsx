import React, { useEffect } from 'react';
import styled from 'styled-components';
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";
import { SearchBarWrapper, SearchInputWrapper, Icon, Input } from './SearchBar.style';

import { useSearch } from '../utils/SearchContext';
import useDebounce from '../utils/useDebounce';

const SearchBar: React.FC = () => {
  const { keyword, year, setKeyword, setYear } = useSearch();
  const debouncedKeyword = useDebounce(keyword, 2000); 
  const debouncedYear = useDebounce(year, 2000);


  useEffect(() => {
    setKeyword(debouncedKeyword);
    setYear(debouncedYear);
  }, [debouncedKeyword, debouncedYear]);

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
    </SearchBarWrapper>
  );
}

export default SearchBar;
