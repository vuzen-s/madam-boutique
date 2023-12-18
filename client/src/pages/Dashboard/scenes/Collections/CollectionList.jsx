import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const CollectionList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [collections, setCollections] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", flex: 2 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 4,
      cellClassName: "name-column--cell",
    },
    {
      field: "name_design",
      headerName: "Name_design",
      flex: 4,
      cellClassName: "name-column--cell",
    },
  ];

  useEffect(() => {
    // Gọi API khi component được render
    axios.get('http://127.0.0.1:8000/api/collections')
      .then(response => {
        // In dữ liệu vào console để kiểm tra
        console.log( response.data);
        setCollections(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <Box m="20px">
      <Header
        title="LIST COLLECTIONS"
        subtitle="List of Collection for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={collections}  // Sử dụng dữ liệu từ API 
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default CollectionList;
