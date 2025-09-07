'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface MoviesResponse {
  results: Movie[];
  total_pages: number;
  page: number;
}

const CATEGORY_NAMES: Record<string, string> = {
  'marvel': 'Marvel',
  '4k': '4K',
  'sitcom': 'Sitcom',
  'long-tieng': 'Lồng Tiếng Cực Mạnh',
  'xuyen-khong': 'Xuyên Không',
  'co-trang': 'Cổ Trang',
  'more': 'Thêm Chủ Đề'
};

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const currentPage = parseInt(searchParams.get('page') || '1');
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryName = CATEGORY_NAMES[slug] || slug;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/categories/${slug}?page=${currentPage}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        
        const data: MoviesResponse = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [slug, currentPage]);

  const getImageUrl = (path: string) => {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : '/placeholder-movie.jpg';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Đang tải phim...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">Lỗi: {error}</p>
          <Button onClick={() => window.location.reload()}>Thử lại</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="text-primary hover:underline mb-4 inline-block">
          ← Về trang chủ
        </Link>
        <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
        <p className="text-muted-foreground">
          Trang {currentPage} / {totalPages} - {movies.length} phim
        </p>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {movies.map((movie) => (
          <Card key={movie.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="aspect-[2/3] relative">
                <Image
                  src={getImageUrl(movie.poster_path)}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                  <span className="flex items-center">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Link
            href={`/chu-de/${slug}?page=${Math.max(1, currentPage - 1)}`}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          >
            <Button variant="outline" disabled={currentPage === 1}>
              Trước
            </Button>
          </Link>
          
          <span className="px-4 py-2 text-sm">
            Trang {currentPage} / {totalPages}
          </span>
          
          <Link
            href={`/chu-de/${slug}?page=${Math.min(totalPages, currentPage + 1)}`}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
          >
            <Button variant="outline" disabled={currentPage === totalPages}>
              Sau
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}