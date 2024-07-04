import React, { useEffect, useState } from "react";
import  { AxiosRequestConfig } from "axios";
import SearchFilters from "../../components/searchfilter";
import {
  DiscoverWrapper,
  MovieResults,
  MovieFilters,
  MobilePageTitle,
  MovieCard,
  MovieInfo,
  SearchSection,
  GenreLabel,
  Header,
  ReleaseDateLabel,
  MovieOverview,
  InfoContent,
  ReleaseDateContainer,
  Rating,
  HeaderWrapper,
} from "./Discover.style";
import { useSearch } from "../../components/utils/SearchContext";
import { fetchGenres, preloadPopularMovies, searchMovies } from "../../fetcher";

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
  poster_path: string;
  vote_average: number;
}

interface State {
  results: Movie[];
  totalCount: number;
  genreOptions: { id: number; name: string }[];
  ratingOptions: { id: number; name: number }[];
  languageOptions: { id: string; name: string }[];
}

export default function Discover() {
  const { keyword, year } = useSearch();
  const [state, setState] = useState<State>({
    results: [],
    totalCount: 0,
    genreOptions: [],
    ratingOptions: [
      { id: 7.5, name: 7.5 },
      { id: 8, name: 8 },
      { id: 8.5, name: 8.5 },
      { id: 9, name: 9 },
      { id: 9.5, name: 9.5 },
      { id: 10, name: 10 },
    ],
    languageOptions: [
      { id: "GR", name: "Greek" },
      { id: "EN", name: "English" },
      { id: "RU", name: "Russian" },
      { id: "PO", name: "Polish" },
    ],
  });

  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  const [popularPage, setPopularPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const options: AxiosRequestConfig = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
    },
  };


  useEffect(() => {
    preloadPopularMovies(popularPage, setIsLoading, setPopularMovies, options);
    fetchGenres(setState, options);
  }, [popularPage]);


  useEffect(() => {
    if (isSearching) {
      searchMovies(keyword, year, searchPage, setIsLoading, setState, options);
    }
  }, [searchPage, isSearching, keyword, year]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !isLoading
      ) {
        if (isSearching) {
          setSearchPage((prevPage) => prevPage + 1);
        } else {
          setPopularPage((prevPage) => prevPage + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, isSearching]);

  useEffect(() => {
    if (keyword || year) {
      setIsSearching(true);
      setSearchPage(1);
      searchMovies(keyword, year, 1, setIsLoading, setState, options);
    } else {
      setIsSearching(false);
      setState((prevState) => ({
        ...prevState,
        results: [],
      }));
    }
  }, [keyword, year]);

  const getGenreNames = (genre_ids: number[]) => {
    return genre_ids
      .map((id) => state.genreOptions.find((genre) => genre.id === id)?.name)
      .join(", ");
  };

  return (
    <DiscoverWrapper>
      {state.results.length > 1 && (
        <MobilePageTitle>{state.totalCount + " "} movies</MobilePageTitle>
      )}
      <SearchSection>
        {!isMobile && (
          <MovieFilters>
            <SearchFilters
              genres={state.genreOptions}
              ratings={state.ratingOptions}
              languages={state.languageOptions}
              searchMovies={(keyword, year) =>
                searchMovies(keyword, year as string, 1, setIsLoading, setState, options)
              }
            />
          </MovieFilters>
        )}
        <MovieResults>
          {state.results.length === 0 && !isSearching
            ? popularMovies.map((movie) => (
                <MovieCard key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <MovieInfo>
                    <InfoContent>
                      <HeaderWrapper>
                        <Header>{movie.title}</Header>
                        <Rating>
                          {movie.vote_average.toString().slice(0, 3)}
                        </Rating>
                      </HeaderWrapper>
                      <GenreLabel>{getGenreNames(movie.genre_ids)}</GenreLabel>
                      <MovieOverview>{movie.overview}</MovieOverview>
                    </InfoContent>
                    <ReleaseDateContainer>
                      <ReleaseDateLabel>{movie.release_date}</ReleaseDateLabel>
                    </ReleaseDateContainer>
                  </MovieInfo>
                </MovieCard>
              ))
            : state.results.map((movie) => (
                <MovieCard key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <MovieInfo>
                    <InfoContent>
                      <HeaderWrapper>
                        <Header>{movie.title}</Header>
                        <Rating>
                          {movie.vote_average.toString().slice(0, 3)}
                        </Rating>
                      </HeaderWrapper>
                      <GenreLabel>{getGenreNames(movie.genre_ids)}</GenreLabel>
                      <MovieOverview>{movie.overview}</MovieOverview>
                    </InfoContent>
                    <ReleaseDateContainer>
                      <ReleaseDateLabel>{movie.release_date}</ReleaseDateLabel>
                    </ReleaseDateContainer>
                  </MovieInfo>
                </MovieCard>
              ))}
        </MovieResults>
      </SearchSection>
    </DiscoverWrapper>
  );
}
