import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Summary.css";

import { PiFlagCheckeredFill } from "react-icons/pi";
import { IoFastFood } from "react-icons/io5";
import { BsFire } from "react-icons/bs";

import { Doughnut } from "react-chartjs-2";

export default function Summary() {
  const [data, setData] = useState([
    {
      label: "Remaining",
      value: 0,
      color: "gray",
    },
    {
      label: "Base Goal",
      value: 2000,
      color: "#03e9f4",
    },
    {
      label: "Food",
      value: 1786,
      color: "#019fd7",
    },
    {
      label: "Exercise",
      value: 586,
      color: "#bae5fa",
    },
  ]);

  data[0].value += data[1].value;
  data[0].value -= data[2].value;
  data[0].value += data[3].value;

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
              <span>{data[0].value}</span> <br />
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
