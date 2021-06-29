import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import axios from "axios";

const Table = () => {
  const [apiData, setApiData] = useState({
    data: [],
  });

  //GET DATA
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
          console.log(response.data.profiles);
          setApiData({ ...apiData, data: response.data.profiles });
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  if (!apiData.data) {
    return <h1>loading data</h1>;
  }
  console.log(apiData.data);

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "JobRole",
      selector: "jobRole",
      sortable: true,
    },
    {
      name: "experience",
      selector: "experience",
      sortable: true,
    },
    {
      name: "Industry",
      selector: "industry",
      sortable: true,
    },
    {
      name: "skills",
      selector: "skills",
      sortable: true,
    },
    {
      name: "State",
      selector: "state",
      sortable: true,
    },
    {
      name: "visibilityDuration",
      selector: "visibilityDuration",
      sortable: true,
    },
    {
      name: "City",
      selector: "city",
      sortable: true,
    },
    {
      name: "Year",
      selector: "year",
      sortable: true,
      right: true,
    },
  ];

  createTheme("solarized", {
    text: {
      primary: "#858aa7",
      secondary: "#FFFFFFFFF",
    },
    background: {
      default: "#191c24",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "#FFFFFF",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  });

  return apiData.data ? (
    <DataTable
      title="Profiles"
      columns={columns}
      data={apiData.data}
      pagination
      selectableRows
      theme="solarized"
    />
  ) : (
    <h2>loading</h2>
  );
};
export default Table;
