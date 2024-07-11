import React, { useState } from 'react';

export default function FootAPI () {

      const [query, setQuery] = useState('');
      const [nutrition, setNutrition] = useState(null);
      const APP_ID = 'cb1e0ee2';
      const APP_KEY = '8a127187991a13654258887280792963';
    
      const fetchNutrition = async () => {
        const response = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&nutrition-type=cooking&ingr=${encodeURIComponent(query)}`);
        const data = await response.json();
        setNutrition(data);
        console.log(data)
      };
    
      return (
        <div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a food item with quantity (e.g., 1 cup of beans)"
          />
          <button onClick={fetchNutrition}>Get Nutrition Info</button>
          {nutrition && (
            <div>
              <h3>Nutritional Information for {query}:</h3>
              <p>Calories: {nutrition.calories}</p>
              <p>Protein: {nutrition.totalNutrients?.PROCNT?.quantity} {nutrition.totalNutrients?.PROCNT?.unit}</p>
              <p>Carbs: {nutrition.totalNutrients?.CHOCDF?.quantity} {nutrition.totalNutrients?.CHOCDF?.unit}</p>
              <p>Fat: {nutrition.totalNutrients?.FAT?.quantity} {nutrition.totalNutrients?.FAT?.unit}</p>
            </div>
          )}
        </div>
      );
    };
    

    