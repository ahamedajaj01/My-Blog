import React from 'react'


  export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-gray-300 py-8 dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        
        <p className="text-sm">&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
        
        <div className="flex space-x-6 mt-4 md:mt-0">
            
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
            aria-label="Twitter"
          >
            {/* Twitter SVG icon */}
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14.86A4.48 4.48 0 0022.4.36a9 9 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.13A12.8 12.8 0 013 2.16a4.5 4.5 0 001.39 6.05A4.41 4.41 0 012 7.7v.05a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.53 4.53 0 004.21 3.14A9 9 0 013 19.54a12.7 12.7 0 006.92 2.03c8.3 0 12.85-6.87 12.85-12.83 0-.2 0-.42-.02-.62A9.23 9.23 0 0023 3z" />
            </svg>
          </a>

          <a
            href="https://github.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
            aria-label="GitHub"
          >
            {/* GitHub SVG icon */}
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.17-1.1-1.48-1.1-1.48-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.58 9.58 0 0112 6.8c.85 0 1.7.11 2.5.32 1.9-1.3 2.74-1.03 2.74-1.03.56 1.38.21 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.59.69.48A10 10 0 0012 2z" />
            </svg>
          </a>

          <a
            href="mailto:youremail@example.com"
            className="hover:text-white"
            aria-label="Email"
          >
            {/* Email SVG icon */}
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M1.5 4.5h21v15h-21v-15zm19.5 1.5l-9 7.5-9-7.5v-1.5l9 7.5 9-7.5v1.5z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

  


