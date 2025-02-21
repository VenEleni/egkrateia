import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Summary.css";

import { PiFlagCheckeredFill } from "react-icons/pi";
import { IoFastFood } from "react-icons/io5";
import { BsFire } from "react-icons/bs";

import { Doughnut } from "react-chartjs-2";

export default function Summary({Base, Food, Exercise}) {
  const [data, setData] = useState([
    {
      label: "Remaining",
      value: 0,
      color: "gray",
    },
    {
      label: "Base Goal",
      value: Base,
      color: "#03e9f4",
    },
    {
      label: "Food",
      value: Food,
      color: "#019fd7",
    },
    {
      label: "Exercise",
      value: Exercise,
      color: "#bae5fa",
    },
  ]);

  useEffect(() => {
    const remaining = Base - Food + Exercise;
    setData([
      {
        label: "Remaining",
        value: remaining,
        color: "gray",
      },
      {
        label: "Base Goal",
        value: Base,
        color: "#03e9f4",
      },
      {
        label: "Food",
        value: Food,
        color: "#019fd7",
      },
      {
        label: "Exercise",
        value: Exercise,
        color: "#bae5fa",
      },
    ]);
  }, [Base, Food, Exercise]);


  return (
    <div className="summary-container">
      <div className="summary-wrapper">
        <h1>Calories</h1>
        <p>Remaining = Goal - Food + Exercise</p>

        <div className="detail">
          <div className="circleBar">
            <Doughnut
              data={{
                datasets: [
                  {
                    data: data.map((item) =>
                      item.label !== "Base Goal" ? item.value : 0
                    ),
                    backgroundColor: data.map((item) => item.color),
                    hoverOffset: 10,
                  },
                ],
              }}
              options={{
                cutout: 80,
              }}
            />
            <h1>
              {" "}
              <span>{Math.floor(data[0].value)}</span> <br />
              Remaining{" "}
            </h1>
          </div>
          <div className="left">
            <div className="parts-main">
              <div>
                <PiFlagCheckeredFill style={{ color: data[1].color }} />
              </div>
              <div>
                Base Goal <br /> <span>{data[1].value}</span>
              </div>
            </div>
            <div className="parts-main">
              <div>
                <IoFastFood style={{ color: data[2].color }} />
              </div>
              <div>
                Food <br /> <span>{data[2].value}</span>
              </div>
            </div>
            <div className="parts-main">
              <div>
                <BsFire style={{ color: data[3].color }} />
              </div>
              <div>
                Exercise <br /> <span>{data[3].value}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}