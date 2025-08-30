'use client';

import { MovieCard } from './MovieCard';
import { Movie } from '@/hooks/useMovies';

interface MovieGridProps {
  movies: Movie[];
  favorites: number[];
  onToggleFavorite: (movieId: number) => void;
}

export function MovieGrid({ movies, favorites, onToggleFavorite }: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.slice(0, 10).map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}