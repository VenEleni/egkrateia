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
    color: "rgba(43, 63, 229, 0.8)"
  },
  {
    label: "b",
    value: 600,
    color: "rgba(250, 192, 19, 0.8)"
  },
  {
    label: "c",
    value: 350,
    color: "rgba(253, 135, 135, 0.8)"
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
