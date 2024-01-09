import {useParams} from "react-router-dom";
import {Tag} from "antd";
import {Box, useTheme} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {tokens} from "../../theme";
import Header from "../../components/Header";

const columns = [
    {
        field: "id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
        flex: 0.2,
    },
    {
        field: "name_customer",
        headerName: "Name",
        headerAlign: "center",
        align: "center",
        flex: 0.5,
    },

    {
        field: "phone_customer",
        headerName: "Phone",
        headerAlign: "center",
        align: "center",
        flex: 0.4,
    },
    {
        field: "address_customer",
        headerName: "Address",
        headerAlign: "center",
        align: "center",
        flex: 0.3,
    },
    {
        field: "quantity",
        headerName: "Quantity",
        headerAlign: "center",
        align: "center",
        flex: 0.3,
    },
    {
        field: "price",
        headerName: "Price",
        headerAlign: "center",
        align: "center",
        flex: 0.3,
    },
    {
        field: "product",
        headerName: "Product",
        headerAlign: "center",
        align: "center",
        renderCell: (params) => (
            <p>{params.value.name}</p>
        ),
        flex: 0.5,
    },
    {
        field: "price",
        headerName: "Price",
        headerAlign: "center",
        align: "center",
        flex: 0.3,
    },
    {
        field: "cart_id",
        headerName: "ID Cart",
        headerAlign: "center",
        align: "center",
        flex: 0.3,
    },
];

const OrderDetail = () => {
    const [orderDetailList, setOrderDetailList] = useState([]);

    const {id} = useParams();

    // Get data collections
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/orders-detail/' + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((respon) => respon.json())
            .then((data) => {
                console.log(data);
                setOrderDetailList(data.order_details);
            })
            .catch((error) => console.log(error));
    }, []);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <div>
            <Box m="20px">
                <Header
                    title="LIST ORDER DETAIL"
                    subtitle="List of Order Detail for Future Reference"
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
                        rows={orderDetailList}
                        columns={columns}
                    />
                </Box>
                <ToastContainer/>
            </Box>
        </div>
    );
}

export default OrderDetail;