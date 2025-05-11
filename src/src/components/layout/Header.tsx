"use client";

import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div className="logo">yourname.dev</div>
      </Link>
      <nav>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
};

export default Header;