import axios from 'axios';

const API_KEY = '75c999aeddc1b642abdd8fb75afb7c3a';
const APP_ID = '4fa55f3b';

export const AutoCompleteFood = async (query) => {
  const API_URL = 'https://api.edamam.com/auto-complete';
    try{
      const res = await axios.get(`${API_URL}?app_id=${APP_ID}&app_key=${API_KEY}&q=${query}`)
      return res.data;
    }
    catch(error){
      console.error(error);
    }
}

export const getFoodID = async (query) => {
  const API_URL = 'https://api.edamam.com/api/food-database/v2/parser';
  try{
    const res = await axios.get(`${API_URL}?app_id=${APP_ID}&app_key=${API_KEY}&ingr=${query}`)
    const parsedFood = res.data.parsed.find(item => item.food.label.toLowerCase() === query.toLowerCase());
    if (parsedFood) {
      return parsedFood.food.foodId;
    } else {
      console.error('Food item not found');
    }
  } catch (error) {
    console.error(error);
  }
}

export const getNutrients = async (foodId) => {
  const API_URL = 'https://api.edamam.com/api/food-database/v2/nutrients';
  try {
    const res = await axios.post(API_URL, {
      ingredients: [
        {
          quantity: 1,
          measureURI: 'http://www.edamam.com/ontologies/edamam.owl#Measure_gram',
          foodId: foodId
        }
      ]
    }, {
      params: {
        app_id: APP_ID,
        app_key: API_KEY
      }
    });
    return res.data.totalNutrients;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getCalories = async (foodId) => {
  const API_URL = 'https://api.edamam.com/api/food-database/v2/nutrients';
  try {
    const res = await axios.post(API_URL, {
      ingredients: [
        {
          quantity: 1,
          measureURI: 'http://www.edamam.com/ontologies/edamam.owl#Measure_unit',
          foodId: foodId
        }
      ]
    }, {
      params: {
        app_id: APP_ID,
        app_key: API_KEY
      }
    });

    const totalNutrients = res.data.totalNutrients;
    if (totalNutrients && totalNutrients.ENERC_KCAL && totalNutrients.ENERC_KCAL.quantity) {
      return Math.floor(totalNutrients.ENERC_KCAL.quantity);
    } else {
      console.error('Cal not found:', res.data);
      return 0;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};