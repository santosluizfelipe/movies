import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import  { AxiosRequestConfig } from "axios";
import { fetchGenres } from "../../fetcher";

export interface Genre {
  id: number;
  name: string;
}

interface SearchContextProps {
  keyword: string;
  year: string;
  setKeyword: (keyword: string) => void;
  setYear: (year: string) => void;
  genres: { id: number; name: string }[];
  setGenres: (genres: Genre[]) => void;
  minVote: number | null;
  setMinVote: (vote: number | null) => void;
  languages: string[];
  setLanguages: (languages: string[]) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [minVote, setMinVote] = useState<number | null>(null);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const options: AxiosRequestConfig = {
      headers: {
        accept: "application/json",
        Authorization: `Bearer YOUR_API_KEY`,
      },
    };

    fetchGenres(setGenres, options);
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
