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
import { colums } from "./colums/columsUserList";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import useAuthContext from "../../../AuthContext/AuthContext";

const UserList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { usersAuthFetch } = useAuthContext();
  const userLevel = usersAuthFetch.level; // Lấy level của người dùng đăng nhập hiện tại
  const userId = usersAuthFetch.id; // Lấy id của người dùng đăng nhập hiện tại
  console.log(usersAuthFetch);

  // Gồm 3 level:
  // level Admin Master: userLevel = 1
  // level Admin Manager: userLevel = 2
  // level Admin Editor: userLevel = 3 {đã không cho thấy menu User rồi}
  // level Member: userLevel = 4 {đã không cho vào trang dashboard rồi}

  // Phân quyền delete gồm 2 level {userLevel = 1, userLevel = 2}:
  // Tôi muốn xử lý trước phần xóa: Nếu userLevel = 1 thì không cho thấy nút delete và chặn delete vì cấp cao nhất sao đi xóa chính mình được và cho thấy nút Delete của các cấp dưới 2, 3, 4;
  // Nếu userLevel = 2 cũng không cho thấy nút delete, và không thể delete cùng cấp userLevel = 2, càng không thể thấy nút delete của userLevel = 1, cho thấy nút delete của userLevel = 3 và userLevel = 4

  // Phân quyền edit gồm 2 level {userLevel = 1, userLevel = 2}:
  // Tôi muốn xử lý phần edit như sau: Nếu đăng nhập userLevel = 1 vẫn hiện edit có thể chỉnh sửa và có thể  thấy edit tất cả các userLevel = 2, userLevel = 3,  khác;
  // Nếu đăng nhập với userLevel = 2 vẫn hiện edit cho chính mình, nhưng không thể nhìn thấy edit của userLevel = 2 khác tức là không thể chỉnh sửa với userlevel cùng cấp bậc là 2, càng không thể thấy edit và chỉnh sửa userLevel = 1 vì cấp 2 không thể sửa cấp 1, có thể thấy edit và sửa cho userLevel = 3 và userLevel = 4
  console.log(userLevel);

  const handleCreateUser = () => {
    navigate("../user/create");
  };

  const handleEditUser = (id) => {
    navigate(`/dashboard/user/edit/${id}`);
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users`).then((res) => {
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

          const updatedUsers = users.filter((user) => user.id !== id);
          setUsers(updatedUsers);

          console.log("User status updated to Hidden");

          Swal.fire("Delete User Successfully!", "", "success");
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
          <Breadcrumb.Item className="text-2xl">
            User Information
          </Breadcrumb.Item>
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
                    const currentUserId = params.row.id; // Lấy ID của người dùng từ dữ liệu hiện tại bảng users
                    const userLevelValue = params.row.level;
                    if (
                      userLevel === 1 ||
                      (userLevel === 2 && userId === currentUserId) ||
                      (userLevel === 2 && userLevelValue >= 3)
                    ) {
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
                    } else {
                      return null; // Không hiển thị nút Edit cho các trường hợp còn lại
                    }
                  } else if (column.field === "delete") {
                    const userLevelValue = params.row.level; // Lấy level của người dùng từ dữ liệu hiện tại bảng users

                    if (
                      (userLevel === 1 && userLevelValue > 1) ||
                      (userLevel === 2 && userLevelValue > 2)
                    ) {
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
                    } else {
                      return null; // Không hiển thị nút delete cho các trường hợp còn lại
                    }
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
