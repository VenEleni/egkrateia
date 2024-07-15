// src/App.js
import React, { useState } from "react";
import axios from "axios";
import "./ExerciseAPI.css"

function ExerciseAPI() {
  const [activity, setActivity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getCaloriesBurned = async () => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}`,
        {
          headers: { "X-Api-Key": "xg5aOl5gp4Xwdrtap00Jrw==C8gab5Ci2kpVodAt" },
        }
      );
      setData(response.data);
      setError(null);
    } catch (error) {
      setError("Error fetching data. Please try again.");
      setData(null);
    }
  };

  return (
    <>
      <div className="exercise-Container">
        <h1>Calories Burned Calculator</h1>
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Enter activity"
        />
        <button onClick={getCaloriesBurned}>Get Calories Burned</button>
        {data && (
          <div>
            <h2>Results:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
      {/* <form className="meal-form" onSubmit={handleSubmit}>
        <h3>{existingMeal ? "Edit Meal" : "Add Meal"}</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={meal.name}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={meal.date.split("T")[0]}
          onChange={handleChange}
          required
        />
        <select
          name="mealType"
          value={meal.mealType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Meal Type
          </option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={meal.calories}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {existingMeal ? "Update Meal" : "Add Meal"}
        </button>
      </form> */}
    </>
  );
}

export default ExerciseAPI;
