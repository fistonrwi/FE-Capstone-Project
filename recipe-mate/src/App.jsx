import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import RecipeDetails from './components/RecipeDetails';
import Footer from './components/Footer';
import CategoryFilter from './components/CategoryFilter';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isFavoritesView, setIsFavoritesView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All', 'Desserts', 'Appetizers', 'Main Course', 'Breakfast']);

  // Dark mode state and effect to load user preference
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadDefaultRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken');
        const data = await response.json();
        setRecipes(data.meals || []);
      } catch (err) {
        setError('Failed to load default recipes.');
      }
    };
    loadDefaultRecipes();

    // Load dark mode preference from localStorage
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  const handleViewFavorites = () => {
    setIsFavoritesView(true);
    setError(favorites.length === 0 ? 'No favorite recipes yet!' : null);
    setRecipes(favorites);
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await response.json();
      setRecipes(data.meals || []);
      setError(data.meals ? null : 'No recipes found for this search term.');
      setIsFavoritesView(false);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
    }
  };

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      await handleSearch('');
    } else {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        setRecipes(data.meals || []);
        setError(data.meals ? null : 'No recipes found for this category.');
        setIsFavoritesView(false);
      } catch (err) {
        setError('Failed to fetch recipes by category. Please try again later.');
      }
    }
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  const handleViewDetails = async (recipe) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`);
      const data = await response.json();
      if (data.meals && data.meals.length > 0) {
        setSelectedRecipe(data.meals[0]);
      } else {
        setError('Failed to load recipe details.');
      }
    } catch (err) {
      setError('Failed to load recipe details.');
    }
  };

  const addToFavorites = (recipe) => {
    setFavorites((prevFavorites) => [...prevFavorites, recipe]);
  };

  const removeFromFavorites = (recipe) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.idMeal !== recipe.idMeal));
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
        {/* Header Component */}
        <Header
          onSearch={handleSearch}
          onViewFavorites={handleViewFavorites}
          favoriteCount={favorites.length}
        />

        {/* Main content area */}
        <main className="flex-grow">
          {!selectedRecipe && (
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
          )}

          {/* Display error message in favorites view */}
          {isFavoritesView && error && (
            <div className="text-center p-4">
              {error}
            </div>
          )}

          {/* Conditional rendering for recipe details or home page */}
          {selectedRecipe ? (
            <RecipeDetails recipe={selectedRecipe} onBack={handleBack} />
          ) : (
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    recipes={recipes}
                    error={isFavoritesView ? null : error}
                    favorites={favorites}
                    addToFavorites={addToFavorites}
                    removeFromFavorites={removeFromFavorites}
                    onViewDetails={handleViewDetails}
                  />
                }
              />
            </Routes>
          )}
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
