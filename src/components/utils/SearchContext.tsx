import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface Genre {
  id: number;
  name: string;
}

interface SearchContextProps {
  keyword: string;
  year: string;
  setKeyword: (keyword: string) => void;
  setYear: (year: string) => void;
  genres: Genre[];
  setGenres: (genres: Genre[]) => void;
  minVote: number | null;
  setMinVote: (vote: number | null) => void;
  languages: string[];
  setLanguages: (languages: string[]) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [minVote, setMinVote] = useState<number | null>(null);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const options: AxiosRequestConfig = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjQwMWQ5ODE4MmQwNWE4MzMwOWQxYTljNDFlNmI1OCIsIm5iZiI6MTcxOTQwOTkwNC4wNTc4MjcsInN1YiI6IjY2N2FlNWY4ZTQ1NDcyMzBlMWEwYjI5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._yuMI9W5WzJrBvA57G1vTIctvNmAQPSVNFD3o7wpMz8`,
      },
    };

    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
          options
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <SearchContext.Provider
      value={{
        keyword,
        year,
        setKeyword,
        setYear,
        genres,
        setGenres,
        minVote,
        setMinVote,
        languages,
        setLanguages,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
