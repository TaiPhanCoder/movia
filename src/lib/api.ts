import axios from 'axios';

// Create axios instance for TMDB API
const tmdbApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Request interceptor
tmdbApi.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
tmdbApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API endpoints
export const movieApi = {
  // Get popular movies
  getPopular: (page: number = 1) => 
    tmdbApi.get(`/movie/popular?page=${page}`),
  
  // Get top rated movies
  getTopRated: (page: number = 1) => 
    tmdbApi.get(`/movie/top_rated?page=${page}`),
  
  // Get now playing movies
  getNowPlaying: (page: number = 1) => 
    tmdbApi.get(`/movie/now_playing?page=${page}`),
  
  // Get upcoming movies
  getUpcoming: (page: number = 1) => 
    tmdbApi.get(`/movie/upcoming?page=${page}`),
  
  // Get movie details
  getMovieDetails: (movieId: number) => 
    tmdbApi.get(`/movie/${movieId}`),
  
  // Search movies
  searchMovies: (query: string, page: number = 1) => 
    tmdbApi.get(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`),
  
  // Get movie credits
  getMovieCredits: (movieId: number) => 
    tmdbApi.get(`/movie/${movieId}/credits`),
  
  // Get similar movies
  getSimilarMovies: (movieId: number) => 
    tmdbApi.get(`/movie/${movieId}/similar`),
  
  // Get movies by genre
  getMoviesByGenre: (genreId: number, page: number = 1) => 
    tmdbApi.get(`/discover/movie?with_genres=${genreId}&page=${page}&sort_by=popularity.desc`),
  
  // Get all genres
  getGenres: () => 
    tmdbApi.get('/genre/movie/list'),
};

// Helper function to get full image URL
export const getImageUrl = (path: string, size: string = 'w500') => {
  if (!path) return '/placeholder-movie.jpg';
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL?.replace('w500', size)}${path}`;
};

export default tmdbApi;