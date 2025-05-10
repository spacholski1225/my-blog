import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-4xl font-heading font-bold mb-6 text-text">404 - Not Found</h1>
      <p className="text-text opacity-90 text-lg mb-8">
        The page you are looking for does not exist.
      </p>
      <Link 
        href="/"
        className="px-6 py-3 rounded-lg neumorphic-raised hover-rise btn-press text-accent-primary font-medium transition-all duration-300"
      >
        Return Home
      </Link>
    </div>
  );
}