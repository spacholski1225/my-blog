import { notFound, redirect } from "next/navigation";
import { getCategories } from "@/lib/api";

interface CategoryPageParams {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageParams) {
  const { category } = params;
  const categories = getCategories();
  const categoryExists = categories.some(c => c.slug === category);
  
  if (!categoryExists) {
    // Keep the notFound behavior for non-existent categories
    notFound();
  }
  
  // Redirect to the equivalent blog page with category filter
  redirect(`/blog?category=${category}`);
}