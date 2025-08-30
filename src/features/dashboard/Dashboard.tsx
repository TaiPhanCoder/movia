'use client';

import { usePopularMovies } from '@/hooks/useMovies';
import { useAppSelector, useAppDispatch } from '@/store';
import { addToFavorites, removeFromFavorites } from '@/store/slices/moviesSlice';
import {
  DashboardHeader,
  MovieGrid,
  LoadingState,
  ErrorState
} from './components';

export function Dashboard() {
  const { data: moviesData, isLoading, error } = usePopularMovies(1);
  const favorites = useAppSelector((state) => state.movies.favorites);
  const dispatch = useAppDispatch();

  const handleToggleFavorite = (movieId: number) => {
    if (favorites.includes(movieId)) {
      dispatch(removeFromFavorites(movieId));
    } else {
      dispatch(addToFavorites(movieId));
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!moviesData?.results) {
    return <ErrorState message="No movies found" />;
  }

  return (
    <div className="min-h-screen p-8">
      <DashboardHeader favoritesCount={favorites.length} />
      
      <main>
        <MovieGrid
          movies={moviesData.results}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </main>

      <footer className="mt-12 text-center text-muted-foreground">
        <p>Powered by TMDB API</p>
        <p className="text-sm mt-2">
          Redux Toolkit + TanStack Query + Axios configured successfully! 🎉
        </p>
      </footer>
    </div>
  );
}