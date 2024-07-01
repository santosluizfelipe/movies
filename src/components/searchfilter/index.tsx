import React from "react";
import SearchBar from "../searchbar";
import ExpandableFilters from "../expandablefilters";
import {
  CategoryTitle,
  FiltersWrapper,
  SearchBarContainer,
  SearchFiltersCont,
} from "./SearchFilter.style";

type Rating = {
  id: number;
  name: number;
};

type Language = {
  id: string;
  name: string;
};

type SearchFiltersProps = {
  genres: { id: number; name: string }[];
  ratings: Rating[];
  languages: Language[];
  searchMovies: (
    keyword: string,
    year: string | undefined,
    filters: { genres: number[]; ratings: number[]; languages: string[] }
  ) => void;
};

export default function SearchFilters({
  genres,
  ratings,
  languages,
  searchMovies,
}: SearchFiltersProps) {
  const handleFilterChange = (selectedFilters: {
    genres: number[];
    ratings: number[];
    languages: string[];
  }) => {
    searchMovies("", "", selectedFilters);
  };

  return (
    <FiltersWrapper>
      <SearchBarContainer>
        <SearchBar isYearRequired={true}/>
      </SearchBarContainer>
      <SearchFiltersCont>
        <CategoryTitle style={{marginLeft: '1rem', fontSize: '14px'}} >Movie</CategoryTitle>
        <ExpandableFilters
          genres={genres}
          ratings={ratings}
          languages={languages}
          onFilterChange={handleFilterChange}
        />
      </SearchFiltersCont>
    </FiltersWrapper>
  );
}
