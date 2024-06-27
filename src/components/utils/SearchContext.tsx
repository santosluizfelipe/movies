import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextProps {
  keyword: string;
  year: string;
  setKeyword: (keyword: string) => void;
  setYear: (year: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");

  return (
    <SearchContext.Provider value={{ keyword, year, setKeyword, setYear }}>
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
