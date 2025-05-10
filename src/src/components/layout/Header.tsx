"use client";

import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <div className="logo">yourname.dev</div>
      <nav>
        <Link href="/blog">Blog</Link>
        <Link href="/category">About</Link>
      </nav>
    </header>
  );
};

export default Header;