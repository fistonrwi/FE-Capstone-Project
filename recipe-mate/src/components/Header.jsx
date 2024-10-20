import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onSearch, onViewFavorites, favoriteCount, isDarkMode, toggleDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="bg-blue-950 p-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <Link to="/" className="text-2xl font-bold tracking-wide flex items-center">
          <span role="img" aria-label="logo" className="mr-2">
            🍴
          </span>
          Recipe Mate
        </Link>

        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for a recipe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition duration-300 shadow"
          >
            Search
          </button>

          {/* View Favorites Button */}
          <div className="relative">
            <button
              onClick={onViewFavorites}
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-lg transition duration-300 shadow"
            >
              View Favorites
            </button>
            {favoriteCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-sm rounded-full px-2 py-1">
                {favoriteCount}
              </span>
            )}
          </div>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-lg transition duration-300 shadow ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

