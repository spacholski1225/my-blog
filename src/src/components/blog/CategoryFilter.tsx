"use client";

import Link from 'next/link';

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
    <div className="portfolio-section category-filter-section">
      <h2 className="section-title">Filter by Category</h2>
      
      <div className="filter-container">
        <Link
          href="/blog"
          className={`filter-tag filter-tag-all ${!currentCategory ? 'active' : ''}`}
        >
          All
        </Link>
        
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog?category=${category.slug}`}
            className={`filter-tag ${currentCategory === category.slug ? 'active' : ''}`}
          >
            {category.name}
            <span className="category-count">{category.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}