// import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
          <div style={{ backgroundColor, color, padding: "5px", borderRadius: "5px" }}>
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
    renderCell: (params) => {
      let backgroundColor = "";
      if (params.value === "Show") {
        backgroundColor = "#3cb371";
      } else {
        backgroundColor = "white";
      }
      return (
          <div style={{ backgroundColor, padding: "5px", borderRadius: "5px" }}>
            {params.value}
          </div>
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
        case 1:
          levelName = "Admin Master";
          backgroundColor = "#FF0000";
          color = "white"
          break;
        case 2:
          levelName = "Admin Manager";
          backgroundColor = "#6666FF";
          color = "white"
          break;
        case 3:
          levelName = "Admin Editor";
          backgroundColor = "#00FF00";
          break;
        case 4:
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