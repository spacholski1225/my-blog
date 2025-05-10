import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-6 px-4 md:px-8">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-heading font-bold text-text hover:text-accent-primary transition-colors">
          My Blog
        </Link>
      </div>
      
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link 
              href="/" 
              className="text-text hover:text-accent-primary transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link 
              href="/blog" 
              className="text-text hover:text-accent-primary transition-colors relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
          <li>
            <Link 
              href="/category" 
              className="text-text hover:text-accent-primary transition-colors relative group"
            >
              Categories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;