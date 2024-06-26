import React, { useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
require('dotenv').config();

const accessToken = process.env.REACT_APP_TMDB_ACCESS_TOKEN;


import * as colors from "../../colors";
import * as fetcher from "../../fetcher";

import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";

export default function Discover() {
  // You don't need to keep the current structure of this state object. Feel free to restructure it as needed.
  const [state] = useState({
    keyword: '',
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
      { id: 10, name: 10 }
    ],
    languageOptions: [
      { id: 'GR', name: 'Greek' },
      { id: 'EN', name: 'English' },
      { id: 'RU', name: 'Russian' },
      { id: 'PO', name: 'Polish' }
    ]
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  };
  

  // Write a function to preload the popular movies when page loads & get the movie genres
  const preloadPopularMovies = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  

  // Write a function to get the movie details based on the movie id taken from the URL.

  const searchMovies = async (keyword:string, year:number, language:string) => {
    let url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(keyword)}`;
    if (year) {
      url += `&year=${year}`;
    }
    if (language) {
      url += `&language=${language}`;
    }
  
    try {
      const response = await axios.get(url, options);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const { genreOptions, languageOptions, ratingOptions, totalCount, results, movieDetails } = state;

  return (
    <DiscoverWrapper>
      <MobilePageTitle>Discover</MobilePageTitle>
      <MovieFilters>
        <SearchFilters 
          genres={genreOptions} 
          ratings={ratingOptions}  
          languages={languageOptions}
          searchMovies={(keyword, year) => searchMovies(keyword, year)}
        />
      </MovieFilters>
      <MovieResults>
        { totalCount > 0 && <TotalCounter>{totalCount} results</TotalCounter>}
        <MovieList 
          movies={results || []}
          genres={genreOptions || []}
        />
        {/* Each movie must have a unique URL and if clicked a pop-up should appear showing the movie details and the action buttons as shown in the wireframe */}
      </MovieResults>
    </DiscoverWrapper>
  )
}

const DiscoverWrapper = styled.div`
  padding: 60px 35px;
`

const TotalCounter = styled.div`
  font-weight: 900;
`

const MovieResults = styled.div`

`

const MovieFilters = styled.div`

`

const MobilePageTitle = styled.header`

`