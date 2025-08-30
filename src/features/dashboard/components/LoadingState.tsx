'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-fit">
        <CardContent className="flex items-center gap-3 p-6">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-lg">Loading movies...</span>
        </CardContent>
      </Card>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-fit border-destructive">
        <CardContent className="p-6 text-center">
          <div className="text-lg text-destructive font-medium mb-2">
            Oops! Something went wrong
          </div>
          <p className="text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
}