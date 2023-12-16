import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const CollectionList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [collections, setCollections] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    // Gọi API khi component được render
    axios.get('http://127.0.0.1:8000/api/collections')
      .then(response => {
        // In dữ liệu vào console để kiểm tra
        console.log(response.data);
        setCollections(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleEditClick = (id) => {
    // Tìm dòng dựa trên ID
    const selected = collections.find((row) => row.id === id);
    setSelectedRow(selected);
  };

  const handleUpdate = () => {
    // Gửi yêu cầu cập nhật đến API sử dụng selectedRow
    if (selectedRow) {
      axios.put(`http://127.0.0.1:8000/api/collections/${selectedRow.id}/update`, selectedRow)
        .then(response => {
          console.log('Update successful:', response.data);
          // Cập nhật lại dữ liệu sau khi cập nhật thành công
          // setCollections(updatedCollections);
          // Đặt lại selectedRow về null để ẩn giao diện chỉnh sửa
          setSelectedRow(null);
        })
        .catch(error => {
          console.error('Update failed:', error);
        });
    }
  };

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
    {
      field: "edit",
      headerName: "Edit",
      flex: 2,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Button
            onClick={() => handleEditClick(params.row.id)}
            color="secondary"
            variant="outlined"
          >
            Edit
          </Button>
        </Box>
      ),
    },
  ];

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
          rows={collections}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      {selectedRow && (
        <Box mt="20px">
          <h2>Edit Collection</h2>
          <form>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Name"
              value={selectedRow.name}
              onChange={(e) => setSelectedRow({ ...selectedRow, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Name Design"
              value={selectedRow.name_design}
              onChange={(e) => setSelectedRow({ ...selectedRow, name_design: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Button
              onClick={handleUpdate}
              color="secondary"
              variant="contained"
            >
              Update
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default CollectionList;
