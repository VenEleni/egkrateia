// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ExerciseAPI.css";
import { addExercise } from "../services/exerciseService";

function ExerciseAPI() {
  const [activity, setActivity] = useState("");
  const [activitys, setActivitys] = useState({
    name: "",
    date: "",
    totalCalories: 0,
  });
  const [queryList, setQueryList] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.api-ninjas.com/v1/caloriesburned?activity=${activitys.name}`,
          {
            headers: {
              "X-Api-Key": "xg5aOl5gp4Xwdrtap00Jrw==C8gab5Ci2kpVodAt",
            },
          }
        );

        setQueryList(response.data.map((data) => data.name));
        setData(response.data);
        setError(null);
      } catch (error) {
        setError("Error fetching data. Please try again.");
        setQueryList([]);
      }
    };

    if (activitys.name) {
      fetchData();
    }
  }, [activitys.name]);

  const handleNameClick = (value) => {
    setActivitys({ ...activitys, name: value });
    setQueryList([]);
  };

  const getCaloriesBurned = (duration) => {
    if (data.length > 0) {
      const activityData = data.find((item) => item.name === activitys.name);
      if (activityData) {
        const totalCalories = activityData.calories_per_hour * (duration / 60);
        setActivitys({ ...activitys, totalCalories });
      }
    }
  };

  const findActivity = (value) => {
    setActivitys({ ...activitys, name: value });
    setQueryList([]);
  };

  const handleAddExercise = (event) => {
    event.preventDefault();
    const activityData = { exerciseName: activitys.name, burnedCalories: activitys.totalCalories, date: activitys.date };
    console.log(activityData);
    // You can add additional logic here to handle the submitted activity data.
    addExercise(activityData)
  };

  return (
    <>
      <form className="meal-form" onSubmit={handleAddExercise}>
        <h3>Add Exercise</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter Activity"
          value={activitys.name}
          onChange={(e) => handleNameClick(e.target.value)}
          required
        />
        {queryList.length > 0 && (
          <div className="queryList">
            <ul className="queryList-ul">
              {queryList.map((value, index) => (
                <li
                  className="queryList-li"
                  key={index}
                  onClick={() => findActivity(value)}
                >
                  {value}
                </li>
              ))}
            </ul>
          </div>
        )}
        <input
          type="date"
          name="date"
          value={activitys.date}
          required
          onChange={(e) => setActivitys({ ...activitys, date: e.target.value })}
        />
        <input
          type="number"
          name="duration"
          placeholder="How long? (M)"
          onChange={(e) => getCaloriesBurned(e.target.value)}
          required
        />
        <input
          type="number"
          name="calories"
          placeholder="Calories Burned"
          value={activitys.totalCalories}
          required
          disabled
        />
        <button type="submit">Add Exercise</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
}

export default ExerciseAPI;
