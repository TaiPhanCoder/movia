'use client';

import { Badge } from '@/components/ui/badge';
import { Heart } from 'lucide-react';

interface DashboardHeaderProps {
  favoritesCount: number;
}

export function DashboardHeader({ favoritesCount }: DashboardHeaderProps) {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        Movia
      </h1>
      <p className="text-muted-foreground text-lg mb-4">
        Discover Popular Movies
      </p>
      <Badge variant="outline" className="flex items-center gap-2 w-fit mx-auto">
        <Heart className="h-4 w-4 text-red-500" />
        <span>Favorites: {favoritesCount} movies</span>
      </Badge>
    </header>
  );
}