"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface CategoryFilterProps {
  categories: Array<{
    name: string;
    slug: string;
    count: number;
  }>;
  currentCategory?: string;
}

export default function CategoryFilter({ categories, currentCategory }: CategoryFilterProps) {
  return (
    <div className="category-filter mb-8">
      <div className="flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`category-tag ${!currentCategory ? 'active' : ''}`}
        >
          All
        </Link>
        
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog?category=${category.slug}`}
            className={`category-tag ${currentCategory === category.slug ? 'active' : ''}`}
          >
            {category.name} ({category.count})
          </Link>
        ))}
      </div>
    </div>
  );
}