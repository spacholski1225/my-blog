"use client";

import Link from 'next/link';

interface CategoryBadgeProps {
  category: string;
  linkable?: boolean;
  size?: 'small' | 'medium';
  insideLink?: boolean; // New prop to indicate if the badge is inside another link
}

export default function CategoryBadge({
  category,
  linkable = true,
  size = 'medium',
  insideLink = false
}: CategoryBadgeProps) {
  const slug = category.toLowerCase().replace(/\s+/g, '-');
  const className = `category-badge ${size === 'small' ? 'category-badge-small' : ''}`;
  
  const badge = (
    <span className={className}>
      {category}
    </span>
  );
  
  // If inside another link or not linkable, just return the badge
  if (insideLink || !linkable) {
    return badge;
  }
  
  // Otherwise, wrap in a Link
  // Always link to the blog page with category query parameter
  return (
    <Link href={`/blog?category=${slug}`} onClick={(e) => e.stopPropagation()}>
      {badge}
    </Link>
  );
}