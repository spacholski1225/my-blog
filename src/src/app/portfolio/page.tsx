import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/portfolio/Hero';
import Projects from '@/components/portfolio/Projects';
import Education from '@/components/portfolio/Education';
import Contact from '@/components/portfolio/Contact';

export default function Portfolio() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Hero />
      <Projects />
      <Education />
      <Contact />
    </main>
  );
}