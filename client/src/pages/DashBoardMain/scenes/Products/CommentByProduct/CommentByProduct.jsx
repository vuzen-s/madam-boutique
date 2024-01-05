import {Box, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import Swal from 'sweetalert2';
import Header from "../../../components/Header";
import {tokens} from "../../../theme";

const CommentByProduct = () => {
    const [productsList, setProductsList] = useState([]);
    const [publicPath, setPublicPath] = useState("");
    const [refreshListCommend, setRefreshListCommend] = useState(new Date().getTime());

    // Get data products
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data.products);
                setProductsList(data.products);
            })
            .catch((error) => console.log(error));
    }, []);

    const navigate = useNavigate();

    const handleDtailItem = (id) => {
        // navigate
        navigate('/dashboard/product/comment/detail/' + id);
    }

    const handleDeleteItem = (id) => {
        Swal.fire({
            title: "Bạn chắc chắn muốn xóa toàn bộ bình luận sản phẩm này?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Xóa",
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await fetch('http://127.0.0.1:8000/api/products-destroy/' + id, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then((respon) => respon.json())
                    .then((data) => {
                        console.log(data);
                        console.log(id);
                    })
                    .catch((error) => console.log(error));
                // handle event
                Swal.fire("Đã xóa!", "", "success");
                setRefreshListCommend(new Date().getTime())
            }
        });
    }

    /// Get path to public in server
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/products-publicPath', {
            method: "GET", headers: {
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

    const columns = [
        {field: "id", headerName: "ID", headerAlign: "center", flex: 0.2, align: "center",},
        {
            field: "name",
            headerName: "Tên sản phẩm",
            headerAlign: "center",
            align: "center",
            flex: 0.5,
            cellClassName: "name-column--cell",
        },
        {
            field: "avatar",
            headerName: "Ảnh sản phẩm",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <img
                    src={params.value == "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" ? "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg" : publicPath + '/' + params.value}
                    alt={params.row.name} width="40px"/>
            ),
            flex: 0.5,
        },
        {
            headerName: "Actions comments",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div style={{display: 'flex', columnGap: '4px'}}>
                    <button type="button" class="btn btn-primary" style={{background: '#ffc107', border: 'none'}}
                            onClick={() => handleDtailItem(params.row.id)}>
                        Chi tiết
                    </button>
                </div>
            ),
            flex: 0.5,
        },
    ];

    return (
        <Box m="20px">
            <Header
                title="MANAGET COMMENTS OF PRODUCT"
                subtitle="Manager comments of Products for Future Reference"
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
                    rows={productsList}
                    columns={columns}
                />
            </Box>
            <ToastContainer/>
        </Box>
    );
};

export default CommentByProduct;
