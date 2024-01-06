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

// export const DataPayment = [
//   {
//     id: "1",
//     datetime: "21-05-2023 23h:17m:50s",
//     status: "Success",
//     product: "Apple, Samsung",
//     quantity: "Apple: 1, Samsung: 1",
//     total: "500$",
//   },
//   {
//     id: "2",
//     datetime: "28-05-2023 13h:15m:3s",
//     status: "Success",
//     product: "Xiaomi, Nokia, Apple",
//     quantity: "Xiaomi: 2, Nokia: 1, Apple: 2",
//     total: "800$",
//   },
//   {
//     id: "3",
//     date: "05-03-2023",
//     datetime: "05-03-2023 07h:07m:30s",
//     status: "Fail",
//     product: "Oppo, Samsung, Nokia",
//     quantity: "Oppo: 3, Samsung: 1, Nokia: 1",
//     total: "1000$",
//   },
//   {
//     id: "4",
//     datetime: "12-09-2023 20h:36m:12s",
//     status: "Success",
//     product: "Oppo, Nokia 1280",
//     quantity: "Oppo: 1, Nokia 1280: 2",
//     total: "300$",
//   },
//   {
//     id: "5",
//     datetime: "16-03-2023 17h:11m:12s",
//     status: "Success",
//     product: "Apple, Samsung, Nokia, Oppo",
//     quantity: "Apple: 2, Samsung: 2, Nokia: 2, Oppo: 1",
//     total: "2000$",
//   },
//   {
//     id: "6",
//     datetime: "02-11-2023 15h:16m:30s",
//     status: "Success",
//     product: "Nokia",
//     quantity: "Nokia: 1",
//     total: "100$",
//   },
// ];
