// src/pages/Home.jsx
import React from 'react';

const Home = ({ recipes, error, addToFavorites, removeFromFavorites, favorites, onViewDetails }) => {
  // Display error message if there is an error
  if (error) {
    return <div className="error text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {recipes.map((recipe) => {
        const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal); // Check if the recipe is a favorite

        return (
          <div
            key={recipe.idMeal}
            className="relative border border-gray-300 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => onViewDetails(recipe)} // Click to view details
          >
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{recipe.strMeal}</h2>
              <p className="text-gray-600">Category: {recipe.strCategory}</p>
              <p className="text-gray-600">Cuisine: {recipe.strArea}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the onClick of the card
                isFavorite ? removeFromFavorites(recipe) : addToFavorites(recipe);
              }}
              className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-200 ${
                isFavorite ? 'bg-white-200' : 'bg-white-200'
              } hover:bg-white-400`}
              title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <span className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}>
                {isFavorite ? '❤️' : '🤍'}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
