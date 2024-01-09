import {Tag} from "antd";

export const colums = [
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
                ? <Tag color="success">Payment completed</Tag>
                : <Tag color="processing">Pending payment</Tag>
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
