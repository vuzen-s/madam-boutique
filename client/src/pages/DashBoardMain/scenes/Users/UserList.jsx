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
import Swal from "sweetalert2";

const UserList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate("../user/create");
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


  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/api/destroy/${id}`);
          
          const updatedUsers = users.filter(user => user.id !== id);
          setUsers(updatedUsers);

          console.log("User status updated to Hidden");

          Swal.fire("Deleted!", "", "success");
        } catch (e) {
          console.log("Error deleting user:", e);
          Swal.fire("Failed!", "Could not delete user", "error");
        }
      }
    });
  };
  

  return (
    <div>
      <div className="bg-white rounded-md py-2 px-2.5 flex justify-between items-center shadow-md">
        <Breadcrumb
          style={{ margin: "5px 0", fontSize: "20px", fontWeight: "500" }}
        >
          <Breadcrumb.Item className="text-2xl">User Information</Breadcrumb.Item>
          {/* <Breadcrumb.Item>User list</Breadcrumb.Item> */}
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
      <div className="bg-white rounded-md shadow-lg my-3">
        <Box>
          <Box
            height="83vh"
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
                        onClick={() => handleDeleteUser(params.id)}
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
