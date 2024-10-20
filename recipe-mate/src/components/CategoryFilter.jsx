import React from 'react';

const CategoryFilter = ({ onSelectCategory }) => {
  // Define the list of categories
  const categories = [
    'Desserts',
    'Appetizers',
    'Main Course',
    'Breakfast',
    'Soups',
    'Salads'
  ];

  return (
    <div className="categories-container flex justify-center space-x-4 p-4 bg-gray-100">
      {categories.map((category) => (
        <button
          key={category}
          className="bg-blue-950 text-white p-2 rounded-lg hover:bg-yellow-500 transition duration-200"
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
