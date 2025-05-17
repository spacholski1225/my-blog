"use client";

import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div className="logo">szymonpacholski.com</div>
      </Link>
      <nav>
        <Link href="/blog">Blog</Link>
        <Link href="/portfolio">Portfolio</Link>
      </nav>
    </header>
  );
};

export default Header;