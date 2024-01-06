// import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Tag} from "antd";

export const colums = [
    {
        field: "id",
        headerAlign: "left",
        align: "left",
        headerName: "ID",
    },
    {
        field: "fullname",
        headerName: "Full Name",
        align: "left",
        flex: 0.8,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 0.9,
    },
    {
        field: "gender",
        headerName: "Gender",
        headerAlign: "left",
        flex: 0.35,

        renderCell: (params) => {
            let backgroundColor = "";
            let color = "";
            let displayValue = params.value;
            if (!params.value) {
                displayValue = "null";
                backgroundColor = "white";
            } else if (params.value === "Male") {
                backgroundColor = "#0077b9";
                color = "white"
            } else if (params.value === "Female") {
                backgroundColor = "#FF1490";
                color = "white"
            } else {
                backgroundColor = "white";
            }
            return (
                <div style={{backgroundColor, color, padding: "5px", borderRadius: "5px"}}>
                    {displayValue}
                </div>
            );
        },
    },
    {
        field: "status",
        headerName: "Status",
        // headerAlign: "left",
        flex: 0.35,
        renderCell: (params) => (
            <p>
                {
                    params.value === "Show"
                        ? <Tag color="success">Show</Tag>
                        : <Tag color="red">Hidden</Tag>
                }
            </p>
        ),
    },
    {
        field: "level",
        headerName: "Level",
        headerAlign: "left",
        flex: 0.6,
        renderCell: (params) => {
            let levelName = "";
            let color = "";
            switch (params.value) {
                case 1:
                    levelName = "Admin Master";
                    color = "gold"
                    break;
                case 2:
                    levelName = "Admin Manager";
                    color = "red"
                    break;
                case 3:
                    levelName = "Admin Editor";
                    color = "blue";
                    break;
                case 4:
                    levelName = "Member";
                    color = "purple";
                    break;
                default:
                    levelName = "Unknown";
                    color = "cyan";
            }
            return (
                <Tag color={color}>{levelName}</Tag>
            );
        },
    },
    {
        field: "detail",
        headerName: "Detail",
        flex: 0.4,
    },
    {
        field: "edit",
        headerName: "Edit",
        flex: 0.37,
    },
    {
        field: "delete",
        headerName: "Delete",
        flex: 0.5,
    },
];