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

const OrderList = () => {
    const [orderList, setOrderList] = useState([]);

    // Get data collections
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/orders', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data);
                setOrderList(data.orders);
            })
            .catch((error) => console.log(error));
    }, []);

    const navigate = useNavigate();

    const handleAcceptItem = (idOrder) => {
        // navigate
        // navigate('/dashboard/blog/edit/' + idBlog);
    }

    const handleDetailItem = (idOrder) => {

    }

    /// Get path to public in serve

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const columns = [
        {
            field: "id",
            headerName: "Order Number",
            headerAlign: "center",
            align: "center",
            flex: 0.2,
        },
        {
            field: "total",
            headerName: "Total",
            headerAlign: "center",
            align: "center",
            flex: 0.3,
        },

        {
            field: "cart_date",
            headerName: "Date",
            headerAlign: "center",
            align: "center",
            flex: 0.9,
        },
        {
            field: "cart_status",
            headerName: "Status",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <p>
                    {
                        params.value === 1
                            ? <Tag color="success">Đã thanh toán</Tag>
                            : <Tag color="processing">Chờ thanh toán</Tag>
                    }
                </p>
            ),
            flex: 0.3,
        },
        {
            field: "user",
            headerName: "User Name",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <p>{params.value.fullname}</p>
            ),
            flex: 0.5,
        },
        {
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <div style={{display: 'flex', columnGap: '4px'}}>
                    <button type="button" class="btn btn-warning" style={{background: '#ffc107'}}
                            onClick={() => handleAcceptItem(params.row.id)}>
                        Accept
                    </button>
                    <button type="button" class="btn btn-danger" style={{background: '#dc3545'}}
                            onClick={() => handleDetailItem(params.row.id)}>
                        Detail
                    </button>
                </div>
            ),
            flex: 0.5,
        },
    ];

    return (
        <Box m="20px">
            <Header
                title="LIST ORDERS"
                subtitle="List of Order for Future Reference"
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
                    rows={orderList}
                    columns={columns}
                />
            </Box>
            <ToastContainer/>
        </Box>
    );
};

export default OrderList;
