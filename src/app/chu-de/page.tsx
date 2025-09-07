'use client';

import { Categories } from '@/components/categories';
import { Footer } from '@/components/footer';

export default function CategoriesPage() {
  return (
    <div className="h-full flex items-center bg-background">
      {/* Categories Component */}
      <Categories showAll={true} />
    </div>
  );
}