
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-12 w-auto'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        {/* Main logo icon */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-2 shadow-lg">
          <svg 
            className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'} text-white`}
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            {/* Book with AI brain symbol */}
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            {/* AI brain overlay */}
            <circle cx="17" cy="7" r="3" className="fill-blue-300 opacity-80"/>
            <circle cx="16" cy="6" r="1" className="fill-white"/>
            <circle cx="18" cy="8" r="1" className="fill-white"/>
          </svg>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
      </div>
      
      {/* Text logo */}
      <div className="flex flex-col">
        <span className={`font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent ${
          size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
        }`}>
          TrainHub
        </span>
        {size !== 'sm' && (
          <span className="text-xs text-gray-500 -mt-1">Powered by AI</span>
        )}
      </div>
    </div>
  );
};

export default Logo;
