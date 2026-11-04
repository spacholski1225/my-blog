import Link from 'next/link';

export default function About() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <p className="text-lg mb-4">
          I&apos;m Szymon, an AI Engineer. I show how I work with AI agents on real software projects, from domain context and specs to tests and review (AI SDLC): what works, what doesn&apos;t, and what I don&apos;t know yet.
        </p>
        <p className="text-lg mb-4">
          I&apos;ve been programming since 2021, across frontend, backend and infrastructure. At Auctane I built the first version of an LLM pull request reviewer used by around 40 engineers, and I ran workshops on LLMs and coding agents for 40–50 colleagues. Today I work as an AI Engineer at Addepto.
        </p>
        <p className="text-lg mb-4">
          Posts here are in English. My videos and newsletter are in Polish: <a href="https://www.youtube.com/@spacholski" target="_blank" rel="noopener noreferrer">YouTube @spacholski</a>, <a href="https://szymonpacholski.pl" target="_blank" rel="noopener noreferrer">szymonpacholski.pl</a>.
        </p>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Connect With Me</h2>
      
      <div className="flex flex-wrap gap-4">
        <Link 
          href="https://github.com/spacholski1225" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          GitHub
        </Link>
        
        <Link 
          href="https://linkedin.com/in/szymonpacholski" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
          LinkedIn
        </Link>
        
        <Link 
          href="https://instagram.com/szymonpacholski.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          Instagram
        </Link>
      </div>
    </main>
  );
}