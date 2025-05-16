import { notFound, redirect } from "next/navigation";
import { getCategories } from "@/lib/api";

export default function CategoryPage(props: any) {
  const category = props.params?.category;
  const categories = getCategories();
  const categoryExists = categories.some(c => c.slug === category);
  
  if (!categoryExists) {
    // Keep the notFound behavior for non-existent categories
    notFound();
  }
  
  // Redirect to the equivalent blog page with category filter
  redirect(`/blog?category=${category}`);
}