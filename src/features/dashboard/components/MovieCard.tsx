'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star } from 'lucide-react';
import { getImageUrl } from '@/lib/api';
import { Movie } from '@/hooks/useMovies';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movieId: number) => void;
}

export function MovieCard({ movie, isFavorite, onToggleFavorite }: MovieCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-movie.jpg';
          }}
        />
        <Button
          variant={isFavorite ? "default" : "outline"}
          size="icon"
          className={`absolute top-2 right-2 rounded-full ${
            isFavorite 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-white/90 hover:bg-white text-gray-600'
          }`}
          onClick={() => onToggleFavorite(movie.id)}
        >
          <Heart 
            className={`h-4 w-4 ${
              isFavorite ? 'fill-current' : ''
            }`} 
          />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{movie.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Release: {new Date(movie.release_date).getFullYear()}
        </p>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {movie.vote_count} votes
          </span>
        </div>
      </CardContent>
    </Card>
  );
}