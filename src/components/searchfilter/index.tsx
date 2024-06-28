import React from "react";
import SearchBar from "../searchbar";
import ExpandableFilters from "../expandablefilters";
import { CategoryTitle, FiltersWrapper, SearchBarContainer, SearchFiltersCont } from "./SearchFilter.style";

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
  searchMovies: (keyword: string, year: string | undefined, genres: number[]) => void;
};

export default function SearchFilters({
  genres,
  ratings,
  languages,
  searchMovies,
}: SearchFiltersProps) {

  const handleFilterChange = (selectedGenres: number[]) => {
    searchMovies('', '', selectedGenres);
  };

  return (
    <FiltersWrapper>
      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>
      <SearchFiltersCont>
        <CategoryTitle>Movies</CategoryTitle>
        <ExpandableFilters 
          genres={genres} 
          onFilterChange={handleFilterChange} 
        />
      </SearchFiltersCont>
    </FiltersWrapper>
  );
}
