import React, { useState, useEffect } from "react";
import { Line, Bar, Doughnut, Pie, Scatter } from "react-chartjs-2";
import axios from "axios";
export const Charts = () => {
  const [apiData, setApiData] = useState({
    data: [],
  });

  //GET DATA from API
  useEffect(() => {
    axios
      .post(
        "https://nwmxjrs4cb.execute-api.ap-south-1.amazonaws.com/prod/talent/profiles",
        {
          limit: 20,
          offset: 0,
        }
      )
      .then(
        (response) => {
          console.log(response.data.profiles.city);
          setApiData({
            ...apiData,
            data: response.data.profiles,
            city: response.data.profiles.city,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  if (!apiData.data) {
    return <h1>loading data</h1>;
  }

  //FILTER DATA

  const citydata = apiData.data.map((data) => {
    return data.city;
  });
  const experienceData = apiData.data.map((data) => {
    return data.experience;
  });

  var experienceCounts = {};

  for (var i = 0; i < experienceData.length; i++) {
    var num = experienceData[i];
    experienceCounts[num] = experienceCounts[num]
      ? experienceCounts[num] + 1
      : 1;
  }

  var counts = {};
  for (var i = 0; i < citydata.length; i++) {
    var num = citydata[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  var label = [];
  var labelData = [];
  var colors = [];
  const colorAdder = () => {
    switch (counts[key]) {
      case 1:
        return "green";
        break;

      case 2:
        return "rgba(255, 206, 86, 1)";
        break;
      case 3:
        return "rgba(54, 162, 235, 1)";
        break;
      case 4:
        return "rgba(255,99,132,1)";
        break;
      default:
        return "rgba(255, 159, 64, 1)";
    }
  };

  for (var key in counts) {
    label.push(key);
    labelData.push(counts[key]);
    let res = colorAdder(counts[key]);
    colors.push(res);
  }

  var experienceLabel = [];
  var experienceLabelData = [];

  for (var key in experienceCounts) {
    experienceLabel.push(key);
    experienceLabelData.push(experienceCounts[key]);
  }

  //DATAS OF CHARTS
  const data = {
    labels: label,
    datasets: [
      {
        label: label,
        data: labelData,
        backgroundColor: colors,
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(204, 204, 204,0.1)",
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };
  const doughnutPieData = {
    datasets: [
      {
        data: experienceLabelData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255,99,132,1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: experienceLabel,
  };

  const doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };
  return (
    <div>
      <div className="page-header">
        <h3 className="page-title">Visualize</h3>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="!#" onClick={(event) => event.preventDefault()}>
                Charts
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Chart-js
            </li>
          </ol>
        </nav>
      </div>
      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Bar Chart Based on Location</h4>
              <Bar data={data} options={options} />
            </div>
          </div>
        </div>
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Pie Chart Vased on Experience</h4>
              <Pie data={doughnutPieData} options={doughnutPieOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
