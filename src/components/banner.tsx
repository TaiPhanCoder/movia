'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Star, Play, Plus } from 'lucide-react';
import { movieApi, getImageUrl } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useNowPlayingBanner } from '@/hooks/useMovies';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

interface MoviesResponse {
  results: Movie[];
}

export function Banner() {
  const { data: movieData = [], isLoading, error } = useNowPlayingBanner();
  const [index, setIndex] = useState(0);

useEffect(() => {
  if (!movieData.length) return;
  const timer = setInterval(() => {
    if (movieData.length) {
      setIndex((prevIndex) => 
        prevIndex === movieData.length - 1 ? 0 : prevIndex + 1
      );
    }
  }, 6000);

  return () => clearInterval(timer);
}, [movieData]);

const movie = movieData[index];
const loading = isLoading || !movie;

  if (loading) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-r from-gray-900 to-gray-700 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Đang tải...</div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-r from-gray-900 to-gray-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Không có phim nào</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end pb-20">
        <div className="container px-4 lg:px-8 mx-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {movie.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-white font-medium">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-300">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>

            <p className="text-gray-200 text-lg mb-8 leading-relaxed">
              {movie.overview.length > 150 
                ? `${movie.overview.substring(0, 150)}...` 
                : movie.overview
              }
            </p>

            <div className="flex gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8">
                <Play className="w-5 h-5 mr-2" />
                Xem Ngay
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black px-8"
              >
                <Plus className="w-5 h-5 mr-2" />
                Thêm vào Danh sách
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-20 right-0 flex gap-2 overflow-x-auto scrollbar-hide px-4 z-20 no-scrollbar">
        {movieData.map((movie, i) => (
          <Button
            key={movie.id}
            onClick={() => setIndex(i)}
            variant="ghost"
            className={`
              relative flex-shrink-0 w-24 h-14 p-0 rounded-xl
              transition-all duration-300 ease-in-out hover:scale-105
              ${i === index ? 'ring-2 ring-cyan-400 ring-offset-1 shadow-lg shadow-cyan-400/20' : ''}
            `}
          >
            <Image
              src={getImageUrl(movie.backdrop_path, 'w300')}
              alt={movie.title}
              fill
              className="object-cover rounded-xl opacity-70"
              sizes="96px"
            />
          </Button>
        ))}
      </div>
    </div>
  );
}