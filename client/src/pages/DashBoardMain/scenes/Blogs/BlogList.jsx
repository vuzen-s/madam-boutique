import {Box, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import Swal from 'sweetalert2';
import Header from "../../components/Header";
import {tokens} from "../../theme";
import {Tag} from "antd";
import 'react-toastify/dist/ReactToastify.css';

const BlogList = () => {
    const [blogList, setBlogList] = useState([]);
    const [publicPath, setPublicPath] = useState("");

    // Get data collections
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/blogs', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data.blogs);
                setBlogList(data.blogs);
            })
            .catch((error) => console.log(error));
    }, []);

    const navigate = useNavigate();

    const handleEditItem = (idBlog) => {
        // navigate
        navigate('/dashboard/blog/edit/' + idBlog);
    }

    const handleDeleteItem = (idBlog) => {
        Swal.fire({
            title: "Bạn chắc chắn muốn xóa bộ bài viết này?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Xóa",
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await fetch('http://127.0.0.1:8000/api/blogs-destroy/' + idBlog, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then((respon) => respon.json())
                    .then((data) => {
                        console.log(data);
                        console.log(idBlog);
                        // handle event
                        Swal.fire("Đã xóa!", "", "success");
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.log(error)
                        Swal.fire("Không thể xóa value này vì nó đang là khóa ngoại!", "", "error");
                    });
            }
        });
    }

    /// Get path to public in serve
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/blogs-publicPath', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data);
                setPublicPath(data.publicPath);
            })
            .catch((error) => console.log(error));
    }, []);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    /// Get path to public in serve
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/blogs-public-path', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data);
                setPublicPath(data.publicPath);
            })
            .catch((error) => console.log(error));
    }, []);

    const columns = [
        {field: "id", headerName: "ID", headerAlign: "center", flex: 0.2, align: "center",},
        {
            field: "title",
            headerName: "Tên bài viết",
            headerAlign: "center",
            align: "center",
            flex: 0.5,
        },
        {
            field: "content",
            headerName: "Nội dung bài viết",
            headerAlign: "center",
            align: "center",
            flex: 0.5,
        },
        {
            field: "avatar_blog",
            headerName: "Ảnh bài viết",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <img
                    src={params.value === "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg" ? "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg" : publicPath + "/" + params.value}
                    alt={params.row.name} width="60px"/>
            ),
            flex: 0.5,
        },
        {
            field: "status",
            headerName: "Status",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div>
                    {
                        params.value === 1
                            ? <Tag bordered={false} color="success">
                                Hiển thị
                            </Tag>
                            : <Tag bordered={false} color="error">
                                Ẩn
                            </Tag>
                    }
                </div>
            ),
            flex: 0.3,
        },
        {
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div style={{display: 'flex', columnGap: '4px'}}>
                    <button type="button" class="btn btn-warning" style={{background: '#ffc107'}}
                            onClick={() => handleEditItem(params.row.id)}>
                        Sửa
                    </button>
                    <button type="button" class="btn btn-danger" style={{background: '#dc3545'}}
                            onClick={() => handleDeleteItem(params.row.id)}>
                        Xóa
                    </button>
                </div>
            ),
            flex: 0.5,
        },
    ];

    return (
        <Box m="20px">
            <Header
                title="LIST BLOGS"
                subtitle="List of Blog for Future Reference"
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
                        backgroundColor: colors.redAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.redAccent[700],
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
                    rows={blogList}
                    columns={columns}
                />
            </Box>
            <ToastContainer/>
        </Box>
    );
};

export default BlogList;
