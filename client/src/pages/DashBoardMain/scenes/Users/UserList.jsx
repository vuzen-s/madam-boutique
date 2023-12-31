import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { colums } from './colums/columsUserList';
import 'react-toastify/dist/ReactToastify.css';

const UserList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate("../users/create");
  };

  const handleEditUser = (id) => {
    navigate(`/dashboard/user/edit/${id}`);
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users`).then((res) => {
      console.log(res.data.users);
      setUsers(res.data.users);
    });
  }, []);

  return (
    <div>
      <div className="bg-white rounded-md p-2 flex justify-between items-center shadow-md">
        <Breadcrumb
          style={{ margin: "2px 0", fontSize: "20px", fontWeight: "500" }}
        >
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>User list</Breadcrumb.Item>
        </Breadcrumb>

        <Button
          variant="contained"
          color="success"
          onClick={handleCreateUser}
          style={{ width: "150px", height: "40px" }}
        >
          Create User
        </Button>
      </div>
      <div className="bg-white rounded-md shadow-lg">
        <Box>
          <Box
            m="8px 0 0 0"
            height="75vh"
            width="100%"
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
                borderRadius: "8px 8px 0 0",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                borderRadius: "0 0 8px 8px",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid

              rows={users}

              columns={colums.map((column) => ({

                ...column,

                renderCell: (params) => {
                  if (column.field === "edit") {
                    return (
                      <Button
                        onClick={() => handleEditUser(params.id)}
                        sx={{
                          bgcolor: "#2b8b57",
                          color: "white",
                          "&:hover": { bgcolor: "#3cb371" },
                          width: "80px",
                        }}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    );
                  } else if (column.field === 'delete') {
                    return (
                      <Button
                        // onClick={() => handleDeleteUser(params.id)}
                        sx={{
                          bgcolor: "#d32f2f",
                          color: "white",
                          "&:hover": { bgcolor: "#f44336" },
                          width: "100px",
                        }}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    );
                  }
                  return column.renderCell
                    ? column.renderCell(params)
                    : params.value;
                },
              }))}
            />
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default UserList;
