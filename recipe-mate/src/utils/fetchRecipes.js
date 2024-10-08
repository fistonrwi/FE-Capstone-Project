// src/utils/fetchRecipes.js

import axios from 'axios';

const API_URL = 'https://api.spoonacular.com/recipes/complexSearch';

export const fetchRecipesByCategory = async (category) => {
  try {
    // Map category names to API-recognized terms or queries
    const categoryMap = {
      Breakfast: "breakfast",
      Desserts: "dessert",
      Appetizers: "appetizer",
      "Main Course": "main course",
      Soups: "soup",
      Salads: "salad",
    };

    const response = await axios.get(API_URL, {
      params: {
        apiKey: API_KEY,
        type: categoryMap[category] || category.toLowerCase(),
        number: 15,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes: ", error);
    return [];
  }
};
