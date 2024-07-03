import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
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

interface Movie {
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const options: AxiosRequestConfig = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjQwMWQ5ODE4MmQwNWE4MzMwOWQxYTljNDFlNmI1OCIsIm5iZiI6MTcxOTQwOTkwNC4wNTc4MjcsInN1YiI6IjY2N2FlNWY4ZTQ1NDcyMzBlMWEwYjI5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._yuMI9W5WzJrBvA57G1vTIctvNmAQPSVNFD3o7wpMz8`,
    },
  };

  const preloadPopularMovies = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        options
      );
      setPopularMovies((prevMovies) => [
        ...prevMovies,
        ...response.data.results.slice(0, 6),
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const searchMovies = async (keyword: string, year: string, page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${keyword}&year=${year}&language=en-US&page=${page}`,
        options
      );
      setState((prevState) => ({
        ...prevState,
        results:
          page === 1
            ? response.data.results.slice(0, 6)
            : [...prevState.results, ...response.data.results.slice(0, 3)],
        totalCount: response.data.total_results,
      }));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
        options
      );

      setState((prevState) => ({
        ...prevState,
        genreOptions: response.data.genres,
      }));
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    preloadPopularMovies(popularPage);
    fetchGenres();
  }, [popularPage]);

  useEffect(() => {
    if (isSearching) {
      searchMovies(keyword, year, searchPage);
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
      searchMovies(keyword, year, 1);
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
  console.log("genres:", state.genreOptions);
  console.log("results:", state.results);
  console.log("popular:", popularMovies);

  return (
    <DiscoverWrapper>
      <MobilePageTitle>Discover</MobilePageTitle>
      <SearchSection>
        {!isMobile && (
          <MovieFilters>
            <SearchFilters
              genres={state.genreOptions}
              ratings={state.ratingOptions}
              languages={state.languageOptions}
              searchMovies={(keyword, year) =>
                searchMovies(keyword, year as string, 1)
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
