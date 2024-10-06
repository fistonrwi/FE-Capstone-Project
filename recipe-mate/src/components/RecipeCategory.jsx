// src/components/RecipeCategory.jsx
import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeCategory = ({ category, recipes, onViewDetails }) => {
  return (
    <div className="recipe-category">
      <h2 className="category-title">{category}</h2>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onViewDetails={() => onViewDetails(recipe)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeCategory;
