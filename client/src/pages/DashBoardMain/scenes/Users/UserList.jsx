import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Box, useTheme} from "@mui/material";
import Button from "@mui/material/Button";
import {DataGrid} from "@mui/x-data-grid";
import {Breadcrumb, Modal} from "antd";
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {tokens} from "../../theme";
import {colums} from "./colums/columsUserList";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import useAuthContext from "../../../AuthContext/AuthContext";
import "./View.css";
import {columsPaymentHistoryDashboard} from "./colums/columsPaymentHistory";

const UserList = () => {
    const [dataPaymentHistory, setDataPaymentHistory] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const {usersAuthFetch} = useAuthContext();
    const userLevel = usersAuthFetch.level; // Lấy level của người dùng đăng nhập hiện tại
    const userId = usersAuthFetch.id; // Lấy id của người dùng đăng nhập hiện tại
    console.log(usersAuthFetch);
    const [isModalVisible, setIsModalVisible] = useState(false); // State để quản lý trạng thái modal
    const [selectedUserDetails, setSelectedUserDetails] = useState(null); // State để lưu thông tin người dùng được chọn

    // Get data orders payments history
    const handlePaymentHistory = async (userID) => {
        await fetch('http://127.0.0.1:8000/api/orders/' + userID, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data.orders);
                setDataPaymentHistory(data.orders);
            })
            .catch((error) => console.log(error));
    }

    // Xử lý khi click vào nút View
    const handleViewUser = async (user) => {
        await handlePaymentHistory(user.id);
        setSelectedUserDetails(user); // Cập nhật thông tin người dùng được chọn
        setIsModalVisible(true); // Mở modal
    };

    const handleCancel = () => {
        setIsModalVisible(false); // Đóng modal
    };

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
                    style={{margin: "5px 0", fontSize: "20px", fontWeight: "500"}}
                >
                    <Breadcrumb.Item className="text-2xl">
                        User Information
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Button
                    variant="contained"
                    color="success"
                    onClick={handleCreateUser}
                    style={{width: "150px", height: "40px"}}
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
                                                        "&:hover": {bgcolor: "#3cb371"},
                                                        width: "80px",
                                                    }}
                                                    startIcon={<EditIcon/>}
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
                                                        "&:hover": {bgcolor: "#f44336"},
                                                        width: "100px",
                                                    }}
                                                    startIcon={<DeleteIcon/>}
                                                >
                                                    Delete
                                                </Button>
                                            );
                                        } else {
                                            return null; // Không hiển thị nút delete cho các trường hợp còn lại
                                        }
                                    } else if (column.field === "detail") {
                                        return (
                                            <>
                                                <Button
                                                    onClick={async () => await handleViewUser(params.row)}
                                                    sx={{
                                                        bgcolor: "#1565c0",
                                                        color: "white",
                                                        "&:hover": {bgcolor: "#1976d2"},
                                                        width: "90px",
                                                    }}
                                                    startIcon={<VisibilityIcon/>}
                                                >
                                                    View
                                                </Button>

                                                <Modal
                                                    visible={isModalVisible}
                                                    width={1000}
                                                    centered
                                                    onCancel={handleCancel}
                                                    footer={[
                                                        <Button
                                                            key="back"
                                                            className="mt-2"
                                                            onClick={handleCancel}
                                                        >
                                                            Close
                                                        </Button>,
                                                    ]}
                                                >
                                                    {selectedUserDetails && (
                                                        <div
                                                            className="flex h-[60vh] flex-col gap-2.5 overflow-y-scroll scrollbar-none ">
                                                            {/* Thông tin liên hệ của user */}
                                                            <div className="text-lg">
                                                                <h1 className="text-2xl text-gray-700 mb-2 underline underline-offset-4 decoration-[1px] font-bold">
                                                                    Contact Info
                                                                </h1>
                                                                <div className="px-3">
                                                                    <p>
                                                                        <strong>ID:</strong>{" "}
                                                                        {selectedUserDetails.id}
                                                                    </p>
                                                                    <p>
                                                                        <strong>Email:</strong>{" "}
                                                                        {selectedUserDetails.email}
                                                                    </p>
                                                                    <p>
                                                                        <strong>Phone Number:</strong>{" "}
                                                                        {selectedUserDetails.phone
                                                                            ? selectedUserDetails.phone
                                                                            : "null"}
                                                                    </p>
                                                                    <p>
                                                                        <strong>Address:</strong>{" "}
                                                                        {selectedUserDetails.address
                                                                            ? selectedUserDetails.address
                                                                            : "null"}
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {/* Lịch sử thanh toán của user */}

                                                            <div>
                                                                <h2 className="text-2xl text-gray-700 mb-3 underline underline-offset-4 decoration-[1px] font-bold">
                                                                    Payment History
                                                                </h2>
                                                                <div className="pb-3">
                                                                    <div className="bg-white rounded-md shadow-lg">
                                                                        <Box>
                                                                            <Box
                                                                                m="8px 0 0 0"
                                                                                height="53vh"
                                                                                width="100%"
                                                                                sx={{
                                                                                    "& .MuiDataGrid-root": {
                                                                                        border: "none",
                                                                                    },
                                                                                    "& .MuiDataGrid-cell": {
                                                                                        borderBottom: "none",
                                                                                    },
                                                                                    "& .name-column--cell": {
                                                                                        color: colors.greenAccent[100],
                                                                                    },
                                                                                    "& .MuiDataGrid-columnHeaders": {
                                                                                        backgroundColor: colors.grey[800],
                                                                                        Height: "10px",
                                                                                        borderBottom: "none",
                                                                                        borderRadius: "8px 8px 0 0",
                                                                                    },
                                                                                    "& .MuiDataGrid-virtualScroller": {
                                                                                        backgroundColor:
                                                                                            colors.primary[400],
                                                                                    },
                                                                                    "& .MuiDataGrid-footerContainer": {
                                                                                        borderTop: "none",
                                                                                        borderRadius: "0 0 8px 8px",
                                                                                        backgroundColor: colors.grey[800],
                                                                                    },
                                                                                    "& .MuiCheckbox-root": {
                                                                                        color: `${colors.greenAccent[200]} !important`,
                                                                                    },
                                                                                }}
                                                                            >
                                                                                <DataGrid
                                                                                    rows={dataPaymentHistory} // goi ApI cap nhat trang thai cua bang
                                                                                    columns={columsPaymentHistoryDashboard}
                                                                                />
                                                                            </Box>
                                                                        </Box>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Modal>
                                            </>
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
