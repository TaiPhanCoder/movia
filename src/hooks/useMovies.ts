'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { movieApi } from '@/lib/api';

// Types
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }[];
}

// Custom hooks
export const usePopularMovies = (page: number = 1): UseQueryResult<MoviesResponse, Error> => {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: async () => {
      const response = await movieApi.getPopular(page);
      return response.data;
    },
  });
};

export const useTopRatedMovies = (page: number = 1): UseQueryResult<MoviesResponse, Error> => {
  return useQuery({
    queryKey: ['movies', 'topRated', page],
    queryFn: async () => {
      const response = await movieApi.getTopRated(page);
      return response.data;
    },
  });
};

export const useNowPlayingMovies = (page: number = 1): UseQueryResult<MoviesResponse, Error> => {
  return useQuery({
    queryKey: ['movies', 'nowPlaying', page],
    queryFn: async () => {
      const response = await movieApi.getNowPlaying(page);
      return response.data;
    },
  });
};

export const useNowPlayingBanner = (): UseQueryResult<Movie[], Error> => {
  return useQuery({
    queryKey: ['movies', 'nowPlayingBanner'],
    queryFn: async () => {
      const response = await movieApi.getNowPlaying(1);
      return response.data.results.slice(0, 5);
    },
  });
};

export const useUpcomingMovies = (page: number = 1): UseQueryResult<MoviesResponse, Error> => {
  return useQuery({
    queryKey: ['movies', 'upcoming', page],
    queryFn: async () => {
      const response = await movieApi.getUpcoming(page);
      return response.data;
    },
  });
};

export const useMovieDetails = (movieId: number): UseQueryResult<MovieDetails, Error> => {
  return useQuery({
    queryKey: ['movie', 'details', movieId],
    queryFn: async () => {
      const response = await movieApi.getMovieDetails(movieId);
      return response.data;
    },
    enabled: !!movieId,
  });
};

export const useSearchMovies = (query: string, page: number = 1): UseQueryResult<MoviesResponse, Error> => {
  return useQuery({
    queryKey: ['movies', 'search', query, page],
    queryFn: async () => {
      const response = await movieApi.searchMovies(query, page);
      return response.data;
    },
    enabled: !!query && query.length > 0,
  });
};

export const useSimilarMovies = (movieId: number): UseQueryResult<MoviesResponse, Error> => {
  return useQuery({
    queryKey: ['movies', 'similar', movieId],
    queryFn: async () => {
      const response = await movieApi.getSimilarMovies(movieId);
      return response.data;
    },
    enabled: !!movieId,
  });
};

// Export types
export type { Movie, MoviesResponse, MovieDetails };