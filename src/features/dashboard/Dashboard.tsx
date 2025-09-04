'use client';

import { usePopularMovies } from '@/hooks/useMovies';
import { useAppSelector, useAppDispatch } from '@/store';
import { addToFavorites, removeFromFavorites } from '@/store/slices/moviesSlice';
import { Banner } from '@/components/banner';
import { Categories } from '@/components/categories';
import { Footer } from '@/components/footer';
import {
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
    <div className="min-h-screen">      
      {/* Hero Banner */}
      <Banner />
      
      {/* Categories Section */}
      <Categories />
      
      {/* Main Content */}
      <main className="p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Phim Phổ Biến</h2>
        </div>
        <MovieGrid
          movies={moviesData.results}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </main>

      <Footer />
    </div>
  );
}