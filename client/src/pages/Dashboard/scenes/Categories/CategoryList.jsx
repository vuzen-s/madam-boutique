import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  // CALL CATEGORIES LIST FROM DATABASE
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respon) => respon.json())
      .then((data) => {
        console.log(data);
        setCategories(data.categories);
      })
      .catch((error) => console.log(error));
  }, []);

  const theme = useTheme();
  const colors =
    theme.palette.mode === "dark"
      ? theme.palette.grey[300]
      : theme.palette.grey[700];

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "parent", headerName: "Parent", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Typography variant="h5" mb="20px">
        Category List
      </Typography>
      <Box height="400px" width="100%">
        <DataGrid rows={categories} columns={columns} pageSize={5} />
      </Box>
    </Box>
  );
};

export default CategoryList;
