import React, { useState } from 'react';
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";
import { SearchBarWrapper, SearchInputWrapper, Icon, Input } from './SearchBar.style';
import { useSearch } from '../utils/SearchContext';
import useDebounce from '../utils/useDebounce';

const SearchBar: React.FC = () => {
  const { setKeyword, setYear } = useSearch();
  const [localKeyword, setLocalKeyword] = useState('');
  const [localYear, setLocalYear] = useState('');

  const debouncedSetKeyword = useDebounce(setKeyword, 500);
  const debouncedSetYear = useDebounce(setYear, 500);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalKeyword(e.target.value);
    debouncedSetKeyword(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalYear(e.target.value);
    debouncedSetYear(e.target.value);
  };

  return (
    <SearchBarWrapper>
      <div>
      <SearchInputWrapper>
        <Icon src={SearchIcon} alt="Search Icon" />
        <Input 
          type="text" 
          placeholder="Keyword" 
          value={localKeyword}
          onChange={handleKeywordChange}
        />
      </SearchInputWrapper>
      </div>
      <SearchInputWrapper>
        <Icon src={CalendarIcon} alt="Calendar Icon" />
        <Input 
          type="number" 
          placeholder="Year of release" 
          value={localYear}
          onChange={handleYearChange}
        />
      </SearchInputWrapper>
    </SearchBarWrapper>
  );
}

export default SearchBar;
