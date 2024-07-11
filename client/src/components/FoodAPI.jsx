import React, { useState } from 'react';

export default function FootAPI () {
  const [query, setQuery] = useState('');
  const [foodData, setFoodData] = useState(null);
  const API_KEY = 'D98Manm4Vvcrsa5XS0tnuBALZwsfCHba9wk9jb9Y';

  const searchFood = async () => {
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    setFoodData(data.foods[0]);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a food item"
      />
      <button onClick={searchFood}>Search</button>
      {foodData && (
        <div>
          <h3>{foodData.description}</h3>
          <p>Calories: {foodData.foodNutrients.find(nutrient => nutrient.nutrientName === 'Energy').value} kcal</p>
          <p>Protein: {foodData.foodNutrients.find(nutrient => nutrient.nutrientName === 'Protein').value} g</p>
          <p>Carbohydrates: {foodData.foodNutrients.find(nutrient => nutrient.nutrientName === 'Carbohydrate, by difference').value} g</p>
          <p>Fat: {foodData.foodNutrients.find(nutrient => nutrient.nutrientName === 'Total lipid (fat)').value} g</p>
        </div>
      )}
    </div>
  );
};

