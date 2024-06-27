import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios, { AxiosRequestConfig } from "axios";
import * as colors from "../../colors";
import * as fetcher from "../../fetcher";
import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";

import { DiscoverWrapper, TotalCounter, MovieResults, MovieFilters, MobilePageTitle, MovieCard, MovieInfo } from "./Discover.style";

// const apiKey = process.env.REACT_APP_API_KEY;
// const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  genre_ids: number[];
  poster_path: string;
}

interface State {
  keyword: string;
  year: number;
  results: Movie[];
  movieDetails: Movie | null;
  totalCount: number;
  genreOptions: { id: number; name: string }[];
  ratingOptions: { id: number; name: number }[];
  languageOptions: { id: string; name: string }[];
}



export default function Discover() {
  // You don't need to keep the current structure of this state object. Feel free to restructure it as needed.
  const [state, setState] = useState<State>({
    keyword: "",
    year: 0,
    results: [],
    movieDetails: null,
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
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [popularPage, setPopularPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);


  const options: AxiosRequestConfig = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjQwMWQ5ODE4MmQwNWE4MzMwOWQxYTljNDFlNmI1OCIsIm5iZiI6MTcxOTQwOTkwNC4wNTc4MjcsInN1YiI6IjY2N2FlNWY4ZTQ1NDcyMzBlMWEwYjI5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._yuMI9W5WzJrBvA57G1vTIctvNmAQPSVNFD3o7wpMz8`,
    },
  };

  // Write a function to preload the popular movies when page loads & get the movie genres
  const preloadPopularMovies = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        options
      );
      setPopularMovies((prevMovies) => [...prevMovies, ...response.data.results.slice(0, 3)]);
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
        results: page === 1 ? response.data.results.slice(0, 3) : [...prevState.results, ...response.data.results.slice(0, 3)],
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
      setGenres(response.data.genres);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    preloadPopularMovies(popularPage);
    fetchGenres();
  }, [popularPage]);

  useEffect(() => {
    if (isSearching) {
      searchMovies(state.keyword, state.year.toString(), searchPage);
    }
  }, [searchPage, isSearching]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !isLoading) {
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



  console.log(popularMovies)

  // Write a function to get the movie details based on the movie id taken from the URL.
  // const searchMovies = async (
  //   keyword: string,
  //   year: number,
  // ) => {};

 

  const {
    genreOptions,
    languageOptions,
    ratingOptions,
    totalCount,
    results,
    movieDetails,
  } = state;

  console.log("popular movies=>", popularMovies)
  console.log("results=>", results)

  const getGenreNames = (genre_ids: number[]) => {
    return genre_ids.map((id) => genres.find((genre) => genre.id === id)?.name).join(", ");
  };

  const handleSearch = (keyword: string, year: string) => {
    setState((prevState) => ({ ...prevState, keyword, year: parseInt(year), results: [] }));
    setSearchPage(1);
    setIsSearching(true);
  };

  return (
    <DiscoverWrapper>
      <MobilePageTitle>Discover</MobilePageTitle>
      <MovieFilters>
        <SearchFilters 
          genres={genreOptions} 
          ratings={ratingOptions}  
          languages={languageOptions}
          searchMovies={(keyword, year) => handleSearch(keyword, year)}
        />
      </MovieFilters>
      <MovieResults>
        {results.length === 0 && !isSearching ? (
          popularMovies.map((movie) => (
            <MovieCard key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <MovieInfo>
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                <p>{getGenreNames(movie.genre_ids)}</p>
                <p>{movie.overview}</p>
              </MovieInfo>
            </MovieCard>
          ))
        ) : (
          results.map((movie) => (
            <MovieCard key={movie.id}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <MovieInfo>
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
                <p>{getGenreNames(movie.genre_ids)}</p>
                <p>{movie.overview}</p>
              </MovieInfo>
            </MovieCard>
          ))
        )}
      </MovieResults>
    </DiscoverWrapper>
  );
}