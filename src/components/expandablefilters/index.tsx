import React, { useState } from "react";
import styled from "styled-components";
import Checkbox from "../checkbox";

type ExpandableFiltersProps = {
  genres: { id: number; name: string }[];
  onFilterChange: (selectedGenres: number[]) => void;
};

export default function ExpandableFilters({ genres, onFilterChange }: ExpandableFiltersProps) {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const handleCheckboxChange = (genreId: number) => {
    const updatedSelectedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];

    setSelectedGenres(updatedSelectedGenres);
    onFilterChange(updatedSelectedGenres);
  };

  return (
    <div>
      {genres.map((genre) => (
        <CheckboxContainer key={genre.id}>
          <Checkbox
            label={genre.name}
            checked={selectedGenres.includes(genre.id)}
            onChange={() => handleCheckboxChange(genre.id)}
          />
        </CheckboxContainer>
      ))}
    </div>
  );
}

const CheckboxContainer = styled.div`
  margin-bottom: 10px;
`;
