import axios, { AxiosRequestConfig } from 'axios';
import { Movie } from './pages/discover';


// All of your API requests should be in this file
// i.e.
// export const getMovieGenres = async () => {

// };

export const preloadPopularMovies = async (
  page: number,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setPopularMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
  options: AxiosRequestConfig
) => {
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

export const searchMovies = async (
  keyword: string,
  year: string,
  page: number,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setState: React.Dispatch<React.SetStateAction<any>>, 
  options: AxiosRequestConfig
) => {
  setIsLoading(true);
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${keyword}&year=${year}&language=en-US&page=${page}`,
      options
    );
    setState((prevState: any) => ({
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

export const fetchGenres = async (
  setState: React.Dispatch<React.SetStateAction<any>>, 
  options: AxiosRequestConfig
) => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?language=en-US',
      options
    );
    setState((prevState: any) => ({
      ...prevState,
      genreOptions: response.data.genres,
    }));
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
};