import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-3xl">
        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Restaurant Finder
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-8">
          Find restaurants by cuisine type and distance
        </p>

        {/* Features */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search by Cuisine</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span>Filter by Distance</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          to="/cuisine-search"
          className="inline-block bg-gray-900 text-white px-12 py-4 rounded-full text-lg font-medium
                   hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl
                   transform hover:translate-y-[-2px]"
        >
          Start Exploring
        </Link>

        {/* Optional: Small text below button */}
        <p className="text-sm text-gray-500 mt-8">
          Discover restaurants near you with just a few clicks
        </p>
      </div>
    </div>
  );
}
