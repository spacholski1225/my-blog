import { getAllPosts, getCategories, getPostsByCategory } from '@/lib/api';
import CategoryFilter from '@/components/blog/CategoryFilter';
import BlogPostList from '@/components/blog/BlogPostList';

export default function BlogPage(props: any) {
  const categorySlug = props.searchParams?.category;
  const categories = getCategories();
  const posts = categorySlug ? getPostsByCategory(categorySlug) : getAllPosts();

  return (
    <>
      <CategoryFilter
        categories={categories}
        currentCategory={categorySlug}
      />
      <BlogPostList posts={posts} />
    </>
  );
}