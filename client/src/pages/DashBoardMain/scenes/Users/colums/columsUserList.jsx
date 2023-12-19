import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button } from "@mui/material";

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
        flex: 0.5,
        renderCell: (params) => {
            if (params.value == 0) {
                params.value = "Male";
            } else {
                params.value = "Female";
            }
            let backgroundColor = "";
            if (params.value === "Male") {
                backgroundColor = "lightblue";
            } else if (params.value === "Female") {
                backgroundColor = "lightpink";
            } else {
                backgroundColor = "white";
            }
            return (
                <div style={{ backgroundColor, padding: "5px", borderRadius: "5px" }}>{params.value}</div>
            );
        },
    },
    {
        field: "level",
        headerName: "Level",
        headerAlign: "left",
        flex: 0.6,
        renderCell: (params) => {
            let levelName = "";
            let color = "";
            let backgroundColor = "";
            switch (params.value) {
                case 0:
                    levelName = "Admin Master";
                    backgroundColor = "#FF0000";
                    break;
                case 1:
                    levelName = "Admin Manager";
                    backgroundColor = "#6666FF";
                    break;
                case 2:
                    levelName = "Admin Editor";
                    backgroundColor = "#00FF00";
                    break;
                case 3:
                    levelName = "Member";
                    backgroundColor = "#DDDDDD";
                    break;
                default:
                    levelName = "Unknown";
                    color = "black";
                    backgroundColor = "white";
            }
            return (
                <div
                    style={{
                        backgroundColor,
                        color,
                        padding: "5px",
                        borderRadius: "5px",
                    }}
                >
                    {levelName}
                </div>
            );
        },
    },
    {
        field: "detail",
        headerName: "Detail",
        flex: 0.4,
        renderCell: (params) => (
            <Button
                sx={{
                    bgcolor: "#1565c0",
                    color: "white",
                    "&:hover": { bgcolor: "#1976d2" },
                    width: "90px",
                }}
                startIcon={<VisibilityIcon />}
            // onClick={() => handleView(params.row.id)}
            >
                View
            </Button>
        ),
    },
    {
        field: "edit",
        headerName: "Edit",
        flex: 0.37,
        renderCell: (params) => (
            <Button
                sx={{
                    bgcolor: "#2b8b57",
                    color: "white",
                    "&:hover": { bgcolor: "#3cb371" },
                    width: "80px",
                }}
                startIcon={<EditIcon />}
            // onClick={() => handleEdit(params.row.id)}
            >
                Edit
            </Button>
        ),
    },
    {
        field: "delete",
        headerName: "Delete",
        flex: 0.5,
        renderCell: (params) => (
            <Button
                sx={{
                    bgcolor: "#d32f2f",
                    color: "white",
                    "&:hover": { bgcolor: "#f44336" },
                    width: "100px",
                }}
                startIcon={<DeleteIcon />}
            // onClick={() => handleDelete(params.row.id)}
            >
                Delete
            </Button>
        ),
    },
];