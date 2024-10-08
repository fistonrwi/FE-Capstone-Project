import React, { useState, useEffect, useContext } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import ThemeContext from '../context/ThemeContext';

// Helper function to get favorites from localStorage
const getFavoritesFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('favorites')) || [];
};

const RecipeCard = ({ recipe, onClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    // Check if the recipe is already in the favorites list
    const favorites = getFavoritesFromLocalStorage();
    setIsFavorite(favorites.some((fav) => fav.idMeal === recipe.idMeal));
  }, [recipe.idMeal]);

  const handleFavoriteClick = () => {
    let favorites = getFavoritesFromLocalStorage();

    if (isFavorite) {
      // Remove from favorites
      favorites = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
    } else {
      // Add to favorites
      favorites.push(recipe);
    }

    // Update favorites in localStorage and toggle the favorite state
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className={`relative border p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 
      ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-200'}`}
    >
      {/* Recipe Image with Click Event */}
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-40 object-cover rounded cursor-pointer"
        onClick={onClick}
      />

      {/* Recipe Details */}
      <h2 className="text-xl font-bold mt-2">{recipe.strMeal}</h2>
      <p className="text-gray-500">{recipe.strCategory} - {recipe.strArea}</p>

      {/* Favorite Icon Button - Positioned at the top-right corner of the image */}
      <button
        className={`absolute top-2 right-2 p-2 rounded-full text-2xl transition-transform transform hover:scale-125 shadow-md 
        ${isDarkMode ? 'bg-gray-700 text-red-400 border-gray-500' : 'bg-white text-red-500 border-gray-300'}`}
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      >
        {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-500" />}
      </button>
    </div>
  );
};

export default RecipeCard;
