import {useParams} from "react-router-dom";
import {Tag} from "antd";

const colums = [
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
];

const OrderDetail = () => {
    const {id} = useParams();

    return (
        <div>

        </div>
    );
}

export default OrderDetail;