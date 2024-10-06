// src/utils/fetchRecipes.js

import axios from 'axios';

const API_URL = 'https://api.spoonacular.com/recipes/complexSearch';
const API_KEY = 'YOUR_API_KEY'; // Replace with your Spoonacular API key

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
        number: 6, // Number of recipes to fetch per category
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching recipes: ", error);
    return [];
  }
};
