import React from "react";
import "./Dashboard.css";
import { Chart as ChartJS, defaults, plugins } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "center";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const data = [
  {
    label: "a",
    value: 120,
    color: "#03e9f4"
  },
  {
    label: "b",
    value: 600,
    color: "#019fd7"
  },
  {
    label: "c",
    value: 350,
    color: "#bae5fa"
  }
]


export default function dashboard() {
  return (
    <div className="dashboard-Container">
      <div className="dataCard chart1">
        <Bar
          data={{
            labels: data.map((data) => data.label),
            datasets: [
              {
                label: "Example",
                data: data.map((data) => data.value),
                backgroundColor: data.map((data) => data.color),
                borderRadius: 5,
              },
            ],
          }}
        />
        <h1></h1>
      </div>
      <div className="dataCard chart2">
        <Doughnut
          data={{
            labels: data.map((data) => data.label),
            datasets: [
              {
                label: "Example",
                data: data.map((data) => data.value),
                backgroundColor: data.map((data) => data.color),
                borderRadius: 5,
                spacing: 5,
                hoverOffset: 10,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Water",
              },
            },
          }}
        />
      </div>
    </div>
  );
}
