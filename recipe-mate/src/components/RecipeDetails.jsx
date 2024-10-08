import React from 'react';

const RecipeDetails = ({ recipe, onBack }) => {
  if (!recipe) return null;

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={onBack}
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition duration-300 mb-6"
      >
        Back to Recipes
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{recipe.strMeal}</h2>
          <p className="mb-2">
            <span className="font-semibold">Category:</span> {recipe.strCategory}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Cuisine:</span> {recipe.strArea}
          </p>

          <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside mb-4">
            {getIngredients().map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
          <p className="whitespace-pre-line mb-6">{recipe.strInstructions}</p>

          {recipe.strYoutube && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Video:</h3>
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}`}
                title="Recipe Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {recipe.strSource && (
            <a
              href={recipe.strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Full Recipe on TheMealDB
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
