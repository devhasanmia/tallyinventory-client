import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full text-center space-y-6">
        {/* Animated 404 Number */}
        <div className="animate-bounce">
          <span className="text-9xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            404
          </span>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-gray-600 text-lg">
            Oops! The page you're looking for has vanished into the digital void.
          </p>
        </div>

        {/* Illustration */}
        <svg 
          className="w-32 h-32 mx-auto text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        {/* Return Home Button */}
        <Link 
          to="/" 
          className="inline-block px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  )
}