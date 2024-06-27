import React from "react";
import styled, { css } from "styled-components";

import * as colors from "../../colors";
import ExpandableFilters from "../expandablefilters";
import SearchBar from "../searchbar";

type Genre = {
  id: number;
  name: string;
};

// Add types for the props of 'SearchFilters' and the styled component 'SearchFiltersCont'
type SearchFiltersProps = {
  genres: Genre[];
  ratings: number[];
  languages: string[];
  searchMovies: (
    keyword: string,
    year: string | undefined,
  ) => void;
};

export default function SearchFilters({
  genres,
  ratings,
  languages,
  searchMovies,
}: SearchFiltersProps) {
  // return (
  //   <FiltersWrapper>
  //     <SearchFiltersCont className="search_inputs_cont" marginBottom>
  //       {/* Implement a SearchBar component and use it for both the keyword and the year inputs */}
  //       <SearchBar onSearch={(keyword, year) => searchMovies(keyword, year)} />
  //     </SearchFiltersCont>
  //     <SearchFiltersCont>
  //       <CategoryTitle>Movies</CategoryTitle>
  //       {/* Implement a component called "ExpandableFilters" and use it for the filter categories */}
  //       {/* <ExpandableFilters genres={genres} ratings={ratings} languages={languages} searchMovies={searchMovies} /> */}
  //     </SearchFiltersCont>
  //   </FiltersWrapper>
  // );

  return (
    <FiltersWrapper>
      <SearchFiltersCont className="search_inputs_cont" marginBottom>
        <SearchBar onSearch={(keyword, year) => searchMovies(keyword, year)} />
      </SearchFiltersCont>
      <SearchFiltersCont>
        <CategoryTitle>Movies</CategoryTitle>
        {/* Implement a component called "ExpandableFilters" and use it for the filter categories */}
        {/* <ExpandableFilters genres={genres} ratings={ratings} languages={languages} searchMovies={searchMovies} /> */}
      </SearchFiltersCont>
    </FiltersWrapper>
  );
}

const FiltersWrapper = styled.div`
  position: relative;
`;

const SearchFiltersCont = styled.div<{ marginBottom?: boolean }>`
  background-color: white;
  padding: 20px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;
  ${(props) =>
    props.marginBottom &&
    css`
      margin-bottom: 15px;
    `}
`;

const CategoryTitle = styled.div``;
