
import EditIcon from "@mui/icons-material/Edit";
import { Box, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Breadcrumb } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { columsStatusDetail } from "./colums/columsStatusDetail";
import Swal from "sweetalert2";

const UserStatusDetail = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/detail-delete`).then((res) => {
      console.log(res.data.users);
      setUsers(res.data.users);
    }).catch((e) => {
        if(e.response && e.response.status === 404) {
            Swal.fire({
                icon: 'warning',
                title: "There Are Currently No Deleted Users!",
                confirmButtonText: "Back To User List",
            }).then((result) => {
                if(result.isConfirmed){
                    navigate("/dashboard/user")
                }
            })
        }
    })
  }, []);

  
  const handleBackToList = () => {
    navigate("/dashboard/user");
  };

  const handleUpdateStatus = (id) => {
    Swal.fire({
      title: "Are you sure to restore this user?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Restore",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(`http://localhost:8000/api/users/show/${id}`);
          
          const updatedUsers = users.filter(user => user.id !== id);
          setUsers(updatedUsers);

          console.log("User status updated to Show");

          Swal.fire("Restore User Successfully!", "", "success");
        } catch (e) {
          console.log("Error deleting user:", e);
          Swal.fire("Failed!", "Could not update user", "error");
        }
      }
    })
  };
  
  return (
    <div>
      <div className="bg-white rounded-md py-2 px-2.5 mb-3 flex justify-between items-center shadow-md">
        <Breadcrumb
          style={{ margin: "5px 0", fontSize: "20px", fontWeight: "500" }}
        >
          <Breadcrumb.Item className="text-2xl">Deleted User</Breadcrumb.Item>
          {/* <Breadcrumb.Item>User edit</Breadcrumb.Item> */}
        </Breadcrumb>
        <Button
          variant="contained"
          color="success"
          onClick={handleBackToList}
          style={{ width: "100px", height: "40px" }}
        >
          Back
        </Button>
      </div>
      <div className="bg-white rounded-md shadow-lg my-3">
        <Box>
          <Box
            height="70vh"
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

              columns={columsStatusDetail.map((column) => ({

                ...column,

                renderCell: (params) => {
                  if (column.field === "edit") {
                    return (
                      <Button
                        onClick={() => handleUpdateStatus(params.id)}
                        sx={{
                          bgcolor: "#2b8b57",
                          color: "white",
                          "&:hover": { bgcolor: "#3cb371" },
                        }}
                        startIcon={<EditIcon />}
                      >
                       Restore
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

export default UserStatusDetail;
