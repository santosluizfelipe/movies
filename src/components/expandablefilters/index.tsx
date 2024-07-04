import React, { useState } from "react";
import Checkbox from "../checkbox";

import { MdAdd, MdRemove } from "react-icons/md";
import {
  FiltersWrapper,
  ToggleButton,
  CheckboxContainer,
  IconWrapper,
} from "./ExpandableFilters.style";

type ExpandableFiltersProps = {
  genres: { id: number; name: string }[];
  ratings: { id: number; name: number }[];
  languages: { id: string; name: string }[];
  onFilterChange: (selectedFilters: {
    genres: number[];
    ratings: number[];
    languages: string[];
  }) => void;
};

export default function ExpandableFilters({
  genres,
  ratings,
  languages,
  onFilterChange,
}: ExpandableFiltersProps) {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [showGenres, setShowGenres] = useState(true);
  const [showRatings, setShowRatings] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);

  const handleCheckboxChange = (
    id: number | string,
    type: "genres" | "ratings" | "languages"
  ) => {
    switch (type) {
      case "genres":
        const updatedSelectedGenres = selectedGenres.includes(id as number)
          ? selectedGenres.filter((genreId) => genreId !== id)
          : [...selectedGenres, id as number];
        setSelectedGenres(updatedSelectedGenres);
        onFilterChange({
          genres: updatedSelectedGenres,
          ratings: selectedRatings,
          languages: selectedLanguages,
        });
        break;
      case "ratings":
        const updatedSelectedRatings = selectedRatings.includes(id as number)
          ? selectedRatings.filter((ratingId) => ratingId !== id)
          : [...selectedRatings, id as number];
        setSelectedRatings(updatedSelectedRatings);
        onFilterChange({
          genres: selectedGenres,
          ratings: updatedSelectedRatings,
          languages: selectedLanguages,
        });
        break;
      case "languages":
        const updatedSelectedLanguages = selectedLanguages.includes(
          id as string
        )
          ? selectedLanguages.filter((languageId) => languageId !== id)
          : [...selectedLanguages, id as string];
        setSelectedLanguages(updatedSelectedLanguages);
        onFilterChange({
          genres: selectedGenres,
          ratings: selectedRatings,
          languages: updatedSelectedLanguages,
        });
        break;
      default:
        break;
    }
  };
  return (
    <FiltersWrapper>
      <ToggleButton onClick={() => setShowGenres(!showGenres)}>
        {showGenres ? (
          <IconWrapper>
            <MdRemove />
          </IconWrapper>
        ) : (
          <IconWrapper>
            <MdAdd />
          </IconWrapper>
        )}{" "}
        Select genre(s)
      </ToggleButton>
      {showGenres &&
        genres.map((genre) => (
          <CheckboxContainer key={genre.id}>
            <Checkbox
              label={genre.name}
              checked={selectedGenres.includes(genre.id)}
              onChange={() => handleCheckboxChange(genre.id, "genres")}            />
          </CheckboxContainer>
        ))}

      <ToggleButton onClick={() => setShowRatings(!showRatings)}>
        {showRatings ? (
          <IconWrapper>
            <MdRemove />
          </IconWrapper>
        ) : (
          <IconWrapper>
            <MdAdd />
          </IconWrapper>
        )}{" "}
        Select min. vote
      </ToggleButton>
      {showRatings &&
        ratings.map((rating) => (
          <CheckboxContainer key={rating.id}>
            <Checkbox
              label={rating.name.toString()}
              checked={selectedRatings.includes(rating.id)}
              onChange={() => handleCheckboxChange(rating.id, "ratings")}
            />
          </CheckboxContainer>
        ))}

      <ToggleButton onClick={() => setShowLanguages(!showLanguages)}>
        {showLanguages ? (
          <IconWrapper>
            <MdRemove />
          </IconWrapper>
        ) : (
          <IconWrapper>
            <MdAdd />
          </IconWrapper>
        )}{" "}
        Select language
      </ToggleButton>
      {showLanguages &&
        languages.map((language) => (
          <CheckboxContainer key={language.id}>
            <Checkbox
              label={language.name}
              checked={selectedLanguages.includes(language.id)}
              onChange={() => handleCheckboxChange(language.id, "languages")}
            />
          </CheckboxContainer>
        ))}
    </FiltersWrapper>
  );
}
