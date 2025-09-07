'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/api';
import { Movie } from '@/hooks/useMovies';
import Image from 'next/image';
import { Play, Heart, Info } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="group relative cursor-pointer">
      {/* Original Card */}
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:opacity-0">
        <div className="relative">
          <Image
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            width={500}
            height={300}
            className="w-full h-64 object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-movie.jpg';
            }}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-center">{movie.title}</h3>
        </CardContent>
      </Card>

      {/* Overlay Card - Replaces original on hover */}
      <Card className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105 group-hover:z-10 group-hover:shadow-2xl">
        <div className="relative h-full">
          <Image
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            width={500}
            height={300}
            className="w-full h-64 object-cover opacity-30"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-movie.jpg';
            }}
          />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <div className="text-center mb-4">
              <h3 className="text-white font-bold text-xl mb-3 line-clamp-2">{movie.title}</h3>
              <div className="flex items-center justify-center gap-2 text-yellow-400 mb-3">
                <span className="text-lg font-semibold">⭐ {movie.vote_average?.toFixed(1) || 'N/A'}</span>
                <span className="text-gray-300 text-sm">({movie.vote_count || 0} đánh giá)</span>
              </div>
              <p className="text-gray-200 text-sm line-clamp-4 mb-4">
                {movie.overview || 'Không có mô tả phim'}
              </p>
            </div>
            
            <div className="flex gap-2 justify-center">
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4">
                <Play className="w-4 h-4 mr-2" />
                Xem ngay
              </Button>
              <Button size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Heart className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <Info className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}