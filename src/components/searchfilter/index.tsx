import React from "react";
import SearchBar from "../searchbar";
import { CategoryTitle, FiltersWrapper, SearchBarContainer, SearchFiltersCont } from "./SearchFilter.style";

type Genre = {
  id: number;
  name: string;
};

type SearchFiltersProps = {
  genres: Genre[];
  ratings: { id: number; name: number }[];
  languages: { id: string; name: string }[];
  searchMovies: (keyword: string, year: string | undefined) => void;
};

export default function SearchFilters({
  genres,
  ratings,
  languages,
  searchMovies,
}: SearchFiltersProps) {
  return (
    <FiltersWrapper>
      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>
      <SearchFiltersCont>
        <CategoryTitle>Movies</CategoryTitle>
        {/* Implement a component called "ExpandableFilters" and use it for the filter categories */}
      </SearchFiltersCont>
    </FiltersWrapper>
  );
}
